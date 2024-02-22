const API_KEY = `1ac0e5f98c57452a834d749b64dde1ec`;
let newsList = [];
const menus = document.querySelectorAll(".menus button");
console.log("mmm", menus);
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);

const getLatestNews = async () => {
  const url = new URL(
    `https://creative-clafoutis-810b22.netlify.app/top-headlines?country=us&apiKey=${API_KEY}`
    //`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  console.log("uuu", url);
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log("rrr", newsList);
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log("category");
  const url = new URL(
    `https://creative-clafoutis-810b22.netlify.app/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    //`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log("ddd", data);
  newsList = data.articles;
  render();
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">
        <div class="col-lg-4">
          <img class="news-img-size" src=${news.urlToImage}></img>
        </div>
        <div class="col-lg-8">
          <h2>${news.title}</h2>
          <p>${news.description}</p>
          <div>${news.source.name}  * ${news.publishedAt}</div>
        </div>
      </div>`
    )
    .join("");
  document.getElementById("news-board").innerHTML = newsHTML;
};

const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

const openSearchBox = async () => {
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};

const searchNews = async () => {
  let inputArea = document.getElementById("search-input").value;
  const url = new URL(
    `https://creative-clafoutis-810b22.netlify.apptop-headlines?country=us&q=${inputArea}&apiKey=${API_KEY}`
    //`https://newsapi.org/v2/top-headlines?country=us&q=${inputArea}&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log("keyword data", data);
  newsList = data.articles;
  render();
};

// 1.버튼들에클릭이벤트주기
// 2.카테고리별 뉴스 가져오기
// 3.그 뉴스를 보여주기(렌더)
getLatestNews();
