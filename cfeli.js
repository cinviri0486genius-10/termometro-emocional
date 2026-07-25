/* ==========================================
   PARTE 1: BASE DE LA INTERFAZ Y TARJETA CRISTAL
   ========================================== */

body {
  /* Paleta de colores estilo tornasol / iridiscente */
  background: linear-gradient(-45deg, #ff9a9e, #fecfef, #a1c4fd, #c2e9fb, #d4fc79, #96e6a1);
  background-size: 400% 400%;
  
  /* Animación continua para simular el reflejo tornasol */
  animation: efectoTornasol 12s ease infinite;
  
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  overflow: hidden; /* Evita barras de desplazamiento por los efectos visuales */
}

/* Lógica del movimiento de los colores tornasol */
@keyframes efectoTornasol {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* TARJETA CONTENEDORA ESTILO CRISTAL */
.termometro-emocional {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Comic Sans MS', 'Arial', sans-serif;
  background-color: rgba(255, 255, 255, 0.95); /* Fondo blanco semi-transparente */
  padding: 30px;
  border-radius: 25px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.2);
  max-width: 420px; /* Ancho ampliado para la carita grande */
  width: 100%;
  text-align: center;
  backdrop-filter: blur(5px); /* Suave desenfoque detrás de la tarjeta */
  z-index: 10; /* La tarjeta se mantiene en un nivel intermedio */
}

h2 { 
  font-family: 'Black Ops One', serif;
  font-size: 32px; /* Tamaño de impacto visual */
  color: #111; /* Color base oscuro para contraste */
  text-shadow: 2px 2px 0px #39FF14; /* Sombra verde neón estilo HUD gamer */
  text-transform: uppercase; /* Fuerza las mayúsculas */
  letter-spacing: 2px; /* Espaciado entre letras */
  margin-top: 0;
  margin-bottom: 5px;
  
  /* Lógica de la animación de parpadeo arcade */
  animation: parpadeoArcade 1.5s infinite steps(2);
}

@keyframes parpadeoArcade {
  0%, 100% { text-shadow: 2px 2px 0px #39FF14; }
  50% { text-shadow: none; color: #222; }
}

/* CARITA GRANDE CON EFECTO 3D ESFÉRICO */
.carita {
  width: 280px;
  height: 280px;
  background-color: #A5D6A7; /* Color inicial neutro */
  border-radius: 50%;
  position: relative;
  transition: all 0.4s ease;
  margin: 25px 0;
  
  /* Sombreado múltiple de profundidad esférica */
  box-shadow: 
    inset -18px -25px 45px rgba(0, 0, 0, 0.25),
    inset 18px 25px 35px rgba(255, 255, 255, 0.4),
    0 15px 25px rgba(0, 0, 0, 0.15);
}

/* BRILLO DE CRISTAL SUPERIOR (Efecto burbuja/3D) */
.carita::before {
  content: '';
  position: absolute;
  top: 15px;
  left: 50px;
  width: 180px;
  height: 70px;
  background: linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0));
  border-radius: 50% / 100% 100% 0 0;
}

/* ELEMENTOS DEL ROSTRO CON ANIMACIÓN DE PARPADEO */
.ojo {
  width: 32px;
  height: 32px;
  background-color: #222;
  border-radius: 50%;
  position: absolute;
  top: 100px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
  animation: parpadeoAutomatico 4s infinite linear;
}
.ojo.izquierdo { left: 75px; }
.ojo.derecho { right: 75px; }

@keyframes parpadeoAutomatico {
  0%, 95%, 100% { transform: scaleY(1); }
  97%, 99% { transform: scaleY(0.1); }
}

.cejas-container {
  position: absolute;
  top: 60px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 0 50px;
  box-sizing: border-box;
}

.ceja {
  width: 50px;
  height: 12px;
  background-color: #222;
  border-radius: 6px;
  transition: all 0.4s ease;
  box-shadow: 0 3px 4px rgba(0,0,0,0.2);
}

.boca {
  position: absolute;
  bottom: 65px;
  left: 50%;
  transform: translateX(-50%);
  background-color: transparent;
  transition: all 0.4s ease;
  width: 70px;
  height: 30px;
  border-bottom: 10px solid #222;
  border-radius: 0 0 70px 70px;
}

.texto-emocion {
  font-family: 'Black Ops One', serif;
  font-size: 22px;
  margin: 15px 0;
  text-transform: uppercase;
  color: #4CAF50;
  letter-spacing: 1px;
}

/* ==========================================
   PARTE 2: CONTROLES Y EFECTOS DE PARTÍCULAS
   ========================================== */

/* PERSONALIZACIÓN DE LA BARRA DE RANGO */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 90%;
  height: 12px;
  background: #e2e8f0;
  border-radius: 10px;
  outline: none;
  margin: 25px 0 10px 0;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
  transition: background 0.4s ease;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #4CAF50;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0,0,0,0.25), inset 0 2px 2px rgba(255,255,255,0.4);
  transition: background 0.4s ease, transform 0.1s ease;
}

