const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const resultsDiv = document.getElementById("results");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const pageNumSpan = document.getElementById("pageNum");

let currentPage = 1;
let currentSearch = "";

const API_KEY = "af67f39b"; 

async function fetchMovies() {
  resultsDiv.innerHTML = "Loading... ⏳";

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${currentSearch}&page=${currentPage}`
    );

    const data = await response.json();
    console.log(data); 

    if (data.Response === "False") {
      resultsDiv.innerHTML = data.Error;
      return;
    }

    resultsDiv.innerHTML = "";

    data.Search.forEach(movie => {
      const movieDiv = document.createElement("div");
      movieDiv.className = "movie";

      movieDiv.innerHTML = `
        <img src="${movie.Poster !== "N/A" ? movie.Poster : ""}">
        <h4>${movie.Title}</h4>
        <p>${movie.Year}</p>
      `;

      resultsDiv.appendChild(movieDiv);
    });

    pageNumSpan.textContent = currentPage;

  } catch (error) {
    resultsDiv.innerHTML = "Something went wrong 😢";
    console.error(error);
  }
}

searchBtn.addEventListener("click", () => {
  currentSearch = searchInput.value;
  currentPage = 1;
  fetchMovies();
});

nextBtn.addEventListener("click", () => {
  currentPage++;
  fetchMovies();
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchMovies();
  }
});