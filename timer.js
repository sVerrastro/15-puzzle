startTimer();

function startTimer() {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 1000);
}
    
function stopTimer() {
    clearInterval(timerInterval);
}
    
function updateTimer() {
    var now = new Date().getTime();
    var elapsedTime = now - startTime;
    var minutes = Math.floor(elapsedTime / (1000 * 60));
    var seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    seconds = (seconds < 10 ? "0" : "") + seconds;
    document.getElementById("timer").innerText = minutes + ":" + seconds;
}