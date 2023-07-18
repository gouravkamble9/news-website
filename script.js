const API_KEY="945f513856024952a6406599820c35b1";
const url="https://newsapi.org/v2/everything?q="


window.addEventListener('load',()=>fetchNews("India"));

async function fetchNews(query){
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data=await res.json();
    binData(data.articles)
}

function binData(articles){
    const cardContainer=document.getElementById('cards-container')
    const newsCardtemplate=document.getElementById('template-news-card')

    cardContainer.innerHTML='';

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone =newsCardtemplate.content.cloneNode(true);
        const socialShare = cardClone.querySelector('.social-share');
        fillDataInCard(cardClone,article,socialShare);
        cardContainer.appendChild(cardClone)
        
    });
}


function fillDataInCard(cardclone,article,socialShare){
    const newsImg=cardclone.querySelector('#news-img');
    const newsTitle=cardclone.querySelector('#news-title');
    const newsSource=cardclone.querySelector('#news-source');
    const newsdesc=cardclone.querySelector('#news-desc');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsdesc.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US",{timeZone:"Asia/Jakarta"});

    newsSource.innerHTML=`${article.source.name} . ${date}`;

    newsImg.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })

    const shareOnFacebook = () => {
        const encodedUrl = encodeURIComponent(article.url);
        const encodedTitle = encodeURIComponent(article.title);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&text=${encodedTitle}`, '_blank');
    };
    
    const shareOnTwitter = () => {
        const encodedUrl = encodeURIComponent(article.url);
        const encodedTitle = encodeURIComponent(article.title);
        window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, '_blank');
    };

    const shareOnWhatsApp = () => {
        const encodedUrl = encodeURIComponent(article.url);
        const encodedTitle = encodeURIComponent(article.title);
        window.open(`https://api.whatsapp.com/send?text=${encodedUrl}&text=${encodedTitle}`, '_blank');
    };

    
    
    const facebookBtn = socialShare.querySelector('#facebook');
    const twitterBtn = socialShare.querySelector('#twitter');
    const whatsappBtn = socialShare.querySelector('#whatsapp');

    
    twitterBtn.addEventListener('click', shareOnTwitter);
    whatsappBtn.addEventListener('click', shareOnWhatsApp);
    facebookBtn.addEventListener('click', shareOnFacebook);

    newsTitle.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })
}

let currentselect=null;


function onNavItemClick(id){

    fetchNews(id);
    const navItem=document.getElementById(id);
    currentselect?.classList.remove('active');
    currentselect=navItem;
    currentselect.classList.add('active')
}

const searchbtn=document.getElementById('search-btn');
const searchTxt=document.getElementById('search-txt');


searchbtn.addEventListener('click',()=>{
    const query=searchTxt.value;
    if(!query) return;
    fetchNews(query);

    currentselect?.classList.remove('active');
    currentselect=null;

    searchTxt.value="";


})


