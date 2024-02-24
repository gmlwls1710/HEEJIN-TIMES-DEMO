const API_KEY = `1ac0e5f98c57452a834d749b64dde1ec`;
let newsList = [];
let menus = document.querySelectorAll("#menu-list button");
console.log("mmm", menus);
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);
let url = new URL(
  //`https://creative-clafoutis-810b22.netlify.app/top-headlines?country=us&apiKey=${API_KEY}`
  `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
);
let totalResult = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getNews = async () => {
  try {
    url.searchParams.set("page", page); //=> &page=page
    url.searchParams.set("pageSize", pageSize);
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("No result for this search");
      }
      newsList = data.articles;
      totalResult = data.totalResult;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  url = new URL(
    //`https://creative-clafoutis-810b22.netlify.app/top-headlines?country=us&apiKey=${API_KEY}`
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  getNews();
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log("category", category);
  url = new URL(
    //`https://creative-clafoutis-810b22.netlify.app/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
  );
  getNews();
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

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
  </div>`;

  document.getElementById("news-board").innerHTML = errorHTML;
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
  url = new URL(
    //`https://creative-clafoutis-810b22.netlify.app/top-headlines?country=us&q=${inputArea}&apiKey=${API_KEY}`
    `https://newsapi.org/v2/top-headlines?country=us&q=${inputArea}&apiKey=${API_KEY}`
  );
  getNews();
};

// 1.버튼들에클릭이벤트주기
// 2.카테고리별 뉴스 가져오기
// 3.그 뉴스를 보여주기(렌더)
getLatestNews();

const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

const paginationRender = () => {
  //totalResult
  //page
  //pageSize
  //groupsize
  //totalPages
  const totalPages = Math.ceil(totalResult / pageSize);
  //pagegroup
  const pageGroup = Math.ceil(page / groupSize);
  //lastpage
  const lastPage = pageGroup * groupSize;
  // 마지막 페이지그룹이 그룹사이즈보다 작다? lastpage = totalpage
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }

  //firstpage
  const firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  let paginationHTML = ``;
  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${
      i === page ? "active" : ""
    }" onclick="moveToPage(${i})"> <a class="page-link" href='#js-bottom' onclick="pageClick(${i})" >${i}</a></li>`;
  }

  document.querySelector(".pagination").innerHTML = paginationHTML;
  // <nav aria-label="Page navigation example">
  //   <ul class="pagination">
  //     <li class="page-item">
  //       <a class="page-link" href="#">
  //         Previous
  //       </a>
  //     </li>
  //     <li class="page-item">
  //       <a class="page-link" href="#">
  //         1
  //       </a>
  //     </li>
  //     <li class="page-item">
  //       <a class="page-link" href="#">
  //         2
  //       </a>
  //     </li>
  //     <li class="page-item">
  //       <a class="page-link" href="#">
  //         3
  //       </a>
  //     </li>
  //     <li class="page-item">
  //       <a class="page-link" href="#">
  //         Next
  //       </a>
  //     </li>
  //   </ul>
  // </nav>;
};

const moveToPage = (pageNum) => {
  console.log("movepage", pageNum);
  page = pageNum;
  getNews();
};
