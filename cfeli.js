// ==========================================
// PARTE 1: VARIABLES, CONFIGURACIÓN Y AUDIO
// ==========================================

const slider = document.getElementById('control-emocion');
const carita = document.getElementById('carita');
const cejaIzq = document.getElementById('ceja-izq');
const cejaDer = document.getElementById('ceja-der');
const boca = document.getElementById('boca');
const textoEmocion = document.getElementById('texto-emocion');
const contenedorLluvia = document.getElementById('lluvia-container');

// Estilos de sombreado 3D para la esfera de la carita
const sombra3D = `
  inset -10px -15px 30px rgba(0, 0, 0, 0.25),
  inset 10px 15px 25px rgba(255, 255, 255, 0.4),
  0 12px 20px rgba(0, 0, 0, 0.15)
`;

// Variables globales para el control de bucles de partículas
let intervaloBurbujas = null;
let intervaloConfeti = null;
let intervaloZetas = null;
let intervaloLluvia = null;
let intervaloRelampagos = null;
let intervaloEstrellas = null;
let intervaloHojas = null;

// FUNCIÓN NATIVA PARA GENERAR SONIDOS GAMER PERSONALIZADOS POR NIVEL
function reproducirSonidoGamer(frecuenciaBase, tipoOnda = 'square', esEstrella = false) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  
  if (esEstrella) {
    const notasEstrella = [1046.50, 1318.51, 1567.98, 2093.00];
    notasEstrella.forEach((frec, indice) => {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(frec, ctx.currentTime);
        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.15);
      }, indice * 60);
    });
    return;
  }

  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  osc.type = tipoOnda;
  osc.frequency.setValueAtTime(frecuenciaBase, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(frecuenciaBase * 2, ctx.currentTime + 0.08);
  gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.12);
}

// FUNCIÓN NATIVA PARA GENERAR UN SONIDO DE TRUENO RETRO
function reproducirSonidoTrueno() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const tamanoBuffer = ctx.sampleRate * 1.5;
  const bufferRUIDO = ctx.createBuffer(1, tamanoBuffer, ctx.sampleRate);
  const data = bufferRUIDO.getChannelData(0);
  
  for (let i = 0; i < tamanoBuffer; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  
  const fuenteRuido = ctx.createBufferSource();
  fuenteRuido.buffer = bufferRUIDO;

  const filtroGrave = ctx.createBiquadFilter();
  filtroGrave.type = 'lowpass';
  filtroGrave.frequency.setValueAtTime(140, ctx.currentTime);
  filtroGrave.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 1.2);

  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(0.35, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.4);

  fuenteRuido.connect(filtroGrave);
  filtroGrave.connect(gainNode);
  gainNode.connect(ctx.destination);
  fuenteRuido.start();
}

// Función auxiliar para pintar el carril del slider de forma dinámica
function actualizarColorBarra(color) {
  slider.style.background = `${color}40`;
  let estiloThumb = document.getElementById('estilo-thumb');
  if (!estiloThumb) {
    estiloThumb = document.createElement('style');
    estiloThumb.id = 'estilo-thumb';
    document.head.appendChild(estiloThumb);
  }
  estiloThumb.innerHTML = `
    input[type="range"]::-webkit-slider-thumb { background: ${color} !important; }
    input[type="range"]::-moz-range-thumb { background: ${color} !important; }
  `;
}

// Color inicial de la barra por defecto (Nivel 4: Calmado)
actualizarColorBarra("#4CAF50");

// ==========================================
// PARTE 2: FÁBRICAS NATIVAS DE PARTÍCULAS
// ==========================================

function crearBurbuja() {
  const burbuja = document.createElement('div');
  burbuja.classList.add('burbuja');
  const tamano = Math.random() * 30 + 15 + "px";
  burbuja.style.width = tamano;
  burbuja.style.height = tamano;
  burbuja.style.left = Math.random() * 100 + "vw";
  burbuja.style.animationDuration = Math.random() * 3 + 3 + "s";
  document.body.appendChild(burbuja);
  setTimeout(() => { burbuja.remove(); }, 6000);
}

function crearPedazoConfeti() {
  const confeti = document.createElement('div');
  confeti.classList.add('pedazo-confeti');
  confeti.style.left = Math.random() * 100 + "vw";
  const colores = ['#FF4081', '#00E676', '#00B0FF', '#FFEA00', '#D500F9', '#FF6D00'];
  confeti.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
  confeti.style.animationDuration = Math.random() * 1.5 + 2 + "s";
  const tamano = Math.random() * 6 + 10 + "px";
  confeti.style.width = tamano;
  confeti.style.height = tamano;
  document.body.appendChild(confeti);
  setTimeout(() => { confeti.remove(); }, 4000);
}

function crearZeta() {
  const zeta = document.createElement('div');
  zeta.classList.add('zeta-sueno');
  zeta.textContent = "Z";
  zeta.style.fontSize = "20px";
  zeta.style.left = Math.random() * 100 + "vw";
  zeta.style.animationDuration = Math.random() * 2 + 3 + "s";
  document.body.appendChild(zeta);
  setTimeout(() => { zeta.remove(); }, 5000);
}