input[type="range"]::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #4CAF50;
  cursor: pointer;
  border: none;
  box-shadow: 0 3px 6px rgba(0,0,0,0.25), inset 0 2px 2px rgba(255,255,255,0.4);
  transition: background 0.4s ease, transform 0.1s ease;
}

input[type="range"]::-webkit-slider-thumb:active { transform: scale(1.2); }
input[type="range"]::-moz-range-thumb:active { transform: scale(1.2); }

/* ESTILO ADAPTADO PARA LOS LENTES COOL */
.carita.genial .ojo {
  width: 60px;
  height: 38px;
  background-color: #111;
  border-radius: 6px 6px 25px 25px;
  top: 95px;
  animation: none;
}
.carita.genial .ojo.izquierdo { left: 60px; }
.carita.genial .ojo.derecho { right: 60px; }

.carita.genial::after {
  content: '';
  position: absolute;
  top: 102px;
  left: 120px;
  width: 40px;
  height: 10px;
  background-color: #111;
}

/* EFECTO DE BURBUJAS FLOTANTES NATIVAS */
.burbuja {
  position: absolute;
  bottom: -20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  pointer-events: none;
  animation: flotarBurbujas 4s linear forwards;
  box-shadow: 
    inset 0 0 10px rgba(255, 255, 255, 0.6),
    inset -3px -3px 8px rgba(254, 207, 239, 0.5),
    0 4px 10px rgba(161, 196, 253, 0.3);
}

@keyframes flotarBurbujas {
  0% { transform: translateY(0) scale(0.5); opacity: 0; }
  10% { opacity: 0.8; }
  90% { opacity: 0.8; }
  100% { transform: translateY(-105vh) scale(1.2); opacity: 0; }
}

/* EFECTO DE CONFETI NATIVO PROPIO */
.pedazo-confeti {
  position: absolute;
  top: -20px;
  width: 12px;
  height: 12px;
  border-radius: 2px;
  pointer-events: none;
  z-index: 5;
  animation: lluviaConfeti 3.5s linear forwards;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
}

@keyframes lluviaConfeti {
  0% { transform: translateY(0) rotate(0deg) translateX(0); opacity: 1; }
  100% { transform: translateY(105vh) rotate(720deg) translateX(50px); opacity: 0; }
}

/* EFECTO DE ZETAS FLOTANTES (ESTADO CANSADO) */
.zeta-sueno {
  position: absolute;
  bottom: -40px;
  font-family: 'Black Ops One', serif;
  color: #607D8B;
  font-weight: bold;
  pointer-events: none;
  z-index: 5;
  animation: flotarZetas 4s ease-in forwards;
  opacity: 0;
}

@keyframes flotarZetas {
  0% { transform: translateY(0) scale(0.3) rotate(-15deg); opacity: 0; }
  15% { opacity: 0.7; }
  50% { transform: translateY(-50vh) scale(0.9) rotate(15deg) translateX(40px); }
  100% { transform: translateY(-105vh) scale(1.5) rotate(-10deg) translateX(-30px); opacity: 0; }
}

