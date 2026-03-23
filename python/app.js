let pyodide = null;
let editor = null;
let activeProblem = null;
let problemBank = [];

const CHAPTERS = [
    { num: 1, name: "The Shell" },
    { num: 2, name: "String Basics" },
    { num: 3, name: "Variables" },
    { num: 4, name: "For Loops" },
    { num: 5, name: "If Statements" },
    { num: 6, name: "Lists" },
    { num: 7, name: "More About Strings" },
    { num: 8, name: "Nested Loops" },
    { num: 9, name: "Functions" },
    { num: 10, name: "Boolean Operators" },
    { num: 11, name: "Tic Tac Toe Project" },
    { num: 12, name: "Dictionaries" },
];

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    editor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
        mode: "python",
        theme: "elegant",
        lineNumbers: true,
        indentUnit: 4,
        tabSize: 4,
        indentWithTabs: false,
        extraKeys: {
            "Tab": (cm) => cm.replaceSelection("    "),
            "Shift-Enter": () => runCode(),
        },
    });

    initPyodide();
    initSelector();
    loadProblems();

    document.getElementById("run-btn").addEventListener("click", runCode);
    document.getElementById("clear-btn").addEventListener("click", clearOutput);
    document.getElementById("generate-btn").addEventListener("click", generateProblem);
});

// Load Pyodide
async function initPyodide() {
    const btn = document.getElementById("run-btn");
    try {
        pyodide = await globalThis.loadPyodide();
        btn.textContent = "Run (Shift+Enter)";
        btn.disabled = false;
    } catch (e) {
        btn.textContent = "Failed to load Python";
        console.error(e);
    }
}

// Load problem bank
async function loadProblems() {
    try {
        const resp = await fetch("problems.json");
        problemBank = await resp.json();
    } catch (e) {
        console.error("Failed to load problems:", e);
    }
}

// Initialize chapter selector
function initSelector() {
    const chapterSelect = document.getElementById("chapter-select");
    CHAPTERS.forEach((ch) => {
        const opt = document.createElement("option");
        opt.value = ch.num;
        opt.textContent = ch.num + ". " + ch.name;
        chapterSelect.appendChild(opt);
    });
}

// Pick a random problem matching filters
function generateProblem() {
    const chapter = parseInt(document.getElementById("chapter-select").value);
    const difficulty = parseInt(document.getElementById("difficulty-select").value);

    const matches = problemBank.filter(
        (p) => p.chapter === chapter && p.difficulty === difficulty
    );

    if (matches.length === 0) {
        document.getElementById("problem-display").style.display = "block";
        document.getElementById("problem-title").textContent = "No problems found";
        document.getElementById("problem-description").textContent =
            "No problems available for this chapter and difficulty yet.";
        return;
    }

    const problem = matches[Math.floor(Math.random() * matches.length)];
    activeProblem = problem;

    document.getElementById("problem-display").style.display = "block";
    document.getElementById("problem-title").textContent = problem.title;
    document.getElementById("problem-description").innerHTML = problem.description;

    editor.setValue(problem.starter);
    document.getElementById("output").textContent = "";
    document.getElementById("output").className = "";
    document.getElementById("shell").scrollIntoView({ behavior: "smooth" });
}

// Run code
async function runCode() {
    if (!pyodide) return;

    const code = editor.getValue();
    const outputEl = document.getElementById("output");
    const btn = document.getElementById("run-btn");

    btn.disabled = true;
    btn.textContent = "Running...";
    outputEl.className = "";

    let output = [];

    pyodide.setStdout({ batched: (text) => output.push(text) });
    pyodide.setStderr({ batched: (text) => output.push(text) });

    try {
        await pyodide.runPythonAsync(code);
        const actual = output.join("\n");
        outputEl.textContent = actual || "(no output)";

        if (activeProblem && activeProblem.expected) {
            const expected = activeProblem.expected.trim();
            if (actual.trim() === expected) {
                outputEl.textContent += "\n\n--- Correct! ---";
                outputEl.className = "output-success";
            } else {
                outputEl.textContent += "\n\n--- Expected output ---\n" + expected;
                outputEl.className = "output-wrong";
            }
        }
    } catch (e) {
        outputEl.textContent = output.join("\n") + "\n" + e.message;
        outputEl.className = "output-error";
    } finally {
        btn.textContent = "Run (Shift+Enter)";
        btn.disabled = false;
    }
}

function clearOutput() {
    document.getElementById("output").textContent = "";
    document.getElementById("output").className = "";
}

// Flowers
const flowerChars = ["\uD83E\uDD95", "\uD83E\uDD96", "\uD83E\uDD8E"];

function createFlower(x, y) {
    const el = document.createElement("span");
    el.className = "sparkle";
    el.textContent = flowerChars[Math.floor(Math.random() * flowerChars.length)];
    el.style.left = (x + (Math.random() - 0.5) * 30) + "px";
    el.style.top = (y + (Math.random() - 0.5) * 30) + "px";
    el.style.animationDuration = (1 + Math.random() * 1.5) + "s";
    document.body.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
}

let flowerTimer = 0;
document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - flowerTimer > 80) {
        flowerTimer = now;
        createFlower(e.clientX, e.clientY);
    }
});
