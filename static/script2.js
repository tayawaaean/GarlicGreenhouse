const form = document.querySelector("form"),
	  emailField = form.querySelector(".email-field"),
	  emailInput = emailField.querySelector(".email");

	  
function checkEmail(){
	const emailPattern= /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
	if(!emailInput.value.match(emailPattern)){
		return emailField.classList.add("invalid");
	}
	emailField.classList.remove("invalid");
}


form.addEventListener("submit", (e) =>{
	e.preventDefault();
	checkEmail();

	emailInput.addEventListener("keyup", checkEmail);


	if(
		!emailField.classList.contains("invalid")
	) {
		location.href = form.getAttribute("action");
	}

});