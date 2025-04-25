const button = document.getElementById("happyButton");

button.addEventListener("click", () => {
  for (let i = 0; i < 30; i++) {
    createBunny();
  }
});

function createBunny() {
  const bunny = document.createElement("img");
  bunny.className = "bunny";

  // Array con los nombres de tus imágenes
  const bunnyImages = [
    "img/bunny1.png",
    "img/bunny2.png",
    "img/bunny3.png"
  ];

  // Elegir una al azar
  const randomIndex = Math.floor(Math.random() * bunnyImages.length);
  bunny.src = bunnyImages[randomIndex];

  document.body.appendChild(bunny);

  // Posición inicial aleatoria
  let x = Math.random() * window.innerWidth;
  let y = Math.random() * window.innerHeight;

  // 👉 Aquí ajustamos la velocidad según el tamaño de la pantalla
  const isMobile = window.innerWidth < 600;
  const speedFactor = isMobile ? 3 : 8;

  // Velocidad aleatoria
  let dx = (Math.random() - 0.5) * speedFactor;
  let dy = (Math.random() - 0.5) * speedFactor;

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

    // Elimina el elemento del DOM después del fade
    setTimeout(() => {
      bunny.remove();
    }, 1000); // Espera que termine la animación (1s)
  }, 6000);

}