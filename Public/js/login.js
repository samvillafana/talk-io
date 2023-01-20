console.log("connected")

const loginFormHandler = async (event) => {
  // Stop the browser from submitting the form
  event.preventDefault();
  console.log('here')

  // Gather the data from the form elements on the page
  const username = document.querySelector("#usernameForm").value.trim();
  const password = document.querySelector("#passwordForm").value.trim();
  const room = 1;

  console.log(username);
  console.log(password);

  if (username && password) {
    // Send the e-mail and password to the server
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password, room }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response)

    if (response.ok) {
      document.location.replace("/chat/:id");
    } else {
      alert("Failed to log in");
    }
  }
};

document
  .querySelector(".join-container")
  .addEventListener("submit", loginFormHandler);
