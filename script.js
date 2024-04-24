function listarPeliculas() {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDMyNDZkZTMwNjYyODM0ODAyNmUzNmMyYTEzOWU2MSIsInN1YiI6IjY2Mjg2OGY2MTc2YTk0MDE2NjgxZjZjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0XHLYnsRXnvvF2ValyKiT6JORl8vadcrwfX8liz9CRg",
        },
    };

    fetch(
        "https://api.themoviedb.org/3/movie/popular?language=es-MX&page=1",
        options
    )
        .then((response) => response.json())
        .then((response) => cargarPeliculasEnHTML(response.results))
        .catch(() => listarPeliculasJson());
}

function listarPeliculasJson() {
    // archivo en ./example.json
    // dar un retardo de 5 segundos
    setTimeout(() => {
        fetch("./example.json")
            .then((response) => response.json())
            .then((response) => cargarPeliculasEnHTML(response.results))
            .catch((err) => console.error(err));
    }, 3000);
}

function cargarPeliculasEnHTML(lista) {
    //esconder del css clase container-loader
    const loader = document.getElementById("container-loader");
    loader.classList.add("d-none");

    const contenedor = document.getElementById("peliculas");

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

listarPeliculas();