/* NUEVO: EFECTO DE LLUVIA CON REBOTE FRONTAL EXCLUSIVO (ESTADO TRISTE) */
.lluvia-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none; 
  z-index: 20; /* Pasado al frente por encima de la tarjeta blanca */
  overflow: hidden;
}

.gota-lluvia {
  position: absolute;
  background: linear-gradient(transparent, rgba(255, 255, 255, 0.6));
  width: 2px;
  height: 25px;
  pointer-events: none;
}

/* Partícula de rebote / salpicadura */
.salpicadura {
  position: absolute;
  width: 4px;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  pointer-events: none;
  animation: rebotarSplash 0.4s ease-out forwards;
}

@keyframes rebotarSplash {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    /* Explota hacia arriba en parábola con las variables calculadas por JS */
    transform: translate(var(--x-dir), var(--y-dir)) scale(0.2);
    opacity: 0;
  }
}

/* --- EFECTO DE RELÁMPAGO DE TORMENTA (ESTADO TRISTE) --- */
body.relampago {
  /* Genera un flash blanco intenso sobre el fondo actual */
  background: #ffffff !important;
  animation: destelloRayo 0.4s ease-out;
}

@keyframes destelloRayo {
  0% { opacity: 1; }
  20% { opacity: 0.7; }
  40% { opacity: 1; } /* Simula el doble parpadeo típico de un rayo */
  100% { opacity: 1; }
}

