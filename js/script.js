document.addEventListener('DOMContentLoaded', () => {

    const countdownDate = new Date('April 1, 2026 00:00:00').getTime();
    const startDate = new Date().getTime();
    const totalDuration = countdownDate - startDate;

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const boarEl = document.getElementById('boar');
    const progressBar = document.getElementById('progress-bar');
    const faceImage = document.getElementById('face-image');

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
            clearInterval(interval);
            document.getElementById('countdown').innerHTML = "<h2>¡Por fin te has ido!</h2>";
            boarEl.style.left = `calc(100% - 50px)`;
            faceImage.src = 'img/cara_triste.png';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.innerText = days;
        hoursEl.innerText = hours;
        minutesEl.innerText = minutes;
        secondsEl.innerText = seconds;

        const elapsedTime = now - startDate;
        const progressPercentage = (elapsedTime / totalDuration) * 100;
        
        boarEl.style.left = `calc(${progressPercentage}% - ${progressPercentage > 0 ? (50 * (progressPercentage/100)): 0}px)`;

        // Change face image based on progress
        if (progressPercentage > 50 && faceImage.src.includes('cara_feliz.png')) {
            faceImage.src = 'img/cara_triste.png';
        }
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();
});
