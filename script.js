const API_KEY = "ae0a73c425b54036aa6328b3b9995f87";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchnews("India"));

function reload(){
  window.location.reload();
}

async function fetchnews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-image");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsTitle.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} . ${date}`

  cardClone.firstElementChild.addEventListener('click',() => {
    window.open(article.url,"_blank")
  })
}

let currSelectedNav = null;
function onNavItemClick(id){
  fetchnews(id);
  const navItem = document.getElementById(id);
  currSelectedNav?.classList.remove('active');
  currSelectedNav = navItem;
  currSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
  const query = searchText.value;
  if(!query) return;
  fetchnews(query);
  currSelectedNav?.classList.remove('active');
  currSelectedNav = null;
})