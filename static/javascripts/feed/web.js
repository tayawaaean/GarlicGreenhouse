
let video = document.querySelector("#videoElement");
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            video.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Error accessing camera:", error);
        });
} else {
    console.error("getUserMedia not supported!");
}

document.querySelectorAll('.sidebar a').forEach(item => {
    item.addEventListener('click', function(event) {
        if (!item.classList.contains('active') && !item.classList.contains('live-icon')) {
            document.getElementById('container').classList.add('minimized');
        }
    });
});

document.getElementById('container').addEventListener('click', function(event) {
    if (event.target === this) {
        document.getElementById('container').classList.remove('minimized');
    }
});




