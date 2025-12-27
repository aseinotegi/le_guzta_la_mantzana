document.addEventListener('DOMContentLoaded', () => {

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

    const countdown = () => {
        const countDate = new Date("April 1, 2026 00:00:00").getTime();
        const now = new Date().getTime();
        const gap = countDate - now;

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

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
        const progressPercentage = document.getElementById('progress-percentage'); // Obtener el icono

        if (progressFill && progressIcon && progressPercentage) { // Asegurarse de que existe
            progressFill.style.width = `${progress}%`;
            progressIcon.style.left = `calc(${progress}% - 12px)`;
            progressPercentage.innerText = `${Math.round(progress)}%`; // Actualizar el texto del porcentaje
        }
    };

    setInterval(countdown, 1000);
    countdown();

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