document.addEventListener("DOMContentLoaded", async function () {
  const contactForm = document.getElementById("contactForm");
  const messageList = document.getElementById("messageList");
  const clearMessagesBtn = document.getElementById("clearMessages");

  // Cargar el archivo JSON utilizando fetch en una función asincrónica
  async function fetchUsers() {
    try {
      const response = await fetch("users.json");
      const data = await response.json();
      return data.users; // Retorna el array de usuarios
    } catch (error) {
      console.error("Error al cargar el archivo JSON:", error);
      return []; // Retorna un array vacío en caso de error
    }
  }

  // Evento para guardar el formulario en el localStorage
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const formData = {
      name: name,
      email: email,
      message: message,
    };

    let savedMessages = JSON.parse(localStorage.getItem("messages")) || [];

    savedMessages.push(formData);

    localStorage.setItem("messages", JSON.stringify(savedMessages));

    displayMessages();
  });

  clearMessagesBtn.addEventListener("click", function () {
    localStorage.removeItem("messages");
    messageList.innerHTML = "";
  });

  async function displayMessages() {
    const savedMessages = JSON.parse(localStorage.getItem("messages")) || [];

    messageList.innerHTML = "";

    // Cargar los usuarios del archivo JSON
    const users = await fetchUsers();

    savedMessages.forEach(function (messageData) {
      const listItem = document.createElement("li");
      const user = users.find(u => u.email === messageData.email);
      if (user) {
        listItem.innerHTML = `
                <strong>Nombre:</strong> ${user.name}<br>
                <strong>Correo electrónico:</strong> ${user.email}<br>
                <strong>Mensaje:</strong> ${messageData.message}<br>
                <hr>
            `;
        messageList.appendChild(listItem);
      }
    });
  }

  displayMessages();
});
