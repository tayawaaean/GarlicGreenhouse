function show(){
    var pswrd = document.getElementById('password');
    var icon = document.querySelector('.fas');
    if (pswrd.type === "password"){
        pswrd.type = "text";
        pswrd.style.marginTop = "0px";
        icon.style.color = "#000";
    }else{
        pswrd.type = "password";
        icon.style.color = "grey";
    }
}