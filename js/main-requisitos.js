document.addEventListener("DOMContentLoaded", function () {
    const ageInput = document.getElementById("age");
    const verifyBtn = document.getElementById("verifyBtn");
    const ageVerification = document.querySelector(".age-verification");
    const content = document.querySelector(".content");

    verifyBtn.addEventListener("click", function () {
        const age = parseInt(ageInput.value);

        verifyAge(age)
            .then(result => {
                if (result) {
                    ageVerification.style.display = "none"; // Ocultar el formulario de verificación
                    content.style.display = "block"; // Mostrar el contenido de la página
                } else {
                    alert("Lo siento, debes ser mayor de 18 años para acceder.");
                }
            })
            .catch(error => {
                console.error("Error al verificar la edad:", error);
            });
    });

    function verifyAge(age) {
        return new Promise((resolve, reject) => {
            // Simulacion una verificación de edad
            setTimeout(() => {
                if (age >= 18) {
                    resolve(true); 
                } else {
                    resolve(false); 
                }
            }, 1000); // Simulamos una espera de 1 segundo
        });
    }
});
