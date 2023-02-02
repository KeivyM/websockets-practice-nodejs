const socket = io();
const message = document.getElementById("message");
const username = document.getElementById("username");
const btn = document.getElementById("btn-send");
const output = document.getElementById("output");
const actions = document.getElementById("actions");

btn.addEventListener("click", () => {
  socket.emit("chat:message", {
    username: username.value,
    message: message.value,
  });
});

message.addEventListener("keydown", () => {
  console.log(message.value);
  if (message.value.length < 2) {
    socket.emit("chat:clear");
  } else {
    socket.emit("chat:typing", username.value || "Someone");
  }
});

socket.on("chat:message", (data) => {
  actions.innerHTML = "";
  output.innerHTML += `<p>
                          <strong> ${data.username}:</strong> ${data.message}
                      </p>`;
});

socket.on("chat:typing", (data) => {
  actions.innerHTML = `<p> <em>${data} is typing...</em> </p>`;
});

socket.on("chat:clear", () => {
  actions.innerHTML = "";
});
