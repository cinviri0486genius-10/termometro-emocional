const slider = document.getElementById('control-emocion');
const carita = document.getElementById('carita');
const cejaIzq = document.getElementById('ceja-izq');
const cejaDer = document.getElementById('ceja-der');
const boca = document.getElementById('boca');
const textoEmocion = document.getElementById('texto-emocion');

slider.addEventListener('input', (e) => {
  const estado = parseInt(e.target.value);
  
  // Reiniciar estilos de boca comunes para evitar conflictos
  boca.style.border = 'none';
  boca.style.backgroundColor = 'transparent';

  switch(estado) {
    case 1: // TRISTE o ENOJADO (Azul)
      textoEmocion.textContent = "Triste / Molesto 😢";
      textoEmocion.style.color = "#2196F3";
      carita.style.backgroundColor = "#2196F3";
      // Cejas inclinadas hacia el centro
      cejaIzq.style.transform = "rotate(15deg) translateY(4px)";
      cejaDer.style.transform = "rotate(-15deg) translateY(4px)";
      // Boca triste (arco hacia abajo)
      boca.style.width = "40px";
      boca.style.height = "20px";
      boca.style.borderTop = "5px solid #333";
      boca.style.borderRadius = "20px 20px 0 0";
      break;

    case 2: // UN POCO BAJO / ABURRIDO (Gris o Morado claro)
      textoEmocion.textContent = "Un poco desanimado 😐";
      textoEmocion.style.color = "#9C27B0";
      carita.style.backgroundColor = "#E0E0E0";
      // Cejas rectas
      cejaIzq.style.transform = "rotate(0deg) translateY(0px)";
      cejaDer.style.transform = "rotate(0deg) translateY(0px)";
      // Boca en línea recta
      boca.style.width = "40px";
      boca.style.height = "5px";
      boca.style.backgroundColor = "#333";
      boca.style.borderRadius = "0";
      break;

    case 3: // NEUTRO / CALMADO (Verde)
      textoEmocion.textContent = "Calmado / Bien 😌";
      textoEmocion.style.color = "#4CAF50";
      carita.style.backgroundColor = "#A5D6A7";
      // Cejas ligeramente levantadas
      cejaIzq.style.transform = "translateY(-2px)";
      cejaDer.style.transform = "translateY(-2px)";
      // Media sonrisa pequeña
      boca.style.width = "35px";
      boca.style.height = "15px";
      boca.style.borderBottom = "5px solid #333";
      boca.style.borderRadius = "0 0 35px 35px";
      break;

    case 4: // FELIZ (Amarillo)
      textoEmocion.textContent = "¡Feliz! 😄";
      textoEmocion.style.color = "#FF9800";
      carita.style.backgroundColor = "#FFEB3B";
      // Cejas felices curvas
      cejaIzq.style.transform = "rotate(-10deg) translateY(-4px)";
      cejaDer.style.transform = "rotate(10deg) translateY(-4px)";
      // Sonrisa grande
      boca.style.width = "50px";
      boca.style.height = "25px";
      boca.style.borderBottom = "5px solid #333";
      boca.style.borderRadius = "0 0 50px 50px";
      break;

    case 5: // SUPER EMOCIONADO (Rosa o Naranja brillante)
      textoEmocion.textContent = "¡Súper Emocionado! 🤩";
      textoEmocion.style.color = "#E91E63";
      carita.style.backgroundColor = "#FF4081";
      // Cejas muy altas
      cejaIzq.style.transform = "translateY(-7px)";
      cejaDer.style.transform = "translateY(-7px)";
      // Boca abierta de felicidad (círculo/óvalo relleno)
      boca.style.width = "30px";
      boca.style.height = "30px";
      boca.style.backgroundColor = "#333";
      boca.style.borderRadius = "50%";
      break;
  }
});
