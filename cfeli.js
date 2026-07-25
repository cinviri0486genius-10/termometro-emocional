// ==========================================
// PARTE 1: CONFIGURACIÓN GENERAL Y ELEMENTOS
// ==========================================

const slider = document.getElementById('control-emocion');
const carita = document.getElementById('carita');
const cejaIzq = document.getElementById('ceja-izq');
const cejaDer = document.getElementById('ceja-der');
const boca = document.getElementById('boca');
const textoEmocion = document.getElementById('texto-emocion');

// Estilos de sombreado 3D para la esfera de la carita
const sombra3D = `
  inset -10px -15px 30px rgba(0, 0, 0, 0.25),
  inset 10px 15px 25px rgba(255, 255, 255, 0.4),
  0 12px 20px rgba(0, 0, 0, 0.15)
`;

let intervaloBurbujas = null;
let intervaloConfeti = null;
let intervaloZetas = null;

// FUNCIÓN NATIVA PARA GENERAR SONIDOS GAMER PERSONALIZADOS POR NIVEL
function reproducirSonidoGamer(frecuenciaBase, tipoOnda = 'square', esEstrella = false) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  
  // EFECTO MÁGICO DE ESTRELLA (Nivel Genial / Cool)
  if (esEstrella) {
    const notasEstrella = [1046.50, 1318.51, 1567.98, 2093.00]; // Do, Mi, Sol, Do (Octava alta)
    notasEstrella.forEach((frec, indice) => {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = 'triangle'; // Onda suave para destellos brillantes
        osc.frequency.setValueAtTime(frec, ctx.currentTime);
        
        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.15);
      }, indice * 60); // Desfase rápido tipo arpegio retro
    });
    return;
  }

  // TONOS GAMER ESTÁNDAR PARA EL RESTO DE EMOCIONES
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

// Función para pintar el carril y el circulito deslizante de forma segura
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

// FÁBRICA NATIVA DE BURBUJAS FLOTANTES
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

// FÁBRICA NATIVA DE LLUVIA DE CONFETI
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

// FÁBRICA NATIVA DE ZETAS FLOTANTES
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

// Color inicial verde para el estado por defecto "Calmado" (Nivel 4)
actualizarColorBarra("#4CAF50");

// ==========================================
// PARTE 2: LÓGICA DEL CONTROL Y CAMBIO DE EMOCIÓN
// ==========================================

slider.addEventListener('input', (e) => {
  const estado = parseInt(e.target.value);
  
  // Limpieza general de estados anteriores
  carita.classList.remove('genial');
  boca.style.border = 'none';
  boca.style.backgroundColor = 'transparent';
  boca.style.transform = "translateX(-50%) rotate(0deg)";
  
  // Detener todas las fábricas activas al cambiar de emoción
  if (intervaloBurbujas) { clearInterval(intervaloBurbujas); intervaloBurbujas = null; }
  if (intervaloConfeti) { clearInterval(intervaloConfeti); intervaloConfeti = null; }
  if (intervaloZetas) { clearInterval(intervaloZetas); intervaloZetas = null; }

  switch(estado) {
    case 1: // TRISTE / MOLESTO
      textoEmocion.textContent = "Triste / Molesto 😢";
      textoEmocion.style.color = "#2196F3";
      carita.style.backgroundColor = "#2196F3";
      carita.style.boxShadow = sombra3D;
      actualizarColorBarra("#2196F3");
      
      cejaIzq.style.transform = "rotate(15deg) translateY(4px)";
      cejaDer.style.transform = "rotate(-15deg) translateY(4px)";
      boca.style.width = "80px";
      boca.style.height = "40px";
      boca.style.borderTop = "10px solid #222";
      boca.style.borderRadius = "40px 40px 0 0";
      
      reproducirSonidoGamer(150, 'sawtooth'); // Tono grave/enojado
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
      
      intervaloZetas = setInterval(crearZeta, 300); // Inicia ráfaga de Zetas
      reproducirSonidoGamer(200, 'triangle'); // Tono de baja energía
      break;

    case 3: // UN POCO DESANIMADO
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
      
      reproducirSonidoGamer(280, 'square'); // Click neutro
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
      
      reproducirSonidoGamer(380, 'square'); // Sonido medio
      break;

    case 5: // FELIZ
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
      
      reproducirSonidoGamer(520, 'square'); // Sonido agudo alegre
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
      reproducirSonidoGamer(680, 'square'); // Sonido de victoria rápido
      break;

    case 7: // GENIAL / COOL (Burbujas + Confeti + Estrellas)
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
      reproducirSonidoGamer(0, 'triangle', true); // Sonido mágico arpegiado
      break;
  }
});
