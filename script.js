// script.js

const form = document.getElementById("news-form");
const newsContainer = document.getElementById("news-container");

const API_KEY = 'YOUR_NEWSAPI_KEY'; // Replace with your NewsAPI key

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const source = document.getElementById("source").value;

  if (!source) {
    alert("Please select a news source.");
    return;
  }

  try {
    newsContainer.innerHTML = "<p>Loading news...</p>";

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${API_KEY}`
    );

    const data = await response.json();

    if (data.status !== "ok") throw new Error(data.message);

    displayNews(data.articles);
  } catch (error) {
    newsContainer.innerHTML = `<p class="error">Failed to fetch news: ${error.message}</p>`;
  }
});

function displayNews(articles) {
  if (articles.length === 0) {
    newsContainer.innerHTML = "<p>No articles found for this source.</p>";
    return;
  }

  newsContainer.innerHTML = articles
    .map(
      (article) => `
    <article>
      <h2>${article.title}</h2>
      <p>${article.description || "No description available."}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    </article>
  `
    )
    .join("");
}
