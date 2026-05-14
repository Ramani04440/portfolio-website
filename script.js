
// Particles Configuration
particlesJS("particles-js", {
  "particles": {
    "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
    "color": { "value": "#00f2fe" },
    "shape": { "type": "circle" },
    "opacity": { "value": 0.2, "random": false },
    "size": { "value": 2, "random": true },
    "line_linked": { "enable": true, "distance": 150, "color": "#00f2fe", "opacity": 0.1, "width": 1 },
    "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }
  },
  "retina_detect": true
});

// Typing Effect
const text = ["Software Engineer.", "Java Developer.", "ML Enthusiast.", "Problem Solver."];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
    if (count === text.length) count = 0;
    currentText = text[count];
    letter = currentText.slice(0, ++index);
    document.querySelector("#type-target").textContent = letter;
    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 2000);
    } else {
        setTimeout(type, 100);
    }
}());

// Scroll Reveal
ScrollReveal().reveal('.reveal', {
    delay: 200,
    distance: '50px',
    origin: 'bottom',
    duration: 1000,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    interval: 200
});
