document.addEventListener('DOMContentLoaded', () => {

    // Temporizador (código existente si lo hubiera)
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

        // Calcular el progreso de la cuenta atrás
        const startDate = new Date("April 1, 2025 00:00:00").getTime(); // Fecha de inicio aproximada
        const totalDuration = countDate - startDate;
        const elapsed = now - startDate;
        let progress = (elapsed / totalDuration) * 100;
        progress = Math.min(100, Math.max(0, progress));
        
        // Actualizar la barra de progreso
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }

    };

    setInterval(countdown, 1000);
    countdown(); // Llama una vez para que no haya retraso

    // Lógica para el scroll fade-in
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // El elemento se considera visible cuando el 10% está en pantalla
    });

    const messageBoxes = document.querySelectorAll('.message-box');
    messageBoxes.forEach(box => scrollObserver.observe(box));
});