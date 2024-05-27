// Form Validation for Vraboti Student

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (validateForm()) {
        alert("Вашето барање е потврдено.");
      }
    });

    function validateForm() {
      resetErrors();

      let isValid = true;

      const nameInput = document.getElementById("Name");
      const nameError = document.getElementById("name_error");
      if (nameInput.value.trim() === "") {
        nameError.textContent = "Внесете го вашето име";
        isValid = false;
      }

      const companyInput = document.getElementById("Company");
      const companyError = document.getElementById("company_error");
      if (companyInput.value.trim() === "") {
        companyError.textContent = "Внесете го името на вашата компанија";
        isValid = false;
      }

      const emailInput = document.getElementById("Email");
      const emailError = document.getElementById("email_error");
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = "Внесете ја вашата е-маил адреса";
        isValid = false;
      }

      const phoneInput = document.getElementById("Phone");
      const phoneError = document.getElementById("phone_error");
      if (
        phoneInput.value.trim() === "" ||
        isNaN(phoneInput.value.trim())
      ) {
        phoneError.textContent = "Внесете го вашиот телефонски број";
        isValid = false;
      }

      const selectedType = document.querySelector(
        'input[name="tip-student"]:checked'
      );
      const dropdownError = document.getElementById("dropdown_error");
      if (!selectedType) {
        dropdownError.textContent = "Изберете тип на студент";
        isValid = false;
      }

      return isValid;
    }

    function resetErrors() {
      const errorElements = document.querySelectorAll(".error");
      errorElements.forEach(function (element) {
        element.textContent = "";
      });
    }
  });

//   Dropdown
const button = document.querySelector("#button");
      const select = document.querySelector("#dropdown");
      const paddingBottom = document.querySelector("#padding-bottom")
      const options = document.querySelectorAll(".option");
      const selectLabel = document.querySelector("#select-label");

      button.addEventListener("click", function (e) {
        e.preventDefault();
        toggleHidden();
      });

      function toggleHidden() {
        select.classList.toggle("hidden");
        paddingBottom.classList.toggle("padding-bottom");
      }

      options.forEach(function (option) {
        option.addEventListener("click", function (e) {
          setSelectTitle(e);
        });
      });

      function setSelectTitle(e) {
        const labelElement = document.querySelector(
          `label[for="${e.target.id}"]`
        ).innerText;
        selectLabel.innerText = labelElement;
        toggleHidden();
      }