function updateClock() {
    const now = new Date();
    const utcOffset = 0; // UTC+8 for Manila/Philippines time
    const localTime = new Date(now.getTime() + (utcOffset * 60 * 60 * 1000));
    const month = localTime.getMonth() + 1; // Adding 1 since getMonth() returns zero-based month
    const date = localTime.getDate();
    const year = localTime.getFullYear();
    const hours = localTime.getHours().toString().padStart(2, '0');
    const minutes = localTime.getMinutes().toString().padStart(2, '0');
    const seconds = localTime.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock').textContent = `${month}-${date}-${year} ${hours}:${minutes}:${seconds}`;
}

let isBlinking = false;
setInterval(() => {
    isBlinking = !isBlinking;
    document.getElementById('recordIcon').style.visibility = isBlinking ? 'visible' : 'hidden';
}, 500);

setInterval(updateClock, 1000);