/* --- AMBIENTACIÓN OSCURA PARA LA TORMENTA (ESTADO 1) --- */
body.tormenta-activa {
  /* Sobrescribe el fondo tornasol por un gradiente gris oscuro de tormenta */
  background: linear-gradient(-45deg, #1f2937, #111827, #374151, #111827) !important;
  background-size: 400% 400%;
}

body.tormenta-activa.relampago {
  /* Cuando hay relámpago, la pantalla destella a blanco brillante */
  background: #ffffff !important;
  animation: destelloRayo 0.4s ease-out;
}

/* --- ESTRELLITAS BRILLANTES (ESTADO 5: FELIZ) --- */
.estrella-brillante {
  position: absolute;
  width: 15px;
  height: 15px;
  background-color: #fff;
  /* Forma geométrica retro de estrella de 4 puntas */
  clip-path: polygon(50% 0%, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%, 0% 50%, 35% 35%);
  pointer-events: none;
  z-index: 1;
  animation: brillarEstrealla 1.2s ease-in-out forwards;
}

@keyframes brillarEstrealla {
  0% {
    transform: translate(0, 0) scale(0) rotate(0deg);
    opacity: 0;
    background-color: #FFF59D;
  }
  50% {
    opacity: 1;
    transform: translate(var(--x-mov), var(--y-mov)) scale(1.2) rotate(180deg);
    background-color: #FFF59D;
    box-shadow: 0 0 10px #FFEB3B;
  }
  100% {
    transform: translate(var(--x-mov), var(--y-mov)) scale(0) rotate(360deg);
    opacity: 0;
  }
}

/* --- EFECTO DE HOJAS SECAS (ESTADO 3: UN POCO DESANIMADO) --- */
.hoja-seca {
  position: absolute;
  top: -20px;
  width: 14px;
  height: 9px;
  background-color: #a6b1b7; /* Gris azulado apagado y nostálgico */
  border-radius: 50% 0; /* Geometría simple de hoja retro */
  pointer-events: none;
  z-index: 1; /* Cae por detrás de la tarjeta cristal */
  animation: caerHojaPausada 5s ease-in-out forwards;
}

@keyframes caerHojaPausada {
  0% {
    transform: translateY(0) rotate(0deg) translateX(0);
    opacity: 0;
  }
  15% {
    opacity: 0.6;
  }
  50% {
    /* Balanceo hacia la derecha a mitad del camino */
    transform: translateY(50vh) rotate(180deg) translateX(40px);
  }
  100% {
    /* Balanceo hacia la izquierda al llegar al fondo */
    transform: translateY(105vh) rotate(360deg) translateX(-30px);
    opacity: 0;
  }
}

/* --- VENTANA DE BIENVENIDA (REGISTRO) --- */
/* ==========================================
   PARTE 1: BASE DE LA INTERFAZ Y MODAL DE BIENVENIDA
   ========================================== */

body {
  /* Paleta de colores estilo tornasol / iridiscente */
  background: linear-gradient(-45deg, #ff9a9e, #fecfef, #a1c4fd, #c2e9fb, #d4fc79, #96e6a1);
  background-size: 400% 400%;
  
  /* Animación continua para simular el reflejo tornasol */
  animation: efectoTornasol 12s ease infinite;
  
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  overflow: hidden; /* Evita barras de desplazamiento por los efectos visuales */
}

/* Lógica del movimiento de los colores tornasol */
@keyframes efectoTornasol {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* --- VENTANA DE BIENVENIDA (MODAL A PANTALLA COMPLETA) --- */
.modal-registro {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(20, 20, 30, 0.6); /* Fondo oscuro semi-transparente para dar contraste */
  backdrop-filter: blur(10px); /* Difumina el termómetro de fondo mientras se registra */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100; /* Asegura que tape por completo el termómetro al inicio */
  transition: opacity 0.4s ease, visibility 0.4s ease;
}

.modal-registro.oculto {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.tarjeta-registro {
  background: #ffffff; /* Fondo blanco sólido para que no se transparente nada */
  padding: 35px;
  border-radius: 25px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  font-family: 'Comic Sans MS', sans-serif;
  max-width: 340px;
  width: 90%;
  display: flex;
  flex-direction: column; /* Alinea los elementos uno abajo del otro verticalmente */
  align-items: center;
}

.tarjeta-registro h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #111;
  font-size: 22px;
}

.tarjeta-registro input {
  width: 90%;
  padding: 12px;
  border: 2px solid #cfd8dc;
  border-radius: 12px;
  font-size: 16px;
  outline: none;
  text-align: center;
  margin-bottom: 20px;
  font-family: inherit;
}

.tarjeta-registro button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(76, 175, 80, 0.3);
  transition: all 0.2s ease;
}

.tarjeta-registro button:hover {
  background-color: #43A047;
  transform: translateY(-2px);
}

.tarjeta-registro button:active {
  transform: translateY(0) scale(0.95);
}

/* TARJETA CONTENEDORA ESTILO CRISTAL */
.termometro-emocional {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Comic Sans MS', 'Arial', sans-serif;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 25px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.2);
  max-width: 420px;
  width: 100%;
  text-align: center;
  backdrop-filter: blur(5px);
  z-index: 10; /* Nivel intermedio por debajo del modal y la lluvia */
}

h2 { 
  font-family: 'Black Ops One', serif;
  font-size: 32px;
  color: #111;
  text-shadow: 2px 2px 0px #39FF14;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 0;
  margin-bottom: 5px;
  animation: parpadeoArcade 1.5s infinite steps(2);
}

@keyframes parpadeoArcade {
  0%, 100% { text-shadow: 2px 2px 0px #39FF14; }
  50% { text-shadow: none; color: #222; }
}

/* CARITA GRANDE CON EFECTO 3D ESFÉRICO */
.carita {
  width: 280px;
  height: 280px;
  background-color: #A5D6A7;
  border-radius: 50%;
  position: relative;
  transition: all 0.4s ease;
  margin: 25px 0;
  box-shadow: 
    inset -18px -25px 45px rgba(0, 0, 0, 0.25),
    inset 18px 25px 35px rgba(255, 255, 255, 0.4),
    0 15px 25px rgba(0, 0, 0, 0.15);
}

.carita::before {
  content: '';
  position: absolute;
  top: 15px;
  left: 50px;
  width: 180px;
  height: 70px;
  background: linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0));
  border-radius: 50% / 100% 100% 0 0;
}

.ojo {
  width: 32px;
  height: 32px;
  background-color: #222;
  border-radius: 50%;
  position: absolute;
  top: 100px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
  animation: parpadeoAutomatico 4s infinite linear;
}
.ojo.izquierdo { left: 75px; }
.ojo.derecho { right: 75px; }

@keyframes parpadeoAutomatico {
  0%, 95%, 100% { transform: scaleY(1); }
  97%, 99% { transform: scaleY(0.1); }
}

.cejas-container {
  position: absolute;
  top: 60px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 0 50px;
  box-sizing: border-box;
}

.ceja {
  width: 50px;
  height: 12px;
  background-color: #222;
  border-radius: 6px;
  transition: all 0.4s ease;
  box-shadow: 0 3px 4px rgba(0,0,0,0.2);
}

.boca {
  position: absolute;
  bottom: 65px;
  left: 50%;
  transform: translateX(-50%);
  background-color: transparent;
  transition: all 0.4s ease;
  width: 70px;
  height: 30px;
  border-bottom: 10px solid #222;
  border-radius: 0 0 70px 70px;
}

.texto-emocion {
  font-family: 'Black Ops One', serif;
  font-size: 22px;
  margin: 15px 0;
  text-transform: uppercase;
  color: #4CAF50;
  letter-spacing: 1px;
}

/* ==========================================
   PARTE 2: CONTROLES Y EFECTOS DE PARTÍCULAS
   ========================================== */

/* PERSONALIZACIÓN DE LA BARRA DE RANGO */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 90%;
  height: 12px;
  background: #e2e8f0;
  border-radius: 10px;
  outline: none;
  margin: 25px 0 10px 0;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
  transition: background 0.4s ease;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #4CAF50;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0,0,0,0.25), inset 0 2px 2px rgba(255,255,255,0.4);
  transition: background 0.4s ease, transform 0.1s ease;
}

input[type="range"]::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #4CAF50;
  cursor: pointer;
  border: none;
  box-shadow: 0 3px 6px rgba(0,0,0,0.25), inset 0 2px 2px rgba(255,255,255,0.4);
  transition: background 0.4s ease, transform 0.1s ease;
}

