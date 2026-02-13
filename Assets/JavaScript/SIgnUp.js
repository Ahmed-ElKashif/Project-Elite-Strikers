const username = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const warnUser = document.getElementById("warningUser");
const warnEmail = document.getElementById("warningEmail");
const warnPassword = document.getElementById("warnPassword");
const warnMatch = document.getElementById("warningMatch");
const warnEmpty = document.getElementById("warningEmpty");

let users = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : [];

function userValidation() {
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username.value) {
      warnUser.style.display = "block";
      return false;
    }
  }
  warnUser.style.display = "none";
  return true;
}

function emailValidation() {
  const emailValue = email.value;

  if (!emailValue.includes("@") || !emailValue.includes(".")) {
    warnEmail.style.display = "block";
    warnEmail.innerText = "Please enter a valid email";
    return false;
  }

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === emailValue) {
      warnEmail.style.display = "block";
      warnEmail.innerText = "This email already exists";
      return false;
    }
  }

  warnEmail.style.display = "none";
  return true;
}

function passwordValidation() {
  if (password.value.length < 6) {
    warnPassword.style.display = "block";
    return false;
  } else {
    warnPassword.style.display = "none";
    return true;
  }
}

function passwordMatch() {
  if (password.value !== confirmPassword.value) {
    warnMatch.style.display = "block";
    return false;
  } else {
    warnMatch.style.display = "none";
    return true;
  }
}

function EmptyCheck() {
  if (
    username.value === "" ||
    email.value === "" ||
    password.value === "" ||
    confirmPassword.value === ""
  ) {
    warnEmpty.style.display = "block";
    return false;
  } else {
    warnEmpty.style.display = "none";
    return true;
  }
}

function submiting(e) {
  if (e) e.preventDefault();

  const isNotEmpty = EmptyCheck();
  if (!isNotEmpty) return;

  const isUserValid = userValidation();
  const isEmailValid = emailValidation();
  const isPassValid = passwordValidation();
  const isMatchValid = passwordMatch();

  if (isUserValid && isEmailValid && isPassValid && isMatchValid) {
    const newUser = {
      username: username.value,
      email: email.value,
      password: password.value,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Redirect
    window.location.href = "Login.html";
  }
}
