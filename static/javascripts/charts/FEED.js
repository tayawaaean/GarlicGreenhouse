
var TestVid = document.getElementById('myVid');
var vids = document.getElementById('videoFeed');
var btn = document.getElementById('button');
var btn2 = document.getElementById('btn');
showCam();
btn.addEventListener('click', ()=>{
    vids.style.display = 'none';
    TestVid.requestPictureInPicture().catch(err => {
        console.log(err);
    });
});

btn2.onclick = function() {
    vids.style.display = (vids.style.display === 'none') ? 'block' : 'none';
};

function showCam(){
navigator.mediaDevices.getUserMedia({video:true}).then(stream=>{
    TestVid.srcObject = stream;
})
.catch(err=>{
    console.log(err)
})
}