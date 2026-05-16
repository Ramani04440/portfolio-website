// Initialize interactive particle background system
particlesJS("particles-js", {
  "particles": {
    "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
    "color": { "value": "#00f2fe" },
    "opacity": { "value": 0.2 },
    "size": { "value": 2 },
    "line_linked": { "enable": true, "distance": 150, "color": "#00f2fe", "opacity": 0.1, "width": 1 },
    "move": { "enable": true, "speed": 1.5 }
  }
});

// Dynamic portfolio typewriter text engine
const text = ["Software Engineer.", "Java Developer.", "ML Enthusiast.", "Problem Solver."];
let count = 0; 
let index = 0; 
let currentText = ""; 
let letter = "";

(function type() {
    if (count === text.length) count = 0;
    currentText = text[count];
    letter = currentText.slice(0, ++index);
    
    const typeTarget = document.querySelector("#type-target");
    if(typeTarget) {
        typeTarget.textContent = letter;
    }
    
    if (letter.length === currentText.length) { 
        count++; 
        index = 0; 
        setTimeout(type, 2500); 
    } else { 
        setTimeout(type, 100); 
    }
}());

// ScrollReveal fluid structural deployment setup
ScrollReveal().reveal('.reveal', { 
    delay: 200, 
    distance: '30px', 
    origin: 'bottom', 
    duration: 800, 
    interval: 200 
});
