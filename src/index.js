import './index.scss';

const articlesContainer = document.querySelector('.articles-container');

const displayArticles = (articles) => {
    const articlesDOM = articles.map((article) => {
        const articleNode = document.createElement('div');
        articleNode.classList.add('article');
        articleNode.innerHTML = `
        <img src=${article.profilPic ? article.profilPic : "assets/images/default_profile.png"} alt="">
                    <h2>${article.title}</h2>
                    <p class="article-author">${article.author} - 
                    <span> ${new Date(article.createdAt).toLocaleDateString('fr-FR',
                     {weekday: "long",
                     day: "2-digit",
                     month: "long",
                     year: "numeric",
                })} </span> </p>
                    <p class="article-content">${article.content}</p>
                    <div class="article-actions">
                        <button class="btn btn-primary" data-id=${article._id}>Modifier</button>
                        <button class="btn btn-danger" data-id=${article._id}>Supprimer</button>
                        
                    </div>
        `;
        return articleNode;
    });

    articlesContainer.innerHTML = '';
    articlesContainer.append(...articlesDOM);

    const deleteBtns = articlesContainer.querySelectorAll('.btn-danger');

    const editBtns = articlesContainer.querySelectorAll('.btn-primary')

    deleteBtns.forEach(button => {
        button.addEventListener('click', async event =>
    {
        event.preventDefault();
        try {
            const target = event.target;
            console.log(target);
            const articleId = target.dataset.id;
            const response = await fetch(`https://restapi.fr/api/dwwm_dq/${articleId}`, {method: 'DELETE'});
            const body = await response.json();
            fetchArticles();

            console.log(body);            
        } catch (error) {
            console.log(error);
        }
    })
    })

    editBtns.forEach(button => {
        button.addEventListener('click', async event =>
    {
        event.preventDefault();
        const target = event.target;
        const articleId = target.dataset.id;
        console.log(articleId);
        location.assign(`./form.html?id=${articleId}`);
        console.log(target)
    })
    })
};


const fetchArticles = async () => {
    try {
        const response = await fetch('https://restapi.fr/api/dwwm_dq');
        const articles = await response.json();

        if(articles.length != 0) {
            if(!articles.length) {
                displayArticles([articles]);
            }else {
                displayArticles(articles);
            }
        }else {
            articlesContainer.innerHTML = "<p>Pas d'articles...</p>";
        }
    } catch (error) {
        console.log(error)
    }
}

fetchArticles();