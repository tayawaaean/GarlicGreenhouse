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