input[type="range"]::-webkit-slider-thumb:active { transform: scale(1.2); }
input[type="range"]::-moz-range-thumb:active { transform: scale(1.2); }

/* --- BOTÓN PARA CAMBIAR DE USUARIO (RESET) --- */
.btn-cambiar-usuario {
  background-color: transparent;
  color: #78909c; /* Gris azulado discreto */
  border: 2px dashed #b0bec5;
  padding: 8px 15px;
  font-family: 'Comic Sans MS', sans-serif;
  font-size: 13px;
  font-weight: bold;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.2s ease;
  z-index: 15; /* Se mantiene al frente para recibir clics sin problemas */
}

.btn-cambiar-usuario:hover {
  background-color: #ffebee;
  color: #d32f2f;
  border: 2px solid #ef5350;
  transform: scale(1.05);
}

.btn-cambiar-usuario:active {
  transform: scale(0.95);
}

/* LENTES COOL (ESTADO 7) */
.carita.genial .ojo {
  width: 60px;
  height: 38px;
  background-color: #111;
  border-radius: 6px 6px 25px 25px;
  top: 95px;
  animation: none;
}
.carita.genial .ojo.izquierdo { left: 60px; }
.carita.genial .ojo.derecho { right: 60px; }

.carita.genial::after {
  content: '';
  position: absolute;
  top: 102px;
  left: 120px;
  width: 40px;
  height: 10px;
  background-color: #111;
}

/* EFECTO DE BURBUJAS FLOTANTES (ESTADO 6 Y 7) */
.burbuja {
  position: absolute;
  bottom: -20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  pointer-events: none;
  animation: flotarBurbujas 4s linear forwards;
  box-shadow: 
    inset 0 0 10px rgba(255, 255, 255, 0.6),
    inset -3px -3px 8px rgba(254, 207, 239, 0.5),
    0 4px 10px rgba(161, 196, 253, 0.3);
}

@keyframes flotarBurbujas {
  0% { transform: translateY(0) scale(0.5); opacity: 0; }
  10% { opacity: 0.8; }
  90% { opacity: 0.8; }
  100% { transform: translateY(-105vh) scale(1.2); opacity: 0; }
}

/* EFECTO DE CONFETI (ESTADO 7) */
.pedazo-confeti {
  position: absolute;
  top: -20px;
  width: 12px;
  height: 12px;
  border-radius: 2px;
  pointer-events: none;
  z-index: 5;
  animation: lluviaConfeti 3.5s linear forwards;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
}

