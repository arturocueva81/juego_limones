let canvas=document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");

const ALTURA_SUELO=20;
const ALTURA_PERSONAJE=60;
const ANCHO_PERSONAJE=40;

let personajeX=canvas.width/2;
let personajeY=canvas.height - (ALTURA_SUELO + ALTURA_PERSONAJE);

function iniciar(){
    dibujarSuelo();
    dibujarPersonaje();
}

function dibujarSuelo(){
    ctx.fillStyle="blue";
    ctx.fillRect(0, canvas.height - ALTURA_SUELO, canvas.width, ALTURA_SUELO);
}

function dibujarPersonaje(){
    ctx.fillStyle="yellow";
    ctx.fillRect(personajeX, personajeY, ANCHO_PERSONAJE, ALTURA_PERSONAJE);
}

function moverIzquierda(){
    personajeX=personajeX - 10;
    linpiarCanva();
    dibujarSuelo();
    dibujarPersonaje();

}

function linpiarCanva(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}