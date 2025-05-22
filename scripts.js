/* *************************************************************************** */
/* *************** Adding automatic background functionality ***************** */
/* *************************************************************************** */

document.addEventListener("DOMContentLoaded", () => {

    const images = [
        'images/bg-img1.avif',
        'images/bg-img2.avif'];

    let currentImage = 0;

    function updateBackgroundImage() {
        const backgroundElement = document.getElementById("background");

        const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

        const gradient = isDarkMode
            ? "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))"
            : "linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7))";

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

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        updateBackgroundImage();
    });
    console.log("Background is loaded!");
});

if (window.location.pathname === "formularz.html" && document.querySelector("#formularz") !== null) {

    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("formularz").addEventListener("submit", function (e) {
            e.preventDefault();

            const _name = document.getElementById("imię").value;
            const _surname = document.getElementById("nazwisko").value;
            const _age = document.getElementById("wiek").value;
            const _phone = document.getElementById("telefon").value;
            const _email = document.getElementById("email").value;
            const _sex = document.querySelector('input[name="płeć"]:checked')?.value;
            const _interests = [];
            document.querySelectorAll('input[name="zainteresowania"]:checked').forEach((checkbox) => {
                _interests.push(checkbox.value);
            });
            const _subject = document.getElementById("przedmiot").value;
            const _hour = document.getElementById("godzina").value;

            // Get current data from localStorage or initialize as an empty array
            let data = JSON.parse(localStorage.getItem("formData")) || [];

            // Add new data to the array
            data.push({ _name, _surname, _age, _phone, _email, _sex, _interests, _subject, _hour });

            // Save the updated data back to localStorage
            localStorage.setItem("formData", JSON.stringify(data));

            // Reset the form
            document.getElementById("formularz").reset();

            if (window.location.pathname.includes("uczestnicy.html")) {
                loadData();
            }

            const successPopup = document.getElementById("success-popup");
            successPopup.style.display = "block";
            setTimeout(() => {
                successPopup.style.display = "none";
            }, 5000);
        });
    });
}