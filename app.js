const sectionMenuPrincipal = document.querySelector("#pantallaPrincipal");
const sectionAgregar = document.querySelector("#pantallaAgregar");
const sectionJuego = document.querySelector("#pantallaJuego");

//Alertas
const modalAlertas = document.querySelector("#modalAlertas");
const alertaError = document.querySelector("#alertError");
const alertaValida = document.querySelector("#alertValida");
const alertaPerdiste = document.querySelector("#alertPerdiste");
const alertGanaste = document.querySelector("#alertGanaste");

const alertReglas = document.querySelector("#alertReglas");

const mostrarPalabraCorrecta = document.querySelector("#palabraCorrecta");
const mostrarPalabra = document.querySelector("#mostrarResultado");

function mostrarSection(section) {
  switch (section) {
    case "MenuPrincipal": {
      sectionAgregar.style.display = "none";
      sectionJuego.style.display = "none";
      sectionMenuPrincipal.style.display = "flex";
      break;
    }
    case "Agregar": {
      sectionMenuPrincipal.style.display = "none";
      sectionJuego.style.display = "none";
      sectionAgregar.style.display = "block";
      break;
    }
    case "Juego": {
      sectionMenuPrincipal.style.display = "none";
      sectionAgregar.style.display = "none";
      sectionJuego.style.display = "flex";
      palabraRandom();
      break;
    }
    case "Reglas": {
      modalAlertas.style.display = "flex";
      alertReglas.style.display = "block";
      break;
    }
  }
}

let arrayPalabras = [
  "PERRO",
  "TERRAZA",
  "PAGINA",
  "LETRAS",
  "HOGAR",
  "PERSONA",
  "COMER",
  "ARBOL",
  "FUTBOL",
  "VIAJE",
];

const contenedorPalabra = document.querySelector("#palabraSecreta");
let palabraJuego;

//contador de intentos
let contadorIntentos;
//cantidad de intentos posibles
const intentosPosibles = 8;
//array control aciertos
let arrayAciertos = [];

function palabraRandom() {
  //reseteo el contador de intentos
  contadorIntentos = 0;
  //reseteo control
  arrayAciertos = [];
  //reseteo canvas
  pincel.clearRect(0, 0, pantalla.width, pantalla.height);

  const posicionRandom = Math.floor(Math.random() * arrayPalabras.length);

  palabraJuego = arrayPalabras[posicionRandom];

  for (let i = 0; i < palabraJuego.length; i++) {
    arrayAciertos.push("");
  }

  generarLineas();
  //reseteo las teclas
  resetBtones();
  //inicio el dibujo
  dibujoAhorcado(contadorIntentos);
}

//Resetear teclado
function resetBtones() {
  var buttons = document.querySelectorAll(".teclado  button");
  buttons.forEach((button) => {
    button.classList.remove("disableBton", "btonTrue");
  });
}

//lineas de palabra oculta
function generarLineas() {
  contenedorPalabra.innerHTML = "";
  for (let i = 0; i < palabraJuego.length; i++) {
    contenedorPalabra.innerHTML += `
        <div class="cuadroLetra" >
            <p id="ubicacion${i}"></p>
        </div>
      `;
  }
}

function cerrarVentana(idVentana) {
  modalAlertas.style.display = "none";
  document.querySelector(`#${idVentana}`).style.display = "none";
}

function guardarJugar(idVentana) {
  cerrarVentana(idVentana);
  mostrarSection("Juego");
}

function volverMenu(idVentana) {
  cerrarVentana(idVentana);
  mostrarSection("MenuPrincipal");
}

const palabraNueva = document.querySelector("#newPalabra");

function agregarPalabra() {
  const palabraAgregar = palabraNueva.value.toUpperCase();
  modalAlertas.style.display = "flex";
  if (/^[A-Z]{3,8}$/g.test(palabraAgregar)) {
    palabraNueva.value = "";
    arrayPalabras.push(palabraAgregar);
    alertaValida.style.display = "block";
  } else {
    alertaError.style.display = "block";
    palabraNueva.value = "";
  }
}

