//inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null
let segundoResultado = null
let movimientos = 0;
let aciertos = 0;
let temporizador = false; 
let timer= 60;
let timerInicial= 60;
let tiempoRegresivoId = null;


// apuntando a documento html

let mostrarMovimientos = document.getElementById('movimientos')
let mostrarAciertos = document.getElementById('aciertos')
let mostrarTiempo = document.getElementById('t-restante')

//variables para mostrar audios
let winAudio = new Audio('./sounds/win.mp3');
let loseAudio = new Audio('./sounds/lose2.mp3');
let clickAudio = new Audio('./sounds/click2.mp3');
let rightAudio = new Audio('./sounds/right.wav');
let wrongAudio = new Audio('./sounds/wrong.wav');


//generacion de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5})
console.log(numeros);

//funciones


// Add this at the beginning of your main.js file
// document.addEventListener("DOMContentLoaded", function () {
//     playBackgroundMusic();
// });

// function playBackgroundMusic() {
//     let backgroundMusic = document.getElementById('backgroundMusic');
//     backgroundMusic.volume = 0.3; // Adjust the volume as needed
//     backgroundMusic.play();
// }




function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
       timer--;
       mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
       if(timer==0){
        clearInterval(tiempoRegresivoId);
        bloquearTarjetas();
        loseAudio.play(); 
       }
    }, 1000);
}


function bloquearTarjetas(){
    for(let i = 0; i <=15; i++){
     let tarjetabloqueada = document.getElementById(i);
     tarjetabloqueada.innerHTML = `<img src="./images/${numeros[i]}.gif" alt="">`;
     tarjetabloqueada.disabled = true;  
    }
}

function refrescarPagina(){
    location.reload();
}




//funcion principal
function destapar(id){
    if(temporizador == false){
      contarTiempo();
      temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas)

    if(tarjetasDestapadas == 1){
       //mostrar primer numero
       tarjeta1 = document.getElementById(id);
       primerResultado = numeros [id];
       tarjeta1.innerHTML = `<img src="./images/${primerResultado}.gif" alt="">`;
       clickAudio.play();

       //desabilitar primer boton
       tarjeta1.disabled = true;
    }else if(tarjetasDestapadas==2){
        // Mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros [id];
        tarjeta2.innerHTML = `<img src="./images/${segundoResultado}.gif" alt="">`;
         
        //desabilitar segundo boton
       tarjeta2.disabled = true;
       
       //incremetar movimientos
       movimientos++;
       mostrarMovimientos.innerHTML =  ` Movimientos: ${movimientos}`
      
       if(primerResultado == segundoResultado){
        //encerar el contador de tarjetas destapadas
        tarjetasDestapadas = 0;

        //aumentar aciertos
        aciertos++; 
        mostrarAciertos.innerHTML =  ` Aciertos: ${aciertos}`
        rightAudio.play();
        if(aciertos == 8){
            winAudio.play();
           clearInterval(tiempoRegresivoId); 
           mostrarAciertos.innerHTML = ` Aciertos: ${aciertos} 😱`
           mostrarTiempo.innerHTML =   ` Magnifico!!!🎉Solo tardaste: ${timerInicial - timer} segundos.`
           mostrarMovimientos.innerHTML = ` Movimientos: ${movimientos} 💪😎`
        }
    } else{
        wrongAudio.play();
        //mostrar momentaneamente valores y volver a tapar
        setTimeout(()=>{
            tarjeta1.innerHTML = `<img src="./elasmosaurus.gif" alt="">`;
            tarjeta2.innerHTML = `<img src="./elasmosaurus.gif" alt="">`;
            tarjeta1.disabled = false
            tarjeta2.disabled = false
            tarjetasDestapadas = 0;
        },700)
     }  


     
}
}



function reiniciarJuego() {
    // Clear any ongoing timers
    clearInterval(tiempoRegresivoId);

    // Reset variables to initial values
    tarjetasDestapadas = 0;
    tarjeta1 = null;
    tarjeta2 = null;
    primerResultado = null;
    segundoResultado = null;
    movimientos = 0;
    aciertos = 0;
    temporizador = false;
    timer = timerInicial;

    // Reset HTML elements
    mostrarMovimientos.innerHTML = ` Movimientos: ${movimientos}`;
    mostrarAciertos.innerHTML = ` Aciertos: ${aciertos}`;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;

    // Enable all buttons and reset their content
    for (let i = 0; i <= 15; i++) {
        let tarjetabloqueada = document.getElementById(i);
        tarjetabloqueada.innerHTML = `<img src="./elasmosaurus.gif" alt="">`;
        tarjetabloqueada.disabled = false;
    }

    // Reset audio elements
    winAudio.currentTime = 0;
    loseAudio.currentTime = 0;
    clickAudio.currentTime = 0;
    rightAudio.currentTime = 0;
    wrongAudio.currentTime = 0;
}