function crearSalpicadura(x, y) {
  const particulas = 4;
  for (let i = 0; i < particulas; i++) {
    const splash = document.createElement('div');
    splash.classList.add('salpicadura');
    splash.style.left = x + 'px';
    splash.style.top = y + 'px';
    const dirX = (Math.random() * 60 - 30) + 'px';
    const dirY = (Math.random() * -40 - 10) + 'px';
    splash.style.setProperty('--x-dir', dirX);
    splash.style.setProperty('--y-dir', dirY);
    contenedorLluvia.appendChild(splash);
    setTimeout(() => { splash.remove(); }, 4000);
  }
}

function crearGota() {
  const gota = document.createElement('div');
  gota.classList.add('gota-lluvia');
  const xInicial = Math.random() * window.innerWidth;
  let yActual = -30;
  const velocidad = Math.random() * 15 + 18;
  gota.style.left = xInicial + 'px';
  gota.style.top = yActual + 'px';
  contenedorLluvia.appendChild(gota);

  const loopCaida = setInterval(() => {
    yActual += velocidad;
    gota.style.top = yActual + 'px';
    const tarjeta = document.querySelector('.termometro-emocional');
    const limitesTarjeta = tarjeta.getBoundingClientRect();

    if (
      xInicial >= limitesTarjeta.left &&
      xInicial <= limitesTarjeta.right &&
      yActual >= limitesTarjeta.top &&
      yActual <= limitesTarjeta.top + 25
    ) {
      clearInterval(loopCaida);
      gota.remove();
      crearSalpicadura(xInicial, limitesTarjeta.top);
    } else if (yActual >= window.innerHeight) {
      clearInterval(loopCaida);
      gota.remove();
      crearSalpicadura(xInicial, window.innerHeight - 5);
    }
  }, 20);
}

function crearEstreallaFeliz() {
  const estrella = document.createElement('div');
  estrella.classList.add('estrella-brillante');
  estrella.style.left = Math.random() * 100 + "vw";
  estrella.style.top = Math.random() * 100 + "vh";
  const movX = (Math.random() * 40 - 20) + "px";
  const movY = (Math.random() * 40 - 20) + "px";
  estrella.style.setProperty('--x-mov', movX);
  estrella.style.setProperty('--y-mov', movY);
  document.body.appendChild(estrella);
  setTimeout(() => { estrella.remove(); }, 1500);
}

function crearHojaSeca() {
  const hoja = document.createElement('div');
  hoja.classList.add('hoja-seca');
  hoja.style.left = Math.random() * 100 + "vw";
  hoja.style.animationDuration = Math.random() * 2 + 4 + "s";
  document.body.appendChild(hoja);
  setTimeout(() => { hoja.remove(); }, 6000);
}

// ==========================================
// PARTE 3: LÓGICA DE CONTROL Y MÁQUINA DE ESTADOS
// ==========================================

