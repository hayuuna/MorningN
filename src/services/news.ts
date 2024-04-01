import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export async function getNews() {
  try {
    const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`);
    return res.data.articles;
  } catch (err) {
    console.error(err);
  }
}
