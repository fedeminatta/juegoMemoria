// inicializacion de variable
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 45;
let timerInicial = timer;
let tiempoRegresivoId = null;

let winAudio = new Audio('./sound/win.wav');
let loseAudio = new Audio('./sound/lose.wav');
let clickAudio = new Audio('./sound/click.wav');
let rightAudio = new Audio('./sound/right.wav');
let wrongAudio = new Audio('./sound/wrong.wav');

// Variables
const mostrarMovimientos = document.querySelector('#movimientos');
const mostrarAciertos = document.querySelector('#aciertos');
const mostrarTiempo = document.querySelector('#t-restante');

// generacion de numeros aletorios
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => {
	return Math.random() - 0.5;
});

inicio();
function inicio() {
	for (let i = 0; i <= 15; i++) {
		let tarjetaBloqueada = document.getElementById(i);
		tarjetaBloqueada.disabled = true;
		tarjetaBloqueada.innerHTML = `<img src='./img/${numeros[i]}.png'></img>`;
	}
	setTimeout(() => {
		for (let i = 0; i <= 15; i++) {
			let tarj = document.getElementById(i);
			tarj.disabled = false;
			tarj.innerHTML = '';
		}
	}, 800);
}

// Funciones
function contarTiempo() {
	tiempoRegresivoId = setInterval(() => {
		timer--;
		mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
		if (timer == 0) {
			clearInterval(tiempoRegresivoId);
			bloquearTarjetas();
			loseAudio.play();
		}
	}, 1000);
}

function bloquearTarjetas() {
	for (let i = 0; i <= 15; i++) {
		let tarjetaBloqueada = document.getElementById(i);
		tarjetaBloqueada.innerHTML = `<img src='./img/${numeros[i]}.png'></img>`;

		tarjetaBloqueada.disabled = true;
	}
}

// funcion principal
function destapar(id) {
	if (temporizador == false) {
		contarTiempo();
		temporizador = true;
	}

	tarjetasDestapadas++;

	if (tarjetasDestapadas == 1) {
		// Mostrar el primer numero
		tarjeta1 = document.getElementById(id);
		primerResultado = numeros[id];
		tarjeta1.innerHTML = `<img src='./img/${primerResultado}.png' alt=''>`;
		clickAudio.play();

		// Deshabilitar primer boton
		tarjeta1.disabled = true;
	} else if (tarjetasDestapadas == 2) {
		//Mostrar segundo numero
		tarjeta2 = document.getElementById(id);
		segundoResultado = numeros[id];
		tarjeta2.innerHTML = `<img src='./img/${segundoResultado}.png' alt=''>`;
		//Deshabilitar segundo boton
		tarjeta2.disabled = true;

		//Incrementar movimientos
		movimientos++;
		mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

		if (primerResultado == segundoResultado) {
			rightAudio.play();
			// Encerar contador tarjetas destapadas
			tarjetasDestapadas = 0;

			// Aumentar aciertos
			aciertos++;
			mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

			if (aciertos == 8) {
				clearInterval(tiempoRegresivoId);
				mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😱`;
				mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🤟😎`;
				mostrarTiempo.innerHTML = `Fantástico! 🎉 Sólo demoraste ${timerInicial - timer} segundos`;
				winAudio.play();
			}
		} else {
			wrongAudio.play();
			// Mostar momentaneamente valores y volver a tapar
			setTimeout(() => {
				tarjeta1.innerHTML = ' ';
				tarjeta2.innerHTML = ' ';
				tarjeta1.disabled = false;
				tarjeta2.disabled = false;
				tarjetasDestapadas = 0;
			}, 800);
		}
	}
}