slider.addEventListener('input', (e) => {
  const estado = parseInt(e.target.value);
  
  // Limpieza inicial de la carita
  carita.classList.remove('genial');
  boca.style.border = 'none';
  boca.style.backgroundColor = 'transparent';
  boca.style.transform = "translateX(-50%) rotate(0deg)";
  
  // Detención masiva de todos los relojes de intervalos activos
  if (intervaloBurbujas) { clearInterval(intervaloBurbujas); intervaloBurbujas = null; }
  if (intervaloConfeti) { clearInterval(intervaloConfeti); intervaloConfeti = null; }
  if (intervaloZetas) { clearInterval(intervaloZetas); intervaloZetas = null; }
  if (intervaloLluvia) { clearInterval(intervaloLluvia); intervaloLluvia = null; }
  if (intervaloRelampagos) { clearInterval(intervaloRelampagos); intervaloRelampagos = null; }
  if (intervaloEstrellas) { clearInterval(intervaloEstrellas); intervaloEstrellas = null; }
  if (intervaloHojas) { clearInterval(intervaloHojas); intervaloHojas = null; }
  
  // Purgado estructural en caliente del DOM para evitar acumulación de código residual
  document.body.classList.remove('relampago', 'tormenta-activa');
  contenedorLluvia.innerHTML = '';
  document.querySelectorAll('.estrella-brillante').forEach(est => est.remove());
  document.querySelectorAll('.hoja-seca').forEach(hj => hj.remove());

  switch(estado) {
    case 1: // TRISTE / MOLESTO (Tormenta + Lluvia frontal con rebotes)
      textoEmocion.textContent = "Triste / Molesto 😢";
      textoEmocion.style.color = "#2196F3";
      carita.style.backgroundColor = "#2196F3";
      carita.style.boxShadow = sombra3D;
      actualizarColorBarra("#2196F3");
      
      document.body.classList.add('tormenta-activa');
      intervaloLluvia = setInterval(crearGota, 60);
      
      intervaloRelampagos = setInterval(() => {
        if (Math.random() < 0.35) {
          document.body.classList.add('relampago');
          reproducirSonidoTrueno();
          setTimeout(() => { document.body.classList.remove('relampago'); }, 400);
        }
      }, 2200); 

      reproducirSonidoGamer(150, 'sawtooth');
      break;

    case 2: // CANSADO
      textoEmocion.textContent = "Cansado / Sin energía 🥱";
      textoEmocion.style.color = "#607D8B";
      carita.style.backgroundColor = "#90A4AE";
      carita.style.boxShadow = sombra3D;
      actualizarColorBarra("#607D8B");
      
      cejaIzq.style.transform = "rotate(-10deg) translateY(2px)";
      cejaDer.style.transform = "rotate(10deg) translateY(2px)";
      boca.style.width = "50px";
      boca.style.height = "24px";
      boca.style.border = "8px solid #222";
      boca.style.borderRadius = "50% / 10% 10% 90% 90%";
      
      intervaloZetas = setInterval(crearZeta, 300);
      reproducirSonidoGamer(200, 'triangle');
      break;

    case 3: // UN POCO DESANIMADO (Hojas secas planeando)
      textoEmocion.textContent = "Un poco desanimado 😐";
      textoEmocion.style.color = "#9C27B0";
      carita.style.backgroundColor = "#B0BEC5";
      carita.style.boxShadow = sombra3D;
      actualizarColorBarra("#9C27B0");
      
      cejaIzq.style.transform = "rotate(0deg) translateY(0px)";
      cejaDer.style.transform = "rotate(0deg) translateY(0px)";
      boca.style.width = "80px";
      boca.style.height = "12px";
      boca.style.backgroundColor = "#222";
      boca.style.borderRadius = "0";
      
      intervaloHojas = setInterval(crearHojaSeca, 450);
      reproducirSonidoGamer(280, 'square');
      break;

    case 4: // CALMADO / BIEN
      textoEmocion.textContent = "Calmado / Bien 😌";
      textoEmocion.style.color = "#4CAF50";
      carita.style.backgroundColor = "#A5D6A7";
      carita.style.boxShadow = sombra3D;
      actualizarColorBarra("#4CAF50");
      
      cejaIzq.style.transform = "translateY(-2px)";
      cejaDer.style.transform = "translateY(-2px)";
      boca.style.width = "70px";
      boca.style.height = "30px";
      boca.style.borderBottom = "10px solid #222";
      boca.style.borderRadius = "0 0 70px 70px";
      
      reproducirSonidoGamer(380, 'square');
      break;

    case 5: // FELIZ (Estrellas brillantes amarillas)
      textoEmocion.textContent = "¡Feliz! 😄";
      textoEmocion.style.color = "#FF9800";
      carita.style.backgroundColor = "#FFEB3B";
      carita.style.boxShadow = sombra3D;
      actualizarColorBarra("#FF9800");
      
      cejaIzq.style.transform = "rotate(-10deg) translateY(-4px)";
      cejaDer.style.transform = "rotate(10deg) translateY(-4px)";
      boca.style.width = "100px";
      boca.style.height = "50px";
      boca.style.borderBottom = "10px solid #222";
      boca.style.borderRadius = "0 0 100px 100px";
      
      intervaloEstrellas = setInterval(crearEstreallaFeliz, 150);
      reproducirSonidoGamer(520, 'square');
      break;

    case 6: // SÚPER EMOCIONADO
      textoEmocion.textContent = "¡Súper Emocionado! 🤩";
      textoEmocion.style.color = "#E91E63";
      carita.style.backgroundColor = "#FF4081";
      carita.style.boxShadow = sombra3D;
      actualizarColorBarra("#E91E63");
      
      cejaIzq.style.transform = "translateY(-7px)";
      cejaDer.style.transform = "translateY(-7px)";
      boca.style.width = "64px";
      boca.style.height = "64px";
      boca.style.backgroundColor = "#222";
      boca.style.borderRadius = "50%";
      
      intervaloBurbujas = setInterval(crearBurbuja, 200);
      reproducirSonidoGamer(680, 'square');
      break;

    case 7: // GENIAL / COOL
      textoEmocion.textContent = "¡Genial / Cool! 😎";
      textoEmocion.style.color = "#7B1FA2";
      carita.style.backgroundColor = "#E040FB";
      carita.style.boxShadow = sombra3D;
      actualizarColorBarra("#7B1FA2");
      
      carita.classList.add('genial');
      cejaIzq.style.transform = "rotate(-5deg) translateY(-6px)";
      cejaDer.style.transform = "rotate(5deg) translateY(-6px)";
      boca.style.width = "70px";
      boca.style.height = "30px";
      boca.style.borderBottom = "10px solid #222";
      boca.style.borderRadius = "0 0 70px 70px";
      boca.style.transform = "translateX(-40%) rotate(-8deg)";
      
      intervaloBurbujas = setInterval(crearBurbuja, 200);
      intervaloConfeti = setInterval(crearPedazoConfeti, 80);
      reproducirSonidoGamer(0, 'triangle', true);
      break;
  }
});
