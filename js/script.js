document.addEventListener('DOMContentLoaded', () => {

    // ========== CONFIGURACIÓN ==========
    const TEST_MODE_FIREWORKS = false; // Cambiar a true para probar los fuegos artificiales

    const phrases = [
        "Abril",
        "Próximamente",
        "Se viene",
        "Desocupando",
        "Jejeje"
    ];

    const loadingText = document.getElementById('loading-text');

    const changeLoadingText = () => {
        const randomIndex = Math.floor(Math.random() * phrases.length);
        if (loadingText) {
            loadingText.innerText = phrases[randomIndex];
        }
    };

    // Cambia el texto cada 2 segundos
    setInterval(changeLoadingText, 1500);
    // Llama a la función una vez al inicio para que no se quede el texto estático
    changeLoadingText();

    // ========== SISTEMA DE FUEGOS ARTIFICIALES ==========
    const colors = ['color-gold', 'color-red', 'color-blue', 'color-green',
        'color-purple', 'color-white', 'color-orange', 'color-pink'];

    let fireworksActive = false;
    let fireworksInterval = null;

    function createExplosion(x, y) {
        const container = document.getElementById('fireworks-container');
        const explosion = document.createElement('div');
        explosion.className = 'explosion';
        explosion.style.left = x + 'px';
        explosion.style.top = y + 'px';

        // Crear 16 partículas por explosión
        for (let i = 0; i < 16; i++) {
            const particle = document.createElement('div');
            const colorClass = colors[Math.floor(Math.random() * colors.length)];
            particle.className = `particle ${colorClass}`;
            explosion.appendChild(particle);
        }

        container.appendChild(explosion);

        // Eliminar la explosión después de la animación
        setTimeout(() => {
            explosion.remove();
        }, 1500);
    }

    function launchFirework() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Posición aleatoria en la pantalla
        const x = Math.random() * (screenWidth - 100) + 50;
        const y = Math.random() * (screenHeight * 0.6) + 50;

        createExplosion(x, y);
    }

    function startFireworks() {
        if (fireworksActive) return;
        fireworksActive = true;

        // Crear mensaje de celebración
        const celebrationDiv = document.createElement('div');
        celebrationDiv.className = 'celebration-message';
        celebrationDiv.id = 'celebration-message';
        celebrationDiv.innerHTML = `
            <h1>🎉 ¡LLEGÓ EL DÍA! 🎉</h1>
            <p>¡Adiós Manuel! 👋</p>
        `;
        document.body.appendChild(celebrationDiv);

        // Lanzar muchos fuegos artificiales
        // Ráfaga inicial
        for (let i = 0; i < 5; i++) {
            setTimeout(() => launchFirework(), i * 200);
        }

        // Continuar lanzando fuegos artificiales cada poco tiempo
        fireworksInterval = setInterval(() => {
            const burstCount = Math.floor(Math.random() * 3) + 2; // 2-4 explosiones
            for (let i = 0; i < burstCount; i++) {
                setTimeout(() => launchFirework(), i * 150);
            }
        }, 800);
    }

    function stopFireworks() {
        fireworksActive = false;
        if (fireworksInterval) {
            clearInterval(fireworksInterval);
            fireworksInterval = null;
        }
        const celebration = document.getElementById('celebration-message');
        if (celebration) celebration.remove();
    }

    // ========== COUNTDOWN ==========
    const countdown = () => {
        const countDate = new Date("April 1, 2026 00:00:00").getTime();
        const now = new Date().getTime();
        const gap = countDate - now;

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        // Si el contador ha llegado a 0
        if (gap <= 0) {
            document.getElementById('days').innerText = 0;
            document.getElementById('hours').innerText = 0;
            document.getElementById('minutes').innerText = 0;
            document.getElementById('seconds').innerText = 0;

            const progressFill = document.getElementById('progress-fill');
            const progressIcon = document.getElementById('progress-icon');
            const progressPercentage = document.getElementById('progress-percentage');

            if (progressFill && progressIcon && progressPercentage) {
                progressFill.style.width = '100%';
                progressIcon.style.left = 'calc(100% - 12px)';
                progressPercentage.innerText = '100%';
            }

            // Activar fuegos artificiales cuando el contador llega a 0
            if (!TEST_MODE_FIREWORKS) {
                startFireworks();
            }
            return;
        }

        const textDay = Math.floor(gap / day);
        const textHour = Math.floor((gap % day) / hour);
        const textMinute = Math.floor((gap % hour) / minute);
        const textSecond = Math.floor((gap % minute) / second);

        document.getElementById('days').innerText = textDay;
        document.getElementById('hours').innerText = textHour;
        document.getElementById('minutes').innerText = textMinute;
        document.getElementById('seconds').innerText = textSecond;

        const startDate = new Date("April 1, 2025 00:00:00").getTime();
        const totalDuration = countDate - startDate;
        const elapsed = now - startDate;
        let progress = (elapsed / totalDuration) * 100;
        progress = Math.min(100, Math.max(0, progress));

        const progressFill = document.getElementById('progress-fill');
        const progressIcon = document.getElementById('progress-icon');
        const progressPercentage = document.getElementById('progress-percentage');

        if (progressFill && progressIcon && progressPercentage) {
            progressFill.style.width = `${progress}%`;
            progressIcon.style.left = `calc(${progress}% - 12px)`;
            progressPercentage.innerText = `${Math.round(progress)}%`;
        }
    };

    setInterval(countdown, 1000);
    countdown();

    // ========== MODO PRUEBA FUEGOS ARTIFICIALES ==========
    if (TEST_MODE_FIREWORKS) {
        console.log('🎆 Modo prueba de fuegos artificiales ACTIVADO');
        startFireworks();
    }

    // ========== SCROLL OBSERVER ==========
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const messageBoxes = document.querySelectorAll('.message-box');
    messageBoxes.forEach(box => scrollObserver.observe(box));
});