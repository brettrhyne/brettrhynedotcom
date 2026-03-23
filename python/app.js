let pyodide = null;
let editor = null;
let activeProblem = null;

// Initialize CodeMirror
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
    renderProblems();

    document.getElementById("run-btn").addEventListener("click", runCode);
    document.getElementById("clear-btn").addEventListener("click", clearOutput);
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

    // Use Pyodide's native stdout/stderr capture
    pyodide.setStdout({ batched: (text) => output.push(text) });
    pyodide.setStderr({ batched: (text) => output.push(text) });

    try {
        await pyodide.runPythonAsync(code);
        const actual = output.join("\n");
        outputEl.textContent = actual || "(no output)";

        // Check against expected output if a problem is loaded
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
    const outputEl = document.getElementById("output");
    outputEl.textContent = "";
    outputEl.className = "";
}

// Render problem cards
function renderProblems() {
    const container = document.getElementById("problem-list");

    PROBLEMS.forEach((problem) => {
        const card = document.createElement("div");
        card.className = "problem-card";
        card.innerHTML = `
            <h3>
                ${problem.title}
                <span class="difficulty ${problem.difficulty}">${problem.difficulty}</span>
            </h3>
            <p>${problem.description}</p>
            <div class="problem-detail">
                <strong>Examples:</strong>
                <pre>${problem.examples}</pre>
                <button class="load-btn" data-id="${problem.id}">Load in Editor</button>
            </div>
        `;

        card.addEventListener("click", (e) => {
            if (e.target.classList.contains("load-btn")) return;
            card.classList.toggle("problem-active");
        });

        const loadBtn = card.querySelector(".load-btn");
        loadBtn.addEventListener("click", () => {
            activeProblem = problem;
            editor.setValue(problem.starter);
            document.getElementById("output").textContent = "";
            document.getElementById("output").className = "";
            document.getElementById("shell").scrollIntoView({ behavior: "smooth" });
        });

        container.appendChild(card);
    });
}

// Sparkles
const sparkleChars = ["\u2728", "\u2B50", "\uD83C\uDF1F", "\u2734\uFE0F", "\u00B7"];

function createSparkle(x, y) {
    const el = document.createElement("span");
    el.className = "sparkle";
    el.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
    el.style.left = (x + (Math.random() - 0.5) * 30) + "px";
    el.style.top = (y + (Math.random() - 0.5) * 30) + "px";
    el.style.animationDuration = (1 + Math.random() * 1.5) + "s";
    document.body.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
}

let sparkleTimer = 0;
document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - sparkleTimer > 80) {
        sparkleTimer = now;
        createSparkle(e.clientX, e.clientY);
    }
});
