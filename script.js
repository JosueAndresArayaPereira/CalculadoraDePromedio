const buttonAddNote = document.getElementById("agregarNota");
buttonAddNote.addEventListener("click", () => {
  AddNoteToList();
});

const buttonQuitNote = document.getElementById("quitarNota");
buttonQuitNote.addEventListener("click", () => {
  quitNote();
});

let CuantityNotes = 0;
AddNoteToList();

function AddNoteToList() {
  CuantityNotes++;
  renderNotes();
}

function quitNote() {
  if (CuantityNotes > 1) {
    CuantityNotes--;
    renderNotes();
  }
}

function renderNotes() {
  const ShowNote = document.querySelector(".notas");
  ShowNote.innerHTML = ""; // Limpiar el contenedor
  for (let i = 0; i < CuantityNotes; i++) {
    ShowNote.innerHTML += `
      <div class="nota">
        <input type="number" id="note${i}" placeholder="Nota ${i + 1}" />
        <input type="number" id="value${i}" placeholder="Valor (%)" />
      </div>
    `;
  }
}

function calculateProm() {
  let sum = 0;
  let sumValue = 0;
  for (let i = 0; i < CuantityNotes; i++) {
    const note = document.getElementById(`note${i}`).value;
    const value = document.getElementById(`value${i}`).value;
    if (note == 0 || value == 0) {
      alert("Las notas y los valores no pueden ser 0");
      return;
    }
    if (note && value) {
      sum += parseFloat(note) * (parseFloat(value) / 100);
      sumValue += parseFloat(value);
    }
  }

  const prom = sum / (sumValue / 100);
  const noteFinal = (document.getElementById("mostrarPonderacion").textContent =
    prom.toFixed(2));

  showNotePond();
  return prom;
}

document.getElementById("calculateButton").addEventListener("click", (e) => {
  e.preventDefault();
  calculateProm();
});

let theme = localStorage.getItem("theme") === "true" ? true : false;
ChangeColor();
function ChangeColor() {
  localStorage.setItem("theme", theme);
  var root = document.documentElement;
  if (theme) {
    root.style.setProperty("--background-color", "#333");
    root.style.setProperty("--color-texto", "#fff");
    root.style.setProperty("--shadow", "0 0 1rem rgba(194, 194, 194, 0.159)");
  } else {
    root.style.setProperty("--background-color", "#fff");
    root.style.setProperty("--color-texto", "#333");
    root.style.setProperty("--shadow", "0 0 1rem rgba(0, 0, 0, 0.159)");
  }
}

function showNotePond() {
  const showNote = document.querySelector(".notaMostrar");
  showNote.style.display = "flex";
}

document.getElementById("cambiarTema").addEventListener("click", () => {
  theme = !theme;
  ChangeColor();
});

function closeShowNote() {
  const showNote = document.querySelector(".notaMostrar");
  showNote.style.display = "none";
}
