const apiKey = "8c229cfef016411c9b40239bc72d5eab";

let page = 1;
let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
let history = JSON.parse(localStorage.getItem("history")) || [];

const newsContainer = document.getElementById("newsContainer");
const countrySelect = document.getElementById("country");
const categorySelect = document.getElementById("category");
const searchInput = document.getElementById("search");

async function loadNews(reset = true) {

  if (reset) {
    page = 1;
    newsContainer.innerHTML = "";
  }

  const country = countrySelect.value;
  const category = categorySelect.value;
  const search = searchInput.value.trim();

  let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&apiKey=${apiKey}`;

  
  if (search !== "") {
    url += `&q=${search}`;
  }

  console.log("URL:", url); 

  const res = await fetch(url);
  const data = await res.json();

  console.log(data); 

  if (!data.articles || data.articles.length === 0) {
    newsContainer.innerHTML = "<p>No news found 😔</p>";
    return;
  }

  displayNews(data.articles);
}

function displayNews(articles) {

  articles.forEach(article => {

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${article.urlToImage || ''}">
      <h3>${article.title}</h3>
      <p>${article.description || ''}</p>
      <small>
        🕒 ${new Date(article.publishedAt).toLocaleString()} <br>
        Source: ${article.source.name}
      </small>
      <br><br>
      <a href="${article.url}" target="_blank">Read Full</a>
      <br><br>
      <button onclick='bookmark(${JSON.stringify(article)})'>⭐ Bookmark</button>
    `;

    newsContainer.appendChild(card);
    saveHistory(article);
  });
}

function bookmark(article) {
  bookmarks.push(article);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  alert("Bookmarked!");
}

function saveHistory(article) {
  history.push({
    title: article.title,
    time: new Date().toLocaleString()
  });
  localStorage.setItem("history", JSON.stringify(history));
}

function loadMore() {
  page++;
  loadNews(false);
}

function refreshNews() {
  searchInput.value = "";
  loadNews();
}

loadNews();