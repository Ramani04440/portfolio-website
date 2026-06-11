// Three.js 3D Scene Setup
let scene, camera, renderer, particles;

function initThreeJS() {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);

    // Camera setup
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 100;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas3d'), antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create particles
    createParticles();

    // Animation loop
    animate();

    // Handle resize
    window.addEventListener('resize', onWindowResize);
}

function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 400;
        posArray[i + 1] = (Math.random() - 0.5) * 400;
        posArray[i + 2] = (Math.random() - 0.5) * 300;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const material = new THREE.PointsMaterial({
        size: 2,
        color: 0x00d4ff,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.6
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate particles
    if (particles) {
        particles.rotation.x += 0.0001;
        particles.rotation.y += 0.0002;
    }

    renderer.render(scene, camera);
}

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

// AI Assistant Logic
const aiResponses = {
    hello: "Hi there! I'm Ramani's AI assistant. How can I help you today?",
    hi: "Hello! Welcome to my portfolio. What would you like to know?",
    projects: "I've worked on several interesting projects including NeuroStrata (AI/ML), NavTrack (Driving School Management), Online Exam System, and this 3D Portfolio! Check the projects section for more details.",
    skills: "I'm skilled in Java, Python, JavaScript, SQL, HTML5, CSS3, React, Spring Boot, MySQL, Machine Learning, and more. See the skills section for a detailed breakdown.",
    experience: "I have 2 internships as a Fullstack Developer at OneYes Infotech and Vulture Management. Check the experience section for full details.",
    contact: "You can reach me at ramani04122005@gmail.com or connect via LinkedIn and GitHub. Use the contact form below!",
    about: "I'm a CS Engineering student passionate about software development, AI/ML, and creating beautiful interfaces. I love solving complex problems with code.",
    ai: "I'm an AI assistant built with Web Speech API and JavaScript. I can respond to voice commands and provide text-to-speech output!",
    speech: "I support voice input! Click the microphone button to speak, and I'll respond verbally using text-to-speech synthesis.",
    help: "You can ask me about projects, skills, experience, contact info, or just say hello! Try voice commands too.",
    default: "That's interesting! Feel free to ask me about projects, skills, experience, or anything else in my portfolio."
};

const aiPanel = document.getElementById('aiPanel');
const aiChat = document.getElementById('aiChat');
const aiInput = document.getElementById('aiInput');
const aiSend = document.getElementById('aiSend');
const aiVoice = document.getElementById('aiVoice');
const aiToggle = document.getElementById('aiToggle');
const closeAI = document.getElementById('closeAI');

let isListening = false;
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

// AI Panel Toggle
aiToggle.addEventListener('click', () => {
    aiPanel.classList.toggle('hidden');
});

closeAI.addEventListener('click', () => {
    aiPanel.classList.add('hidden');
});

// Send message
aiSend.addEventListener('click', sendMessage);
aiInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const message = aiInput.value.trim();
    if (!message) return;

    // Display user message
    addMessage(message, 'user');
    aiInput.value = '';

    // Get AI response
    const response = getAIResponse(message);
    setTimeout(() => {
        addMessage(response, 'bot');
        // Auto speak response
        speakResponse(response);
    }, 300);
}

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `ai-message ${ sender }`;
    msgDiv.textContent = text;
    aiChat.appendChild(msgDiv);
    aiChat.scrollTop = aiChat.scrollHeight;
}

function getAIResponse(input) {
    const lower = input.toLowerCase();
    for (const [key, response] of Object.entries(aiResponses)) {
        if (lower.includes(key)) return response;
    }
    return aiResponses.default;
}

// Voice input
aiVoice.addEventListener('click', () => {
    if (isListening) {
        recognition.stop();
        isListening = false;
        aiVoice.style.opacity = '1';
    } else {
        recognition.start();
        isListening = true;
        aiVoice.style.opacity = '0.5';
    }
});

recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
    }
    aiInput.value = transcript;
};

recognition.onend = () => {
    isListening = false;
    aiVoice.style.opacity = '1';
};

// Voice output
const synth = window.speechSynthesis;

function speakResponse(text) {
    if (!synth) return;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    synth.speak(utterance);
}

// Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const target = e.target.getAttribute('href');
        if (target.startsWith('#')) {
            const section = document.querySelector(target);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Contact Form
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        alert(`Thank you, ${ name }! Your message has been received. I'll get back to you soon!`);
        e.target.reset();
    }
});

// Initialize on load
window.addEventListener('load', () => {
    initThreeJS();
    addMessage("Hi! I'm Ramani's AI Assistant. Ask me anything about my portfolio!", 'bot');
});
