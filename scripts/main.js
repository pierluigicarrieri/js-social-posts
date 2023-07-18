//Creates variable for the posts container (html element).
const postListElement = document.querySelector(".posts-list");

/* Creates an array of objects (every object has info for each post's 
content). A "liked" property has been added to every object, see 
"addEventListener" below. */
const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25",
        "liked": false
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03",
        "liked": false
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15",
        "liked": false
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03",
        "liked": false
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05",
        "liked": false
    }
];

//"forEach" cycles "posts".
posts.forEach((element) => {

    /* Creates variable for single post container, adds "post" class, appends it 
    to "postListElement". */
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postListElement.append(postElement);

    /* Splits "created" value into an array ("splitDate"), than assembles 
    "splitDate" elements to get USA or ITA date format. */
    const splitDate = element.created.split("-");

    const USADate = `${splitDate[1]}-${splitDate[2]}-${splitDate[0]}`;

    const ITADate = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;

    /* Creates variable for post header, adds "post__header" class, appends it 
    to "postElement", adds innerHtml to "postHeaderElement". */
    const postHeaderElement = document.createElement("div");
    postHeaderElement.classList.add("post__header");
    postElement.append(postHeaderElement);
    postHeaderElement.innerHTML +=
    `<div class="post-meta">                    
        <div class="post-meta__icon">
            <img class="profile-pic" src=${element.author.image} alt=${element.author.name}>                    
        </div>
        <div class="post-meta__data">
            <div class="post-meta__author">${element.author.name}</div>
            <div class="post-meta__time">${ITADate}</div>
        </div>                    
    </div>`

    /* Creates variable for post text, adds "post__text" class, appends it 
    to "postElement", adds innerHtml to "postTextElement". */
    const postTextElement = document.createElement("div");
    postTextElement.classList.add("post__text");
    postElement.append(postTextElement);
    postTextElement.innerHTML += element.content;

    /* Creates variable for post img container, adds "post__image" class, appends 
    it to "postElement", adds innerHtml to "postImageElement". */
    const postImageElement = document.createElement("div");
    postImageElement.classList.add("post__image");
    postElement.append(postImageElement);
    postImageElement.innerHTML += `<img src=${element.media} alt="">`

    /* Creates variable for post footer, adds "post__footer" class, appends 
    it to "postElement", adds innerHtml to "postFooterElement". */
    const postFooterElement = document.createElement("div");
    postFooterElement.classList.add("post__footer");
    postElement.append(postFooterElement);
    postFooterElement.innerHTML += 
    `<div class="likes js-likes">
        <div class="likes__cta">
            <a class="like-button js-like-button" href="#" data-postid="1">
                <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                <span class="like-button__label">Mi Piace</span>
            </a>
        </div>
        <div class="likes__counter">
            Piace a <b id="like-counter-${element.id}" class="js-likes-counter">${element.likes}</b> persone
        </div>
    </div>`

    }
)

//Creates empty array where to save id's of liked posts on click.
const likedPosts = [];

/* Creates variables for all the button elements, all the like counter elements 
and all the icon elements. */
const likeBtnElements = document.querySelectorAll(".like-button");
const likeCounterElements = document.querySelectorAll(".js-likes-counter");
const likeIconElements = document.querySelectorAll(".like-button__icon");

//"forEach" cycles "likeBtnElements".
likeBtnElements.forEach((element, i) => {
    
    //"addEventListener" for click on each "likeBtnElements".
    element.addEventListener("click", function(){

        /* If like button already pressed, decreases counter and 
        takes away blue color */
        if (posts[i].liked === true) {

            posts[i].likes--;

            likeCounterElements[i].innerHTML = posts[i].likes;

            likeIconElements[i].classList.remove("blue-icon");

            posts[i].liked = false;

            return 0;
        }

        /* Increases the "likes" property in each "posts" object, 
        using "i" as index (is the same as the clicked "likeBtnElements"). */
        posts[i].likes++;

        posts[i].liked = true;

        /* Outputs the increased "likes" value into the "likeCounterElements" 
        using "innerHtml" (still uses "i" as index to ge the right one). */
        likeCounterElements[i].innerHTML = posts[i].likes;

        /* Puts blue color on "likeIconElements" by adding css class 
        (still uses "i" as index to ge the right one). */
        likeIconElements[i].classList.add("blue-icon");

        //Pushes id of clicked object into "likedPosts".
        likedPosts.push(posts[i].id);

    }
    )

}
)
