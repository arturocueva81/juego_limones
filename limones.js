let canvas=document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");

const ALTURA_SUELO=20;
const ALTURA_PERSONAJE=60;
const ANCHO_PERSONAJE=40;

const ANCHO_LIMON=20;
const ALTURA_LIMON=20;

let personajeX=canvas.width/2;
let personajeY=canvas.height - (ALTURA_SUELO + ALTURA_PERSONAJE);

let limonX=canvas.width/2;
let limonY=5;

let puntaje=0;
let vidas=3;


let velocidadCaida=200;
let intervaloLimon=null;

function iniciar(){
    intervaloLimon=setInterval(bajarLimon, velocidadCaida);
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
    aparecerLimon();

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
    if(personajeX > 0){
        personajeX = personajeX - 10;
    }
    actualizarPantalla();
}

function moverDerecha(){
    if(personajeX + ANCHO_PERSONAJE < canvas.width){
        personajeX = personajeX + 10;
    }
    actualizarPantalla();
}

function actualizarPantalla(){
    limpiarCanva();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();

}

function reiniciarJuego(){
    clearInterval(intervaloLimon);
    intervaloLimon=setInterval(bajarLimon, velocidadCaida);
    personajeX=canvas.width/2;
    personajeY=canvas.height - (ALTURA_SUELO + ALTURA_PERSONAJE);

    puntaje=0;
    vidas=3;

    mostrarEnSpan("txtPuntaje", puntaje);
    mostrarEnSpan("txtVidas", vidas);
    ocultarMensaje();


    actualizarPantalla();
    aparecerLimon();
}

function limpiarCanva(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarLimon(){
    ctx.fillStyle="green";
    ctx.fillRect(limonX, limonY, ANCHO_LIMON, ALTURA_LIMON);
}

function bajarLimon(){
    limonY=limonY + 10;
    actualizarPantalla();
    detectarAtrapado();
    detectarPiso();
}

function detectarAtrapado(){
    if(limonX + ANCHO_LIMON > personajeX && 
        limonX <personajeX+ANCHO_PERSONAJE &&
        limonY + ALTURA_LIMON > personajeY &&
        limonY < personajeY + ALTURA_PERSONAJE){
        aparecerLimon();
        puntaje=puntaje + 1;
       mostrarEnSpan("txtPuntaje", puntaje);
    }

    if(puntaje === 5){
            clearInterval(intervaloLimon);
            mostrarMensaje("GANASTE", "#00ff88");
            setTimeout(() => reiniciarJuego(), 2000);
        }

}

function detectarPiso(){
    if(limonY + ALTURA_LIMON >= canvas.height - ALTURA_SUELO){
       
        aparecerLimon();
        vidas=vidas - 1;
        mostrarEnSpan("txtVidas", vidas);
    }

    if(vidas === 0){
         clearInterval(intervaloLimon);
            mostrarMensaje("GAME OVER", "#ff3b3b");
            setTimeout(() => reiniciarJuego(), 2000);
        }
}

function aparecerLimon(){
    limonX = generarAleatorio(0,canvas.width - ANCHO_LIMON);
    limonY = 5;
    actualizarPantalla();
}

function mostrarMensaje(texto, color){
    let panel = document.getElementById("panelMensaje");
    let textoMsg = document.getElementById("textoMensaje");

    textoMsg.textContent = texto;
    textoMsg.style.color = color;

    panel.style.display = "block";
}

function ocultarMensaje(){
    document.getElementById("panelMensaje").style.display = "none";
}
