/* *************************************************************************** */
/* *************** Adding automatic background functionality ***************** */
/* *************************************************************************** */

document.addEventListener("DOMContentLoaded", () => {

    const images = [
        'images/bg-img1.avif',
        'images/bg-img2.avif'];

    let currentImage = 0;

    function updateBackgroundImage() {
        const backgroundElement = document.getElementById('background');

        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const gradient = isDarkMode
            ? 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))'
            : 'linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7))';

        backgroundElement.style.backgroundImage = `${gradient}, url('${images[currentImage]}')`;

        backgroundElement.style.opacity = 1;
    }

    function changeBackgroundImage() {
        const backgroundElement = document.getElementById('background');

        backgroundElement.style.opacity = 0;

        setTimeout(() => {
            currentImage = (currentImage + 1) % images.length;
            updateBackgroundImage();

            backgroundElement.style.opacity = 1;
        }, 1000);
    }

    window.onload = () => {
        updateBackgroundImage();

        setInterval(changeBackgroundImage, 10000);
    };

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        updateBackgroundImage();
    });
});



console.log("JavaScript is loaded!");