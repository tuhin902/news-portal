const loadAllCategories = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await response.json();
    return data;
}

const setAllCategories = async () => {
    const data = await loadAllCategories();
    const newData = data.data.news_category;

    const categories = document.getElementById('all-categories');

    for (const news of newData) {
        const li = document.createElement('li');
        li.innerHTML = `<a>${news.category_name}</a>`;
        categories.appendChild(li);
    }
}
setAllCategories();
// loadAllCategories();