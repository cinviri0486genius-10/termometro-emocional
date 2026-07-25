const slider = document.getElementById('control-emocion');
const carita = document.getElementById('carita');
const cejaIzq = document.getElementById('ceja-izq');
const cejaDer = document.getElementById('ceja-der');
const boca = document.getElementById('boca');
const textoEmocion = document.getElementById('texto-emocion');

const sombra3D = `
  inset -10px -15px 30px rgba(0, 0, 0, 0.25),
  inset 10px 15px 25px rgba(255, 255, 255, 0.4),
  0 12px 20px rgba(0, 0, 0, 0.15)
`;

slider.addEventListener('input', (e) => {
  const estado = parseInt(e.target.value);
  
  // Limpieza de estados especiales (como lentes de sol)
  carita.classList.remove('genial');
  boca.style.border = 'none';
  boca.style.backgroundColor = 'transparent';
  boca.style.transform = "translateX(-50%) rotate(0deg)";

  switch(estado) {
    case 1: // TRISTE / MOLESTO
      textoEmocion.textContent = "Triste / Molesto 😢";
      textoEmocion.style.color = "#2196F3";
      carita.style.backgroundColor = "#2196F3";
      carita.style.boxShadow = sombra3D;
      cejaIzq.style.transform = "rotate(15deg) translateY(4px)";
      cejaDer.style.transform = "rotate(-15deg) translateY(4px)";
      boca.style.width = "40px";
      boca.style.height = "20px";
      boca.style.borderTop = "6px solid #222";
      boca.style.borderRadius = "20px 20px 0 0";
      break;

    case 2: // CANSADO (¡Nuevo!)
      textoEmocion.textContent = "Cansado / Sin energía 🥱";
      textoEmocion.style.color = "#607D8B";
      carita.style.backgroundColor = "#90A4AE"; // Azul grisáceo deslavado
      carita.style.boxShadow = sombra3D;
      cejaIzq.style.transform = "rotate(-10deg) translateY(2px)";
      cejaDer.style.transform = "rotate(10deg) translateY(2px)";
      // Boca entreabierta pequeña y triste
      boca.style.width = "25px";
      boca.style.height = "12px";
      boca.style.border = "4px solid #222";
      boca.style.borderRadius = "50% / 10% 10% 90% 90%";
      break;

    case 3: // UN POCO DESANIMADO
      textoEmocion.textContent = "Un poco desanimado 😐";
      textoEmocion.style.color = "#9C27B0";
      carita.style.backgroundColor = "#B0BEC5";
      carita.style.boxShadow = sombra3D;
      cejaIzq.style.transform = "rotate(0deg) translateY(0px)";
      cejaDer.style.transform = "rotate(0deg) translateY(0px)";
      boca.style.width = "40px";
      boca.style.height = "6px";
      boca.style.backgroundColor = "#222";
      boca.style.borderRadius = "0";
      break;

    case 4: // CALMADO / BIEN
      textoEmocion.textContent = "Calmado / Bien 😌";
      textoEmocion.style.color = "#4CAF50";
      carita.style.backgroundColor = "#A5D6A7";
      carita.style.boxShadow = sombra3D;
      cejaIzq.style.transform = "translateY(-2px)";
      cejaDer.style.transform = "translateY(-2px)";
      boca.style.width = "35px";
      boca.style.height = "15px";
      boca.style.borderBottom = "6px solid #222";
      boca.style.borderRadius = "0 0 35px 35px";
      break;

    case 5: // FELIZ
      textoEmocion.textContent = "¡Feliz! 😄";
      textoEmocion.style.color = "#FF9800";
      carita.style.backgroundColor = "#FFEB3B";
      carita.style.boxShadow = sombra3D;
      cejaIzq.style.transform = "rotate(-10deg) translateY(-4px)";
      cejaDer.style.transform = "rotate(10deg) translateY(-4px)";
      boca.style.width = "50px";
      boca.style.height = "25px";
      boca.style.borderBottom = "6px solid #222";
      boca.style.borderRadius = "0 0 50px 50px";
      break;

    case 6: // SÚPER EMOCIONADO
      textoEmocion.textContent = "¡Súper Emocionado! 🤩";
      textoEmocion.style.color = "#E91E63";
      carita.style.backgroundColor = "#FF4081";
      carita.style.boxShadow = sombra3D;
      cejaIzq.style.transform = "translateY(-7px)";
      cejaDer.style.transform = "translateY(-7px)";
      boca.style.width = "32px";
      boca.style.height = "32px";
      boca.style.backgroundColor = "#222";
      boca.style.borderRadius = "50%";
      break;

    case 7: // GENIAL (¡Nuevo!)
      textoEmocion.textContent = "¡Genial / Cool! 😎";
      textoEmocion.style.color = "#7B1FA2";
      carita.style.backgroundColor = "#E040FB"; // Morado neón brillante
      carita.style.boxShadow = sombra3D;
      carita.classList.add('genial'); // Activa las gafas de sol en CSS
      cejaIzq.style.transform = "rotate(-5deg) translateY(-6px)";
      cejaDer.style.transform = "rotate(5deg) translateY(-6px)";
      // Sonrisa ladina / de lado
      boca.style.width = "35px";
      boca.style.height = "15px";
      boca.style.borderBottom = "6px solid #222";
      boca.style.borderRadius = "0 0 35px 35px";
      boca.style.transform = "translateX(-40%) rotate(-8deg)";
      break;
  }
});
