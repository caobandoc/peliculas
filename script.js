function listarPeliculas(orden, busqueda) {
    fetch("./example.json")
        .then((response) => response.json())
        .then((response) =>
            cargarPeliculasEnHTML(response, orden, busqueda)
        )
        .catch((err) => console.error(err));
}

function cargarPeliculasEnHTML(lista, orden, busqueda) {
    // Filtrar lista de peliculas, si contiene algo de la variable busqueda
    if (busqueda) {
        lista = lista.filter((pelicula) =>
            pelicula.title.toLowerCase().includes(busqueda.toLowerCase())
        );
    }

    // Ocultar loader
    document.getElementById("container-loader").style.display = "none";

    // Mostrar contenedor de peliculas y filtros
    const contenedor = document.getElementById("peliculas");
    contenedor.style.display = "flex";
    document.getElementById("filtros").style.display = "flex";

    // Ordenar lista de peliculas
    switch (orden) {
        case "TITULO":
            lista = lista.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case "FECHA":
            lista = lista.sort(
                (a, b) => new Date(b.release_date) - new Date(a.release_date)
            );
            break;
        case "VOTOS":
            lista = lista.sort((a, b) => b.vote_average - a.vote_average);
            break;
        default:
            lista = lista.sort((a, b) => b.popularity - a.popularity);
            break;
    }

    // Agregar peliculas al HTML
    lista.forEach((pelicula) => {
        const div = document.createElement("div");
        div.classList.add("col");
        div.classList.add("py-4");
        div.innerHTML = `
        <div class="card border-light" style="width: 18rem;">
            <h5 class="card-header">${pelicula.title}</h5>
            <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" class="card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text">${pelicula.overview}</p>
            </div>
            <div class="card-footer text-body-secondary">
                Fecha de estreno: ${pelicula.release_date}
            </div>
        </div>`;
        contenedor.appendChild(div);
    });
}

function limpiarPeliculas() {
    const contenedor = document.getElementById("peliculas");
    contenedor.innerHTML = "";
}

listarPeliculas("POPULAR");

// Agregar eventos a los botones
const btnFPopular = document.getElementById("fPopular");
const btnFTitulo = document.getElementById("fTitulo");
const btnFFecha = document.getElementById("fFecha");
const btnFVotos = document.getElementById("fVotos");

// Filtrar por popularidad\
btnFPopular.addEventListener("click", () => {
    limpiarPeliculas();
    const busqueda = document.getElementById("busqueda").value;
    listarPeliculas("POPULAR", busqueda);
});

// Filtrar por titulo
btnFTitulo.addEventListener("click", () => {
    limpiarPeliculas();
    const busqueda = document.getElementById("busqueda").value;
    listarPeliculas("TITULO", busqueda);
});

// Filtrar por fecha
btnFFecha.addEventListener("click", () => {
    limpiarPeliculas();
    const busqueda = document.getElementById("busqueda").value;
    listarPeliculas("FECHA", busqueda);
});

// Filtrar por votos
btnFVotos.addEventListener("click", () => {
    limpiarPeliculas();
    const busqueda = document.getElementById("busqueda").value;
    listarPeliculas("VOTOS", busqueda);
});

// Agregar evento al boton buscar dentro del form de busqueda
document.getElementById("form-busqueda").addEventListener("submit", (event) => {
    event.preventDefault();
    limpiarPeliculas();
    const busqueda = document.getElementById("busqueda").value;
    listarPeliculas("POPULAR", busqueda);
});