@keyframes lluviaConfeti {
  0% { transform: translateY(0) rotate(0deg) translateX(0); opacity: 1; }
  100% { transform: translateY(105vh) rotate(720deg) translateX(50px); opacity: 0; }
}

/* EFECTO DE ZETAS (ESTADO 2: CANSADO) */
.zeta-sueno {
  position: absolute;
  bottom: -40px;
  font-family: 'Black Ops One', serif;
  color: #607D8B;
  font-weight: bold;
  pointer-events: none;
  z-index: 5;
  animation: flotarZetas 4s ease-in forwards;
  opacity: 0;
}

@keyframes flotarZetas {
  0% { transform: translateY(0) scale(0.3) rotate(-15deg); opacity: 0; }
  15% { opacity: 0.7; }
  50% { transform: translateY(-50vh) scale(0.9) rotate(15deg) translateX(40px); }
  100% { transform: translateY(-105vh) scale(1.5) rotate(-10deg) translateX(-30px); opacity: 0; }
}

/* --- EFECTO DE HOJAS SECAS (ESTADO 3: UN POCO DESANIMADO) --- */
.hoja-seca {
  position: absolute;
  top: -20px;
  width: 14px;
  height: 9px;
  background-color: #a6b1b7;
  border-radius: 50% 0;
  pointer-events: none;
  z-index: 1;
  animation: caerHojaPausada 5s ease-in-out forwards;
}

@keyframes caerHojaPausada {
  0% { transform: translateY(0) rotate(0deg) translateX(0); opacity: 0; }
  15% { opacity: 0.6; }
  50% { transform: translateY(50vh) rotate(180deg) translateX(40px); }
  100% { transform: translateY(105vh) rotate(360deg) translateX(-30px); opacity: 0; }
}

/* --- ESTRELLITAS BRILLANTES (ESTADO 5: FELIZ) --- */
.estrella-brillante {
  position: absolute;
  width: 15px;
  height: 15px;
  background-color: #fff;
  clip-path: polygon(50% 0%, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%, 0% 50%, 35% 35%);
  pointer-events: none;
  z-index: 1;
  animation: brillarEstrealla 1.2s ease-in-out forwards;
}

@keyframes brillarEstrealla {
  0% { transform: translate(0, 0) scale(0) rotate(0deg); opacity: 0; background-color: #FFF59D; }
  50% { opacity: 1; transform: translate(var(--x-mov), var(--y-mov)) scale(1.2) rotate(180deg); background-color: #FFF59D; box-shadow: 0 0 10px #FFEB3B; }
  100% { transform: translate(var(--x-mov), var(--y-mov)) scale(0) rotate(360deg); opacity: 0; }
}

/* --- EFECTO DE LLUVIA FRONTAL E ILUMINACIÓN (ESTADO 1: TORMENTA) --- */
.lluvia-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none; 
  z-index: 20; /* Capa frontal por encima de la tarjeta blanca para que se logren ver las gotas */
  overflow: hidden;
}

.gota-lluvia {
  position: absolute;
  background: linear-gradient(transparent, rgba(255, 255, 255, 0.6));
  width: 2px;
  height: 25px;
  pointer-events: none;
}

.salpicadura {
  position: absolute;
  width: 4px;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  pointer-events: none;
  animation: rebotarSplash 0.4s ease-out forwards;
}

@keyframes rebotarSplash {
  0% { transform: translate(0, 0) scale(1); opacity: 1; }
  100% { transform: translate(var(--x-dir), var(--y-dir)) scale(0.2); opacity: 0; }
}

body.tormenta-activa {
  background: linear-gradient(-45deg, #1f2937, #111827, #374151, #111827) !important;
  background-size: 400% 400%;
}

body.tormenta-activa.relampago {
  background: #ffffff !important;
  animation: destelloRayo 0.4s ease-out;
}

@keyframes destelloRayo {
  0% { opacity: 1; }
  20% { opacity: 0.7; }
  40% { opacity: 1; }
  100% { opacity: 1; }
}
