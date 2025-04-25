const button = document.getElementById("happyButton");

// Límite de conejitos en pantalla
let bunnyCount = 0;
const maxBunnies = 60;  // Máximo número de conejitos en pantalla

// Limitar la frecuencia con la que se pueden crear conejitos
let lastClickTime = 0;
const clickCooldown = 500;  // 500ms de espera entre clics

button.addEventListener("click", () => {
  const currentTime = Date.now();

  // Evitar múltiples clics muy rápido
  if (currentTime - lastClickTime < clickCooldown) return;

  lastClickTime = currentTime;

  // Crear conejitos solo si no hemos alcanzado el límite
  if (bunnyCount < maxBunnies) {
    createBunniesWithInterval();
  }
});

// Función para crear conejitos con intervalos
function createBunniesWithInterval() {
  let createdBunnies = 0;
  const interval = setInterval(() => {
    if (createdBunnies < 30 && bunnyCount < maxBunnies) {
      createBunny();
      createdBunnies++;
    } else {
      clearInterval(interval); // Detener el intervalo una vez que los 30 conejitos han sido creados o se ha alcanzado el máximo
    }
  }, 80); // Intervalo de 200ms entre cada conejito
}

function createBunny() {
  // Asegurarse de que no se exceda el límite de conejitos en pantalla
  if (bunnyCount >= maxBunnies) return;

  const bunny = document.createElement("img");
  bunny.className = "bunny";

  // Array con los nombres de tus imágenes
  const bunnyImages = [
    "img/bunny1.png",
    "img/bunny2.png",
    "img/bunny3.png",
    "img/bunny4.png",
    "img/bunny5.png",
    "img/bunny6.png",
    "img/bunny7.png",
    "img/bunny8.png"
  ];

  // Elegir una imagen al azar
  const randomIndex = Math.floor(Math.random() * bunnyImages.length);
  bunny.src = bunnyImages[randomIndex];

  document.body.appendChild(bunny);

  // Posición inicial aleatoria
  let x = Math.random() * window.innerWidth;
  let y = Math.random() * window.innerHeight;

  // Ajuste de la velocidad según el tamaño de la pantalla
  const isMobile = window.innerWidth < 600;
  const speedFactor = isMobile ? 3 : 8;

  // Velocidades aleatorias
  let dx = (Math.random() - 0.5) * speedFactor;
  let dy = (Math.random() - 0.5) * speedFactor;

  // Incrementar el contador de conejitos
  bunnyCount++;

  // Animación
  function animate() {
    x += dx;
    y += dy;

    // Rebotar en los bordes
    if (x <= 0 || x >= window.innerWidth - 50) dx *= -1;
    if (y <= 0 || y >= window.innerHeight - 50) dy *= -1;

    bunny.style.left = x + "px";
    bunny.style.top = y + "px";

    requestAnimationFrame(animate);
  }

  animate();

  // Desaparece después de 6 segundos
  setTimeout(() => {
    bunny.style.transition = "opacity 1s ease-out";
    bunny.style.opacity = "0";

    // Eliminar el conejito después de que termine la animación de opacidad
    setTimeout(() => {
      bunny.remove();
      bunnyCount--;  // Reducir el contador de conejitos al eliminarlo
    }, 1000); // Esperar que termine la animación (1s)
  }, 4000);
}
