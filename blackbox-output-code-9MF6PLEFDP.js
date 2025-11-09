// Typing effect for header
const typingElement = document.getElementById('typing-effect');
const text = "Your Name - CS Portfolio";
let index = 0;

function typeWriter() {
    if (index < text.length) {
        typingElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    }
}
typeWriter();

// Dark mode toggle
const toggleBtn = document.getElementById('dark-mode-toggle');
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Scroll animations using Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in-on-scroll').forEach(el => observer.observe(el));

// Animate skill bars on scroll
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const level = bar.getAttribute('data-level');
            bar.style.setProperty('--width', `${level}%`);
            bar.classList.add('animate');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-bar').forEach(bar => {
    skillObserver.observe(bar);
    bar.style.setProperty('--width', '0%');
});

// Fetch GitHub repos with animation
async function fetchRepos() {
    const response = await fetch('https://api.github.com/users/yourusername/repos');
    const repos = await response.json();
    const grid = document.getElementById('project-grid');
    
    repos.forEach((repo, index) => {
        const card = document.createElement('div');
        card.className = 'project-card fade-in-on-scroll';
        card.style.animationDelay = `${index * 0.2}s`;
        card.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || 'No description'}. <a href="${repo.html_url}" target="_blank">View Repo</a></p>
        `;
        grid.appendChild(card);
        observer.observe(card);
    });
}

window.onload = fetchRepos;

// Smooth scrolling for nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});