// codigo del formulario
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const messageList = document.getElementById("messageList");
  const clearMessagesBtn = document.getElementById("clearMessages");

  // Evento para guardar el formulario en el localStorage
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Crear un objeto con los datos del formulario
    const formData = {
      name: name,
      email: email,
      message: message,
    };

    // Obtener mensajes previos del localStorage (si existen)
    let savedMessages = JSON.parse(localStorage.getItem("messages")) || [];

    // Agregar el nuevo mensaje al array de mensajes
    savedMessages.push(formData);

    // Guardar el array de mensajes actualizado en el localStorage
    localStorage.setItem("messages", JSON.stringify(savedMessages));

    // Actualizar la lista de mensajes mostrada en la página
    displayMessages();
  });

  // Evento para borrar los mensajes guardados en el localStorage
  clearMessagesBtn.addEventListener("click", function () {
    localStorage.removeItem("messages");
    messageList.innerHTML = "";
  });

  // Función para mostrar los mensajes almacenados en el localStorage
  function displayMessages() {
    const savedMessages = JSON.parse(localStorage.getItem("messages")) || [];

    // Limpiar la lista de mensajes previa
    messageList.innerHTML = "";

    // Recorrer los mensajes y mostrarlos en la página
    savedMessages.forEach(function (messageData) {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
                <strong>Nombre:</strong> ${messageData.name}<br>
                <strong>Correo electrónico:</strong> ${messageData.email}<br>
                <strong>Mensaje:</strong> ${messageData.message}<br>
                <hr>
            `;
      messageList.appendChild(listItem);
    });
  }

  // Mostrar mensajes almacenados al cargar la página
  displayMessages();
});

