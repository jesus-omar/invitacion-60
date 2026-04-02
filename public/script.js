const bienvenida = document.getElementById("bienvenida");
const invitacion = document.getElementById("invitacion");

const btnAbrirInvitacion = document.getElementById("btnAbrirInvitacion");
const btnConfirmar = document.getElementById("btnConfirmar");


/* ===== CAMBIAR PANTALLA ===== */

function cambiarPantalla(actual, siguiente) {

  actual.classList.remove("show");

  setTimeout(() => {

    actual.style.display = "none";
    siguiente.style.display = "flex";
    siguiente.classList.add("show");

  }, 200);

}


/* ===== ABRIR INVITACIÓN ===== */

btnAbrirInvitacion.addEventListener("click", () => {

  cambiarPantalla(bienvenida, invitacion);

  document.body.style.overflow = "auto";

  setTimeout(mostrarEnScroll, 300);

  if(musica){
    musica.play().catch(()=>{});
  }

});


/* ===== CONFIRMAR WHATSAPP ===== */

btnConfirmar.addEventListener("click", () => {

  const mensaje = `Hola, confirmo mi asistencia a la celebración de 60 años. Nos vemos el 2 de mayo.`;

  const url =
    `https://wa.me/5215520494809?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");

});


/* ===== ANIMACIÓN SCROLL ===== */

function mostrarEnScroll() {

  const contenedor = document.getElementById("invitacion");
  const bloques = document.querySelectorAll(".animar");

  const contenedorRect = contenedor.getBoundingClientRect();

  bloques.forEach(bloque => {

    const rect = bloque.getBoundingClientRect();

    if (rect.top < contenedorRect.bottom - 80) {

      bloque.classList.add("visible");

    }

  });

}

document
.getElementById("invitacion")
.addEventListener("scroll", mostrarEnScroll);


/* ===== CUENTA REGRESIVA ===== */

const fechaEvento = new Date("May 02, 2026 20:00:00").getTime();

function actualizarContador(){

  const ahora = new Date().getTime();

  const diferencia = fechaEvento - ahora;

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  document.getElementById("dias").textContent = dias;
  document.getElementById("horas").textContent = horas;
  document.getElementById("minutos").textContent = minutos;
  document.getElementById("segundos").textContent = segundos;

}

setInterval(actualizarContador,1000);
actualizarContador();


/* ===== GALERIA ===== */

const fotos = [
"assets/foto1.jpg",
"assets/foto2.jpg",
"assets/foto3.jpg",
"assets/foto4.jpg",
"assets/foto5.jpg",
"assets/foto6.jpg"
];

let indiceFoto = 0;

let lightbox;
let fotoGrande;

document.addEventListener("DOMContentLoaded", () => {

  lightbox = document.getElementById("lightbox");
  fotoGrande = document.getElementById("fotoGrande");

});

function abrirGaleria(){

  indiceFoto = 0;
  fotoGrande.src = fotos[indiceFoto];
  lightbox.style.display = "flex";

}

function cerrarGaleria(){

  lightbox.style.display = "none";

}

function fotoSiguiente(){

  indiceFoto++;

  if(indiceFoto >= fotos.length){
    indiceFoto = 0;
  }

  fotoGrande.src = fotos[indiceFoto];

}

function fotoAnterior(){

  indiceFoto--;

  if(indiceFoto < 0){
    indiceFoto = fotos.length - 1;
  }

  fotoGrande.src = fotos[indiceFoto];

}