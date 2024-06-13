document.addEventListener("DOMContentLoaded", function() {
    const readMoreLink = document.querySelector(".read-more");
    const hiddenParagraphs = document.querySelectorAll(".content");

    if (readMoreLink && hiddenParagraphs) {
        readMoreLink.addEventListener("click", function(e) {
            e.preventDefault();

            hiddenParagraphs.forEach(function(paragraph) {
                paragraph.classList.toggle("expanded");
            });

            readMoreLink.textContent = readMoreLink.textContent === "Read More" ? "Read Less" : "Read More";
        });
    }
});
// For Aean Tayawa
var aeanTayawaDoc = document.getElementById("aeanTayawa");
var aeanTayawaHov = document.getElementById("aeanTayawaH1");

aeanTayawaDoc.addEventListener("mouseover", function(){
    aeanTayawaHov.style.transition = "ease-in-out 0.6s"; // Set transition property first
    aeanTayawaHov.style.display = "block";
});

aeanTayawaDoc.addEventListener("mouseleave", function(){
    aeanTayawaHov.style.display = "none";
});


var andraCagatDoc = document.getElementById("andraCagat");
var andraCagatHov = document.getElementById("andraCagatH1");

andraCagatDoc.addEventListener("mouseover", function(){
    andraCagatHov.style.transition = "ease-in-out 0.6s";
    andraCagatHov.style.display = "block";
});

andraCagatDoc.addEventListener("mouseleave", function(){
    andraCagatHov.style.display = "none";
});

var jandelTejadaDoc = document.getElementById("jandelTejada");
var jandelTejadaHov = document.getElementById("jandelTejadaH1");

jandelTejadaDoc.addEventListener("mouseover", function(){
    jandelTejadaHov.style.transition = "ease-in-out 0.6s";
    jandelTejadaHov.style.display = "block";
});

jandelTejadaDoc.addEventListener("mouseleave", function(){
    jandelTejadaHov.style.display = "none";
});

var reginaGarnaceDoc = document.getElementById("reginaGarnace");
var reginaGarnaceHov = document.getElementById("reginaGarnaceH1");

reginaGarnaceDoc.addEventListener("mouseover", function(){
    reginaGarnaceHov.style.transition = "ease-in-out 0.6s";
    reginaGarnaceHov.style.display = "block";
});

reginaGarnaceDoc.addEventListener("mouseleave", function(){
    reginaGarnaceHov.style.display = "none";
});

var mariaMangaoilDoc = document.getElementById("mariaMangaoil");
var mariaMangaoilHov = document.getElementById("mariaMangaoilH1");

mariaMangaoilDoc.addEventListener("mouseover", function(){
    mariaMangaoilHov.style.transition = "ease-in-out 0.6s";
    mariaMangaoilHov.style.display = "block";
});

mariaMangaoilDoc.addEventListener("mouseleave", function(){
    mariaMangaoilHov.style.display = "none";
});

var dexterPerdidoDoc = document.getElementById("dexterPerdido");
var dexterPerdidoHov = document.getElementById("dexterPerdidoH1");

dexterPerdidoDoc.addEventListener("mouseover", function(){
    dexterPerdidoHov.style.transition = "ease-in-out 0.6s";
    dexterPerdidoHov.style.display = "block";
});

dexterPerdidoDoc.addEventListener("mouseleave", function(){
    dexterPerdidoHov.style.display = "none";
});

