const loadAllCategories = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await response.json();
    return data;
}
const loadAllNews = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/01`);
    const data = await response.json();
    return data;
}
// loadAllNews();
const setAllCategories = async () => {
    const data = await loadAllCategories();
    const newData = data.data.news_category;

    const categories = document.getElementById('all-categories');

    for (const news of newData) {
        const span = document.createElement('span');
        span.innerHTML = `<a>${news.category_name}</a>`;
        categories.appendChild(span);
    }
}
setAllCategories();
// loadAllCategories();


const displayNews = async () => {
    const data = await loadAllNews();
    // console.log(data.data);
    const newsData = data.data;
    // console.log(newsData);

    const newsContainer = document.getElementById('news-container');

    newsContainer.textContent = '';

    for (const news of newsData) {
        console.log(news);
        const { author, details, thumbnail_url, title, total_view } = news;
        const div = document.createElement('div');
        div.innerHTML = `<div class="card mb-3  p-3">
    <div class="row g-0 conatiner-fluid">
        <div class="col-md-4">
            <img src=${thumbnail_url} class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${details.length > 200 ? details.slice(0, 200) + '...' : details}</p>
            </div>
            <div class="card-body d-flex justify-content-between">
                <div class="d-flex ">
                    <img src="" alt="">
                    <div>
                    <h5>${author.name}</h5>
                    <p>${author.published_date}</p>
                    </div>
                </div>
                <p class="my-auto"> <i class="fa-regular fa-eye"></i> ${total_view === 0 ? 'no data found' : total_view}</p>
                <button class="btn btn-primary">Details</button>
            </div>
        </div>
    </div>
</div>`;
        newsContainer.appendChild(div);
    }

}
displayNews();