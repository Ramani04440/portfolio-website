/*  Ramani S — Portfolio Script v4.0  */

document.addEventListener('DOMContentLoaded', () => {

    /* ─────────────────────────────────────────
       CANVAS PARTICLE BACKGROUND
    ───────────────────────────────────────── */
    const canvas = document.getElementById('bg-canvas');
    const ctx    = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', () => { resize(); initParticles(); });

    function Particle() {
        this.reset = function() {
            this.x    = Math.random() * W;
            this.y    = Math.random() * H;
            this.r    = Math.random() * 1.4 + 0.3;
            this.vx   = (Math.random() - 0.5) * 0.18;
            this.vy   = (Math.random() - 0.5) * 0.18;
            this.life = Math.random();
            this.maxLife = Math.random() * 0.3 + 0.15;
            const c = [[0,212,255],[139,92,246],[244,114,182]][Math.floor(Math.random()*3)];
            this.color = `rgba(${c[0]},${c[1]},${c[2]},`;
        };
        this.reset();
    }

    function initParticles() {
        particles = [];
        const count = Math.floor((W * H) / 14000);
        for (let i = 0; i < count; i++) {
            const p = new Particle();
            particles.push(p);
        }
    }
    initParticles();

    function drawParticles() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            p.life += 0.003;
            if (p.life > p.maxLife || p.x < 0 || p.x > W || p.y < 0 || p.y > H) p.reset();
            const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.55;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color + alpha + ')';
            ctx.fill();
        });
        // Draw connection lines
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0,212,255,${(1 - dist/100) * 0.05})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(drawParticles);
    }
    drawParticles();


    /* ─────────────────────────────────────────
       CUSTOM CURSOR
    ───────────────────────────────────────── */
    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    let rx = 0, ry = 0, dx = 0, dy = 0;

    document.addEventListener('mousemove', e => {
        dx = e.clientX; dy = e.clientY;
        if (dot) { dot.style.left = dx + 'px'; dot.style.top = dy + 'px'; }
    });
    (function animRing() {
        rx += (dx - rx) * 0.13; ry += (dy - ry) * 0.13;
        if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
        requestAnimationFrame(animRing);
    })();

    const hT = 'a,button,.cp-card,.p-card,.ach-card,.lead-card,.cert-clickable,.cs-toggle,.ai-sug,.chip';
    document.addEventListener('mouseover', e => { if (e.target.matches(hT)||e.target.closest(hT)) document.body.classList.add('ch'); });
    document.addEventListener('mouseout',  e => { if (e.target.matches(hT)||e.target.closest(hT)) document.body.classList.remove('ch'); });


    /* ─────────────────────────────────────────
       SCROLL PROGRESS BAR
    ───────────────────────────────────────── */
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (progressBar) progressBar.style.width = (scrolled / max * 100) + '%';
    }, { passive: true });


    /* ─────────────────────────────────────────
       NAVBAR SCROLL & ACTIVE LINK
    ───────────────────────────────────────── */
    const navbar  = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        // Scrolled class
        navbar.classList.toggle('scrolled', window.scrollY > 30);

        // Active nav link
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 120) current = s.id;
        });
        navLinks.forEach(l => {
            l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
        });

        // Back to top
        if (backTop) backTop.classList.toggle('hidden', window.scrollY < 500);
    }, { passive: true });


    /* ─────────────────────────────────────────
       MOBILE HAMBURGER
    ───────────────────────────────────────── */
    const hamburger    = document.getElementById('hamburger');
    const mobileDrawer = document.getElementById('mobile-drawer');

    hamburger.addEventListener('click', () => {
        const isOpen = !mobileDrawer.classList.contains('hidden');
        mobileDrawer.classList.toggle('hidden');
        hamburger.classList.toggle('open');
    });

    document.querySelectorAll('.drawer-link').forEach(l => {
        l.addEventListener('click', () => {
            mobileDrawer.classList.add('hidden');
            hamburger.classList.remove('open');
        });
    });


    /* ─────────────────────────────────────────
       SMOOTH SCROLL FOR NAV LINKS
    ───────────────────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    /* ─────────────────────────────────────────
       HERO TYPING ANIMATION
    ───────────────────────────────────────── */
    const typingEl = document.getElementById('hero-typing');
    const words    = ['Software Engineer', 'Full Stack Developer', 'AI & ML Enthusiast', 'Java Backend Developer', 'IEEE Chairperson'];
    let wIdx = 0, cIdx = 0, deleting = false;

    function type() {
        const word   = words[wIdx];
        const speed  = deleting ? 42 : (cIdx === word.length ? 1400 : 75);

        if (!deleting && cIdx === word.length) {
            deleting = true;
            setTimeout(type, speed); return;
        }
        if (deleting && cIdx === 0) {
            deleting = false;
            wIdx = (wIdx + 1) % words.length;
            setTimeout(type, 250); return;
        }

        cIdx += deleting ? -1 : 1;
        if (typingEl) typingEl.textContent = word.substring(0, cIdx);
        setTimeout(type, deleting ? 40 : 75);
    }
    type();


    /* ─────────────────────────────────────────
       SCROLL REVEAL (DATA-AOS)
    ───────────────────────────────────────── */
    const aosEls = document.querySelectorAll('[data-aos]');
    const aosObs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('aos-in'); aosObs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    aosEls.forEach(el => aosObs.observe(el));


    /* ─────────────────────────────────────────
       ANIMATED COUNTERS
    ───────────────────────────────────────── */
    const counterEls = document.querySelectorAll('.counter');
    const counterObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el     = e.target;
            const target = parseFloat(el.dataset.target);
            const suffix = el.dataset.suffix || '';
            const isFloat = el.dataset.float === 'true';
            const duration = 1800;
            const start  = performance.now();

            function update(t) {
                const p = Math.min((t - start) / duration, 1);
                const v = target * (1 - Math.pow(1-p, 3));
                el.textContent = isFloat ? (v/100).toFixed(2) : Math.floor(v) + suffix;
                if (p < 1) requestAnimationFrame(update);
                else el.textContent = isFloat ? (target/100).toFixed(2) : target + suffix;
            }
            requestAnimationFrame(update);
            counterObs.unobserve(el);
        });
    }, { threshold: 0.5 });
    counterEls.forEach(el => counterObs.observe(el));


    /* ─────────────────────────────────────────
       DARK / LIGHT MODE
    ───────────────────────────────────────── */
    const themeBtn  = document.getElementById('theme-btn');
    const themeIcon = document.getElementById('theme-icon');
    let isLight = false;

    themeBtn.addEventListener('click', () => {
        isLight = !isLight;
        document.body.classList.toggle('light', isLight);
        themeIcon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    });


    /* ─────────────────────────────────────────
       BACK TO TOP
    ───────────────────────────────────────── */
    const backTop = document.getElementById('back-top');
    if (backTop) {
        backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }


    /* ─────────────────────────────────────────
       CASE STUDY TOGGLE
    ───────────────────────────────────────── */
    document.querySelectorAll('.cs-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const panel = document.getElementById(btn.dataset.target);
            if (!panel) return;
            const open = panel.classList.toggle('hidden');
            btn.innerHTML = open
                ? '<i class="fa-solid fa-book-open"></i> Case Study'
                : '<i class="fa-solid fa-chevron-up"></i> Hide';
        });
    });


    /* cert modal removed — certs are now static display only */


    /* ─────────────────────────────────────────
       CONTACT FORM
    ───────────────────────────────────────── */
    const contactForm = document.getElementById('contact-form');
    const cfFeedback  = document.getElementById('cf-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            const name    = document.getElementById('cf-name').value.trim();
            const email   = document.getElementById('cf-email').value.trim();
            const message = document.getElementById('cf-message').value.trim();

            if (!name || !email || !message) {
                if (cfFeedback) { cfFeedback.style.color='#ff5f57'; cfFeedback.textContent='⚠ Please fill in all required fields.'; }
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                if (cfFeedback) { cfFeedback.style.color='#ff5f57'; cfFeedback.textContent='⚠ Invalid email address.'; }
                return;
            }

            const btn = document.getElementById('cf-submit');
            if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...'; }

            setTimeout(() => {
                if (cfFeedback) { cfFeedback.style.color='var(--green)'; cfFeedback.textContent='✓ Message sent! Ramani will reply soon.'; }
                contactForm.reset();
                if (btn) { btn.disabled=false; btn.innerHTML='<i class="fa-solid fa-paper-plane"></i> Send Message'; }
                setTimeout(() => { if (cfFeedback) cfFeedback.textContent=''; }, 5000);
            }, 1600);
        });
    }


    /* ─────────────────────────────────────────
       AI ASSISTANT
    ───────────────────────────────────────── */
    const aiFab   = document.getElementById('ai-fab');
    const aiPanel = document.getElementById('ai-panel');
    const aiClose = document.getElementById('ai-panel-close');
    const aiChat  = document.getElementById('ai-chat');
    const aiInput = document.getElementById('ai-input');
    const aiSend  = document.getElementById('ai-send');

    aiFab.addEventListener('click', () => {
        aiPanel.classList.toggle('hidden');
        if (!aiPanel.classList.contains('hidden') && aiInput) aiInput.focus();
    });
    if (aiClose) aiClose.addEventListener('click', () => aiPanel.classList.add('hidden'));

    // Knowledge base
    const kb = {
        skills:      { t: ['skill','know','language','tech','python','java','react','tensorflow','django','cloud','aws','ml','ai','frontend','backend','stack'],
                       r: `<strong>💻 Technical Skills:</strong><br>• <strong>Languages:</strong> Java, Python, JavaScript, SQL<br>• <strong>Frontend:</strong> React.js, HTML5, CSS3, Figma<br>• <strong>Backend:</strong> Node.js, Django, Spring Boot, REST APIs<br>• <strong>Cloud:</strong> AWS (Certified), Google Cloud<br>• <strong>AI/ML:</strong> TensorFlow, OpenCV, Scikit-learn, GenAI<br>• <strong>DB:</strong> MySQL, NoSQL<br>• <strong>Tools:</strong> Git, GitHub, RPA/UiPath` },
        projects:    { t: ['project','build','built','develop','skin','cancer','farm','wearable','exam','quiz','neurostrata'],
                       r: `<strong>🚀 Projects:</strong><br><strong>1. Skin Cancer Detection</strong> — CNN + TensorFlow + FastAPI<br><strong>2. Smart Farm Portal</strong> — Django + MySQL realtime monitoring<br><strong>3. Menstrual Pain Wearable</strong> — IoT heat therapy device<br><strong>4. Online Examination System</strong> — Java + REST APIs, ↓70% manual work` },
        experience:  { t: ['intern','experience','work','company','oneyes','vulture','job'],
                       r: `<strong>💼 Internships:</strong><br><strong>OneYes Infotech</strong> (Jun–Jul 2025) — Full Stack Dev, Online Exam System, ↓70% assessment effort<br><strong>Vulture Mgmt Wings</strong> (Dec 2025) — Spring Boot, Driving School System, ↓60% admin overhead` },
        leadership:  { t: ['ieee','leadership','chair','chairperson','yuci','ecell','iit','bombay','volunteer','club'],
                       r: `<strong>👑 Leadership:</strong><br><strong>IEEE Chairperson</strong> — Reliability Society, SEC since Jan 2026. IEEE Best Student Volunteer Award 2025.<br><strong>YUCI Campus Coordinator</strong> — Youth Community Innovation Cell<br><strong>UiAutomistix Tech Coordinator</strong> — RPA workshops` },
        achievements:{ t: ['achievement','award','prize','win','nptel','star','dsa','motivated','learner'],
                       r: `<strong>🏆 Achievements:</strong><br>🥇 1st Prize — Meme Tastic<br>🥇 1st Prize — Vecna's Vision<br>🥇 1st Prize — Design Levitation<br>🏆 DSA Challenge Round 1 Winner<br>⭐ IEEE Best Student Volunteer Award 2025<br>📚 NPTEL Discipline Star & Motivated Learner` },
        certifications:{t:['cert','aws','oracle','cisco','gcp','google','cloud','nosql','nptel'],
                       r: `<strong>📜 Certifications (15 total):</strong><br>☁ AWS Cloud Practitioner Essentials<br>🤖 Oracle OCI AI Foundations 2025<br>🌐 Networking Basics — Cisco<br>🐍 Python for Data Science — NPTEL<br>🐍 Python DSA — Udemy<br>🐍 Python in Excel — LinkedIn<br>👥 Project Management for Leaders — LinkedIn<br>💻 Computer Architecture, Algorithms, OS, Compiler Design, Software Testing, IoT, Cloud Computing, Intellectual Property — NPTEL` },
        contact:     { t: ['contact','email','reach','hire','linkedin','github','social','connect'],
                       r: `<strong>📬 Contact:</strong><br>📧 ramani04122005@gmail.com<br>💼 linkedin.com/in/ramani-s-149579282<br>🐙 github.com/Ramani04440<br><br>Open to <strong>internships, full-time roles & collaborations</strong>!` },
        education:   { t: ['education','study','college','gpa','grade','degree','academic','sairam'],
                       r: `<strong>🎓 Education:</strong><br>B.E. Computer Science Engineering<br>Sairam Engineering College · Final Year<br>CGPA: <strong>8.43</strong>` },

        hire:        { t: ['hire','why','recommend','join','opportunity','suitable'],
                       r: `<strong>✅ Why Hire Ramani?</strong><br>→ Full Stack expertise (Java, Python, Django, React)<br>→ AI/ML pipelines + Cloud certified (AWS, Oracle)<br>→ IEEE Chairperson & YUCI Campus Coordinator<br>→ Proven: ↓70% & ↓60% impact at internships<br>→ CGPA 8.43 · NPTEL Motivated Learner (6 Certs)<br>→ Multiple 1st prize competition wins` },
    };

    function getReply(query) {
        const lower = query.toLowerCase();
        for (const key of Object.keys(kb)) {
            if (kb[key].t.some(t => lower.includes(t))) return kb[key].r;
        }
        if (/hello|hi|hey|sup/i.test(lower)) return `👋 <strong>Hi!</strong> I'm Ramani's AI assistant. Ask me about his <em>projects, skills, IEEE role, certifications, achievements</em>, or how to reach him!`;
        if (/who|name|about/i.test(lower)) return `I assist for <strong>Ramani S</strong> — CSE student, Full Stack Dev, IEEE Chairperson, AI/ML engineer. CGPA 8.43. Ask me anything!`;
        return `I can help with: <em>projects · skills · internships · IEEE · certifications · achievements · contact</em>. What would you like to know?`;
    }

    function appendMsg(html, isUser = false) {
        if (!aiChat) return;
        const div = document.createElement('div');
        div.className = 'ai-msg ' + (isUser ? 'ai-user-msg' : 'ai-bot');
        div.innerHTML = isUser
            ? `<div class="ai-bubble">${html.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div>`
            : `<div class="ai-av"><i class="fa-solid fa-robot"></i></div><div class="ai-bubble">${html}</div>`;
        aiChat.appendChild(div);
        aiChat.scrollTop = aiChat.scrollHeight;
    }

    function handleQuery(q) {
        if (!q.trim()) return;
        appendMsg(q, true);
        if (aiInput) aiInput.value = '';

        // Typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'ai-msg ai-bot';
        typingDiv.id = 'ai-typing-ind';
        typingDiv.innerHTML = `<div class="ai-av"><i class="fa-solid fa-robot"></i></div><div class="ai-typing-ind"><span></span><span></span><span></span></div>`;
        aiChat.appendChild(typingDiv);
        aiChat.scrollTop = aiChat.scrollHeight;

        setTimeout(() => {
            const t = document.getElementById('ai-typing-ind');
            if (t) t.remove();
            appendMsg(getReply(q));
        }, 750 + Math.random() * 400);
    }

    if (aiSend)  aiSend.addEventListener('click', () => { if (aiInput) handleQuery(aiInput.value); });
    if (aiInput) aiInput.addEventListener('keydown', e => { if (e.key==='Enter') handleQuery(aiInput.value); });

    document.querySelectorAll('.ai-sug').forEach(btn => {
        btn.addEventListener('click', () => handleQuery(btn.dataset.q));
    });


    /* ─────────────────────────────────────────
       MAGNETIC BUTTON EFFECT
    ───────────────────────────────────────── */
    document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const r   = btn.getBoundingClientRect();
            const mx  = e.clientX - r.left - r.width / 2;
            const my  = e.clientY - r.top  - r.height / 2;
            btn.style.transform = `translate(${mx * 0.18}px, ${my * 0.18}px) translateY(-2px)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });


    /* ─────────────────────────────────────────
       ESC KEY
    ───────────────────────────────────────── */
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            if (aiPanel && !aiPanel.classList.contains('hidden'))     aiPanel.classList.add('hidden');
            if (mobileDrawer && !mobileDrawer.classList.contains('hidden')) {
                mobileDrawer.classList.add('hidden');
                hamburger.classList.remove('open');
            }
        }
    });

}); // end DOMContentLoaded
