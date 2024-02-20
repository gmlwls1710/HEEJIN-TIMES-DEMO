const API_KEY = `1ac0e5f98c57452a834d749b64dde1ec`;
let news = [];

const getLatestNews = async () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  console.log("uuu", url);
  const response = await fetch(url);
  const data = await response.json();
  news = data.articles;
  console.log("rrr", news);
};

getLatestNews();