function teclaIn(letra) {
  let teclaSeleccion = document.querySelector(`#tecla${letra}`);
  if (palabraJuego.includes(letra)) {
    teclaSeleccion.classList.add("btonTrue");
    for (let i = 0; i < palabraJuego.length; i++) {
      if (palabraJuego[i] == letra) {
        document.querySelector(`#ubicacion${i}`).innerHTML = letra;
        arrayAciertos[i] = letra;
      }
    }
  } else {
    teclaSeleccion.classList.add("disableBton");
    contadorIntentos++;
    dibujoAhorcado(contadorIntentos);
  }
  controlJuego();
}

function controlJuego() {
  if (contadorIntentos == intentosPosibles) {
    mostrarPalabraCorrecta.innerHTML = `La palabra era: ${palabraJuego}`;
    modalAlertas.style.display = "flex";
    alertaPerdiste.style.display = "block";
  } else {
    if (arrayAciertos.every((item) => item != "")) {
      modalAlertas.style.display = "flex";
      alertGanaste.style.display = "block";
      mostrarPalabra.innerHTML = `La palabra era: ${palabraJuego}`;
    }
  }
}

//control para el canvas del ahorcado
var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");
// Grosor de línea
pincel.lineWidth = 6;
// Color de línea
pincel.strokeStyle = "#0A3871";

function dibujoAhorcado(intentosErroneos) {
  switch (intentosErroneos) {
    case 0: {
      //base
      pincel.beginPath();
      // Comenzamos en 0, 0
      pincel.moveTo(0, 390);
      // Hacemos una línea hasta 48, 48
      pincel.lineTo(300, 390);
      // "Guardar" cambios
      pincel.stroke();

      //parante
      pincel.beginPath();
      // Comenzamos en 0, 0
      pincel.moveTo(30, 390);
      // Hacemos una línea hasta 48, 48
      pincel.lineTo(30, 10);
      // "Guardar" cambios
      pincel.stroke();
      break;
    }
    case 1: {
      //paranteRecto
      pincel.beginPath();
      // Comenzamos en 0, 0
      pincel.moveTo(30, 10);
      // Hacemos una línea hasta 48, 48
      pincel.lineTo(160, 10);
      // "Guardar" cambios
      pincel.stroke();
      break;
    }
    case 2: {
      //paranteAbajo
      pincel.beginPath();
      // Comenzamos en 0, 0
      pincel.moveTo(160, 10);
      // Hacemos una línea hasta 48, 48
      pincel.lineTo(160, 50);
      // "Guardar" cambios
      pincel.stroke();
      break;
    }
    case 3: {
      //cabeza
      pincel.beginPath();
      // Grosor de línea
      pincel.lineWidth = 4;
      pincel.arc(160, 90, 40, 0, 2 * Math.PI);
      // "Guardar" cambios
      pincel.stroke();
      break;
    }
    case 4: {
      //cuerpo
      pincel.beginPath();
      // Comenzamos en 0, 0
      pincel.moveTo(160, 130);
      // Hacemos una línea hasta 48, 48
      pincel.lineTo(160, 270);
      // "Guardar" cambios
      pincel.stroke();

      break;
    }
    case 5: {
      //brazoDerecho
      pincel.beginPath();
      // Comenzamos en 0, 0
      pincel.moveTo(160, 150);
      // Hacemos una línea hasta 48, 48
      pincel.lineTo(120, 230);
      // "Guardar" cambios
      pincel.stroke();
      break;
    }
    case 6: {
      //brazoIzquierdo
      pincel.beginPath();
      // Comenzamos en 0, 0
      pincel.moveTo(160, 150);
      // Hacemos una línea hasta 48, 48
      pincel.lineTo(200, 230);
      // "Guardar" cambios
      pincel.stroke();
      break;
    }
    case 7: {
      //piernaDerecho
      pincel.beginPath();
      // Comenzamos en 0, 0
      pincel.moveTo(160, 270);
      // Hacemos una línea hasta 48, 48
      pincel.lineTo(120, 320);
      // "Guardar" cambios
      pincel.stroke();
      break;
    }
    case 8: {
      //piernaIzquierdo
      pincel.beginPath();
      // Comenzamos en 0, 0
      pincel.moveTo(160, 270);
      // Hacemos una línea hasta 48, 48
      pincel.lineTo(200, 320);
      // "Guardar" cambios
      pincel.stroke();
      break;
    }
  }
}
