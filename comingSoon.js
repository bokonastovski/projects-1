// Coming Soon Page Form Validation
const form = document.getElementById("form");
const email = document.getElementById("email");
const email_error = document.getElementById("email_error");
form.addEventListener("submit", (e) => {
    if (email.value === "" || email.value == null) {
        e.preventDefault();
        email_error.innerHTML = "Внесете ја вашата е-маил адреса";
    } 
    else {
        email_error.innerHTML = "";
    }
});