const container = document.querySelector('.carousel-list');
const slides = Array.from(container.children); //Convierte los hijos del carousel, los li, en array
const nextButton = document.querySelector('.carousel-btn.next');
const prevButton = document.querySelector('.carousel-btn.prev');
let currentIndex = 0; //Índice que indica cuál slide está siendo mostrado actualmente

function updateSlidePosition() {
  const slideWidth = slides[0].getBoundingClientRect().width; // devuelve el ancho visible real del slide en el navegador
  container.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
}

nextButton.addEventListener('click', () => {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    updateSlidePosition();
  }
});

prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlidePosition();
  }
});

// Ajustar posición si se redimensiona la ventana
window.addEventListener('resize', updateSlidePosition);

setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlidePosition();
}, 5000); // cada 5 segundos