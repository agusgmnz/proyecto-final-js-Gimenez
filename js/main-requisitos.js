document.addEventListener("DOMContentLoaded", function () {
    const ageInput = document.getElementById("age");
    const verifyBtn = document.getElementById("verifyBtn");
    const ageVerification = document.querySelector(".age-verification");
    const content = document.querySelector(".content");

    verifyBtn.addEventListener("click", function () {
        const age = parseInt(ageInput.value);

        // Verificar que la edad ingresada sea un número válido
        if (!isNaN(age) && age > 0) {
            // Verificar si la persona es mayor de 18 años utilizando fetch y promesas
            fetch("https://api.agify.io/?name=random")
                .then(response => response.json())
                .then(data => {
                    const estimatedAge = data.age;
                    if (estimatedAge >= 18) {
                        // Mostrar el contenido de la página si la persona es mayor de 18 años
                        ageVerification.classList.add("hidden");
                        content.classList.remove("hidden");
                        // Mostrar el mensaje con la edad utilizando DOM
                        showAgeMessage(age);
                        // Guardar la edad en el archivo JSON utilizando fetch y DOM
                        saveAgeToJson(age);
                    } else {
                        // Rechazar el acceso si la persona es menor de 18 años
                        alert("Lo siento, debes ser mayor de 18 años para acceder a esta página.");
                    }
                })
                .catch(error => {
                    console.error("Error al obtener la edad:", error);
                });
        } else {
            alert("Por favor, ingresa una edad válida.");
        }
    });

    // Función para mostrar el mensaje con la edad utilizando DOM
    function showAgeMessage(age) {
        const ageMessage = document.createElement("p");
        ageMessage.textContent = `Tu edad es de: ${age} años.`;
        content.appendChild(ageMessage);
    }

    // Función para guardar la edad en el archivo JSON utilizando fetch y DOM
    function saveAgeToJson(age) {
        fetch('ages.json')
            .then(response => response.json())
            .then(data => {
                data.ages.push(age);
                return data;
            })
            .then(updatedData => {
                const jsonData = JSON.stringify(updatedData);
                const blob = new Blob([jsonData], { type: 'application/json' });
                console.log("Edad guardada exitosamente en el archivo JSON.");
            })
            .catch(error => {
                console.error("Error al guardar la edad en el archivo JSON:", error);
            });
    }
});

