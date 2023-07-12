// Smooth scrolling
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a');
  for (const link of links) {
    link.addEventListener('click', smoothScroll);
  }
});

function smoothScroll(e) {
  e.preventDefault();
  const targetId = this.getAttribute('href').slice(1);
  const targetElement = document.getElementById(targetId);
  window.scrollTo({
    top: targetElement.offsetTop,
    behavior: 'smooth'
  });
}

// Dark mode toggle
const toggleButton = document.getElementById('toggle-button');
toggleButton.addEventListener('click', toggleDarkMode);

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
