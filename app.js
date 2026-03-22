let pyodide = null;
let editor = null;

// Initialize CodeMirror
document.addEventListener("DOMContentLoaded", () => {
    editor = CodeMirror.fromTextArea(document.getElementById("code-editor"), {
        mode: "python",
        theme: "dracula",
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

    try {
        // Capture stdout/stderr
        pyodide.runPython(`
import sys, io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
`);

        pyodide.runPython(code);

        const stdout = pyodide.runPython("sys.stdout.getvalue()");
        const stderr = pyodide.runPython("sys.stderr.getvalue()");

        let result = "";
        if (stdout) result += stdout;
        if (stderr) result += stderr;

        outputEl.textContent = result || "(no output)";
    } catch (e) {
        outputEl.textContent = e.message;
        outputEl.className = "output-error";
    } finally {
        btn.textContent = "Run (Shift+Enter)";
        btn.disabled = false;

        // Reset stdout/stderr
        pyodide.runPython(`
import sys
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`);
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
            editor.setValue(problem.starter + "\n\n" + problem.tests.trim());
            document.getElementById("shell").scrollIntoView({ behavior: "smooth" });
        });

        container.appendChild(card);
    });
}
