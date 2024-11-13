
function guardarResenas() {
    const comentarios = document.querySelectorAll('.comentario');
    let resenas = JSON.parse(localStorage.getItem("resenas") || "[]");

    comentarios.forEach((comentario, index) => {
        const textoComentario = comentario.value.trim();
        if (textoComentario) {

            const platoDescripcion = comentario.previousElementSibling.textContent;
            const resena = { plato: platoDescripcion, comentario: textoComentario };
            resenas.push(resena);
            

            mostrarComentario(comentario, textoComentario);


            comentario.value = "";
        }
    });


    localStorage.setItem("resenas", JSON.stringify(resenas));
    alert("Reseñas guardadas!");
}


function mostrarComentario(inputField, comentarioText) {
    let comentarioDiv = inputField.nextElementSibling;
    

    if (!comentarioDiv || !comentarioDiv.classList.contains('comentarios-lista')) {
        comentarioDiv = document.createElement('div');
        comentarioDiv.classList.add('comentarios-lista');
        inputField.parentNode.appendChild(comentarioDiv);
    }
    

    const nuevoComentario = document.createElement('p');
    nuevoComentario.textContent = comentarioText;
    comentarioDiv.appendChild(nuevoComentario);
}


function cargarResenas() {
    const resenasGuardadas = JSON.parse(localStorage.getItem("resenas") || "[]");
    const comentarios = document.querySelectorAll('.comentario');
    
    resenasGuardadas.forEach(resena => {
        comentarios.forEach((comentario) => {
            const platoDescripcion = comentario.previousElementSibling.textContent;
            if (platoDescripcion === resena.plato) {
                mostrarComentario(comentario, resena.comentario);
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", cargarResenas);
function eliminarResenas() {
    localStorage.removeItem("resenas"); // Elimina las reseñas guardadas
    alert("Todas las reseñas han sido eliminadas.");
    location.reload(); // Recarga la página para actualizar la visualización
}