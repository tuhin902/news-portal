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
    // console.log(newData);

    const categories = document.getElementById('all-categories');

    for (const news of newData) {
        const span = document.createElement('span');
        span.innerHTML = `<button onclick="showCategoryNews()" class="btn"><a>${news.category_name}</a></button>`;
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
    const spinner = document.getElementById('spinner');

    newsContainer.textContent = '';


    for (const news of newsData) {
        // console.log(news);
        const { author, details, thumbnail_url, title, total_view } = news;
        // console.log(details, image_url);
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
                    <a class="navbar-brand m-3  " href="#">
                    <img src=${author.img} alt="" width="30" height="30">
                   </a>          
                    <div>
                    <h5>${author.name === "system" ? 'no data found' : author.name}</h5>
                    <p>${author.published_date}</p>
                    </div>
                </div>
                <p class="my-auto"> <i class="fa-regular fa-eye"></i> ${total_view === 0 ? 'no data found' : total_view}</p>

                <button type="button" onclick="showModal('${title}','${thumbnail_url}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                show details
                </button>

            </div>
        </div>
    </div>
</div>`;
        newsContainer.appendChild(div);
    }

}
displayNews();

const showModal = (details, image) => {

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <div class="modal-header">
    <h5 class="modal-title" id="exampleModalLabel">${details}</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>

    <div class="modal-body">
    <img class="img-fluid" src=${image} alt="">
    </div>
    
    `;
}
const totalItem = async () => {
    const data = await loadAllCategories();

    const nameData = data.data.news_category;
    // console.log(nameData);
    for (const news of nameData) {
        const categoryCounter = document.getElementById('result-counter');
        // console.log(categoryCounter);
        categoryCounter.innerHTML = `${news.length}     item found for categorie  ${news.category_name}`
    }


}
totalItem();

const showCategoryNews = async () => {
    const data = await loadAllNews();
    const showCategory = data.data;
    // console.log(showCategory);
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.textContent = '';
    // console.log(categoryContainer);
    showCategory.forEach(show => {
        const { author, details, thumbnail_url, title, total_view } = show;
        console.log(show);
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
                        <a class="navbar-brand m-3  " href="#">
                        <img src=${author.img} alt="" width="30" height="30">
                       </a>          
                        <div>
                        <h5>${author.name === "system" ? 'no data found' : author.name}</h5>
                        <p>${author.published_date}</p>
                        </div>
                    </div>
                    <p class="my-auto"> <i class="fa-regular fa-eye"></i> ${total_view === 0 ? 'no data found' : total_view}</p>
    
                    <button type="button" onclick="showModal('${title}','${thumbnail_url}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    show details
                    </button>
    
                </div>
            </div>
        </div>
    </div>`
        categoryContainer.appendChild(div);
    })
}
// showCategoryNews();