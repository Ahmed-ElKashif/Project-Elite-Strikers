const email = document.getElementById("loginEmail");
const password = document.getElementById("loginPassword");
const errorDisplay = document.getElementById("loginError");

const users = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : [];

function showError(message) {
  errorDisplay.style.display = "block";
  errorDisplay.innerText = message;
}

function hideError() {
  errorDisplay.style.display = "none";
}

function emailValidation() {
  const enteredEmail = email.value;

  if (!enteredEmail.includes("@") || !enteredEmail.includes(".")) {
    showError("Please enter a valid email address");
    return false;
  }
  return true;
}

function EmptyCheck() {
  if (email.value === "" || password.value === "") {
    showError("All fields are required");
    return false;
  }
  return true;
}

function userFind() {
  for (let i = 0; i < users.length; i++) {
    if (
      users[i].email === email.value &&
      users[i].password === password.value
    ) {
      return users[i];
    }
  }
  return false;
}

function login(e) {
  if (e) e.preventDefault();

  hideError();

  if (!EmptyCheck()) {
    return;
  }

  if (!emailValidation()) {
    return;
  }

  const userIn = userFind();

  if (!userIn) {
    showError("Incorrect email or password");
    return;
  } else {
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        email: userIn.email,
        username: userIn.username,
      }),
    );

    window.location.href = "HomePage.html";
  }
}
