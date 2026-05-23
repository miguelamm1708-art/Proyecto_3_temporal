// Selección de elementos del DOM
const audio = document.getElementById('main-audio');
const btnPlay = document.getElementById('btn-play');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const currentTimeTrack = document.getElementById('current-time');
const totalDurationTrack = document.getElementById('total-duration');

const currentCover = document.getElementById('current-cover');
const currentTitle = document.getElementById('current-title');
const currentArtist = document.getElementById('current-artist');

const albums = document.querySelectorAll('.albunes');

let isPlaying = false;

// Función para cargar y reproducir una canción
function loadSong(albumElement) {
    const audioSrc = albumElement.getAttribute('data-audio');
    const title = albumElement.querySelector('.text_Albunes').innerText;
    const artist = albumElement.querySelectorAll('.text_Albunes')[1].innerText;
    const coverSrc = albumElement.querySelector('.Portada_lista').src;

    audio.src = audioSrc;
    currentTitle.innerText = title;
    currentArtist.innerText = artist;
    currentCover.src = coverSrc;

    playSong();
}

// Reproducir
function playSong() {
    isPlaying = true;
    audio.play();
    btnPlay.innerText = 'pause_circle'; // Cambia el icono a pausa
}

// Pausar
function togglePlay() {
    if (!audio.src) return; // Si no hay canción cargada, no hace nada

    if (isPlaying) {
        audio.pause();
        btnPlay.innerText = 'play_circle';
    } else {
        audio.play();
        btnPlay.innerText = 'pause_circle';
    }
    isPlaying = !isPlaying;
}

// Formatear tiempo (de segundos a mm:ss)
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Actualizar barra de progreso y tiempos
function updateProgress() {
    if (audio.duration) {
        const percentage = (audio.currentTime / audio.duration) * 100;
        progressBar.value = percentage;
        currentTimeTrack.innerText = formatTime(audio.currentTime);
        totalDurationTrack.innerText = formatTime(audio.duration);
    }
}

// Cambiar el tiempo de la canción manualmente
function setProgress() {
    const targetTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = targetTime;
}

// Control de volumen
function changeVolume() {
    audio.volume = volumeBar.value / 100;
}

// Event Listeners
albums.forEach(album => {
    album.addEventListener('click', () => loadSong(album));
});

btnPlay.addEventListener('click', togglePlay);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('loadedmetadata', updateProgress); // Para cargar la duración inicial
progressBar.addEventListener('input', setProgress);
volumeBar.addEventListener('input', changeVolume);

// Auto-reproducción al terminar (opcional, en este caso sólo resetea el botón)
audio.addEventListener('ended', () => {
    btnPlay.innerText = 'play_circle';
    isPlaying = false;
    progressBar.value = 0;
});