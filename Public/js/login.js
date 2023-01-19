console.log("connected")

const loginFormHandler = async (event) => {
  // Stop the browser from submitting the form
  event.preventDefault();
  console.log('here')

  // Gather the data from the form elements on the page
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    // Send the e-mail and password to the server
    const response = await fetch("http://localhost:3001/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response)

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in");
    }
  }
};

document
  .querySelector(".join-container")
  .addEventListener("submit", loginFormHandler);
