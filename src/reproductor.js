
var audio = document.getElementById('audio');
var canciones = document.getElementById('canciones');
var titulo = document.getElementById('titulo');
var portada = document.getElementById('portada');
var progreso = document.getElementById('progreso');
var volumen = document.getElementById('volumen');
var mensaje = document.getElementById('mensaje');
var visualizador = document.getElementById('visualizador');


canciones.selectedIndex = 0;
audio.volume = 0.5;


function evento_cancion() {
    audio.pause();
    audio.src = canciones.value;
    titulo.textContent = canciones.options[canciones.selectedIndex].text;
    portada.src = canciones.options[canciones.selectedIndex].getAttribute('data-imagen');
    portada.alt = 'Portada de ' + titulo.textContent;
    progreso.value = 0;
    progreso.disabled = true;
    mensaje.textContent = 'Presiona Reproducir.';
}

function evento_reproducir() {
    if (audio.getAttribute('src') == null) {
        evento_cancion();
    }
    
    audio.play().catch(error_reproduccion);
}

function error_reproduccion(error) {
   
    if (error.name != 'AbortError') {
        mensaje.textContent = 'No se pudo reproducir. Revisa el archivo en resources/audio.';
    }
}

function evento_pausar() {
    audio.pause();
}

function evento_detener() {
    audio.pause();
    if (audio.readyState > 0) {
        audio.currentTime = 0;
    }
    progreso.value = 0;
    mensaje.textContent = 'Reproducción detenida.';
}

function evento_siguiente() {
    if (canciones.selectedIndex < 9) {
        canciones.selectedIndex = canciones.selectedIndex + 1;
    } else {
        canciones.selectedIndex = 0;
    }
    evento_cancion();
}

function evento_anterior() {
    if (canciones.selectedIndex > 0) {
        canciones.selectedIndex = canciones.selectedIndex - 1;
    } else {
        canciones.selectedIndex = 9;
    }
    evento_cancion();
}

function actualizar_avance() {
    if (isFinite(audio.duration) && audio.duration > 0) {
        progreso.disabled = false;
        progreso.value = audio.currentTime * 100 / audio.duration;
    }
}

function evento_avance() {
    if (isFinite(audio.duration) && audio.duration > 0) {
        audio.currentTime = progreso.value * audio.duration / 100;
    }
}

function evento_volumen() {
    audio.volume = volumen.value;
}

function mostrar_reproduccion() {
    visualizador.textContent = 'Reproduciendo';
    visualizador.className = 'activo';
    mensaje.textContent = 'Escuchando: ' + titulo.textContent;
}

function mostrar_pausa() {
    visualizador.textContent = 'En pausa';
    visualizador.className = '';
}

function error_archivo() {
    mostrar_pausa();
    progreso.disabled = true;
    mensaje.textContent = 'Agrega el archivo de esta canción en resources/audio.';
}

