const API_KEY = '7420dfdfeba9719c37eb0c0d01584539';  // Ganti dengan API key TMDB kamu
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

document.addEventListener('DOMContentLoaded', () => {
    getMovies('/movie/now_playing', 'latest-movies');
    getMovies('/movie/popular', 'popular-movies');
    getMovies('/movie/top_rated', 'top-rated-movies');
});

function getMovies(endpoint, containerId) {
    fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US&page=1`)
        .then(response => response.json())
        .then(data => displayMovies(data.results, containerId))
        .catch(error => console.error('Fetch error:', error));
}

function displayMovies(movies, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('movie-card');
        card.addEventListener('click', () => showMovieDetail(movie.id));

        const img = document.createElement('img');
        img.src = movie.poster_path ? `${IMG_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/150x225?text=No+Image';

        const title = document.createElement('div');
        title.classList.add('movie-title');
        title.textContent = movie.title;

        card.appendChild(img);
        card.appendChild(title);
        container.appendChild(card);
    });
}

// Movie Detail Modal
function showMovieDetail(movieId) {
    fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`)
        .then(response => response.json())
        .then(movie => {
            const detail = `
                <h2>${movie.title}</h2>
                <img src="${movie.poster_path ? IMG_BASE_URL + movie.poster_path : 'https://via.placeholder.com/300x450?text=No+Image'}" style="width:200px;">
                <p><strong>Rating:</strong> ${movie.vote_average}</p>
                <p><strong>Release Date:</strong> ${movie.release_date}</p>
                <p>${movie.overview}</p>
            `;
            document.getElementById('movie-detail').innerHTML = detail;
            document.getElementById('movie-detail-modal').style.display = 'block';
        })
        .catch(error => console.error('Detail error:', error));
}

function closeModal() {
    document.getElementById('movie-detail-modal').style.display = 'none';
}
