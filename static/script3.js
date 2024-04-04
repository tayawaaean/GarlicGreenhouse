const form = document.querySelector("form"),
	  passField = form.querySelector(".create-password"),
	  passInput = passField.querySelector(".password"),
	  cPassField = form.querySelector(".confirm-password"),
	  cPassInput = cPassField.querySelector(".cPassword");

const eyeIcons =  document.querySelectorAll(".show-hide");

eyeIcons.forEach((eyeIcon) => {
	eyeIcon.addEventListener("click", () => {
		const pInput = eyeIcon.parentElement.querySelector("input");
	
		if(pInput.type === "password"){
			eyeIcon.classList.replace("bx-hide", "bx-show");
			return (pInput.type = "text");
		}
		eyeIcon.classList.replace("bx-show", "bx-hide");
		pInput.type = "password";
	});
});


