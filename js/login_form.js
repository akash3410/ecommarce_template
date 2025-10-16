document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (!form) return;

  // ===== Floating Label Logic =====
  const inputs = form.querySelectorAll("input");

  inputs.forEach((input) => {
    const label = input.nextElementSibling;
    if (!label) return;

    function updateLabel() {
      if (input.value.trim() !== "") {
        label.classList.add("-top-2", "text-sm", "text-blue-800");
        label.classList.remove("top-2.5", "text-gray-500");
      } else {
        label.classList.remove("-top-2", "text-sm", "text-blue-800");
        label.classList.add("top-2.5", "text-gray-500");
      }
    }

    input.addEventListener("focus", () => {
      label.classList.add("-top-2", "text-sm", "text-blue-800");
      label.classList.remove("top-2.5", "text-gray-500");
    });

    input.addEventListener("blur", updateLabel);
    input.addEventListener("input", updateLabel);
  });

  // ===== Password Toggle Logic =====
  const togglePassword = document.getElementById("togglePassword");
  const password = document.getElementById("password");
  const eyeIcon = document.getElementById("eyeIcon");

  if (togglePassword && password && eyeIcon) {
    togglePassword.addEventListener("click", (e) => {
      e.preventDefault();
      const isHidden = password.type === "password";

      password.type = isHidden ? "text" : "password";
      eyeIcon.classList.toggle("fa-eye");
      eyeIcon.classList.toggle("fa-eye-slash");

      const len = password.value.length;
      password.focus();
      password.setSelectionRange(len, len);
    });
  }
});