const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const timestamp = document.getElementById('timestamp');
const progress = document.getElementById('progress');


// play & pause video
const toggleVideoStatus = () => video.paused ? video.play() : video.pause();

// update play/pause icon
const updatePlayIcon = () => video.paused
    ? play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
    : play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';


// stop video
function stopVideo() {
    video.currentTime = 0;
    video.pause();
}

// update progress & timestamp
function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;

    //get minutes
    let mins = Math.floor(video.currentTime / 60);
    if (mins < 10) {
        mins = '0' + String(mins);
    }

    //get seconds
    let secs = Math.floor(video.currentTime % 60);
    if (secs < 10) {
        secs = '0' + String(secs);
    }

    timestamp.innerHTML = `${mins}:${secs}`;

}

// set video time to progress
function setVideoProgress() {
    video.currentTime = (+progress.value * video.duration) / 100;
}


//event listener
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);
