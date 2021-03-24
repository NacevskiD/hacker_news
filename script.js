let baseURL = 'https://hacker-news.firebaseio.com/v0/'

let newStoriesBtn = document.querySelector('#new-stories')
let bestStoriesBtn = document.querySelector('#best-stories')
let topStoriesBtn = document.querySelector('#top-stories')
let nextPageBtn = document.querySelector('#next-page')
let prevPageBtn = document.querySelector('#previous-page')
let firstPageBtn = document.querySelector('#first-page')
let lastPageBtn = document.querySelector('#last-page')
let currentPage = document.querySelector('#current-page')
let lastStory = 5
let firstStory = 0
let category =['newstories','beststories','topstories']
let currentCategory = null
let htmlElementCounter = 0
let articleArraySize = null

newStoriesBtn.addEventListener('click',function (){
    currentCategory = 0
    news(category[currentCategory],firstStory,lastStory)
    htmlElementCounter = 0
})

bestStoriesBtn.addEventListener('click',function (){
    currentCategory = 1
    news(category[currentCategory],firstStory,lastStory)
    htmlElementCounter = 0
})

topStoriesBtn.addEventListener('click',function (){
    currentCategory = 2
    news(category[currentCategory],firstStory,lastStory)
    htmlElementCounter = 0
})

nextPageBtn.addEventListener('click', function (){
    firstStory+=5
    lastStory+=5
    news(category[currentCategory],firstStory,lastStory)
    htmlElementCounter = 0
    currentPage.innerHTML = parseInt(currentPage.innerHTML) +1
})

prevPageBtn.addEventListener('click',function (){
    if ( parseInt(currentPage.innerHTML) ===1){
        alert('First page, can\'t go backwards.')
    }
    else {
        firstStory -= 5
        lastStory -= 5
        news(category[currentCategory], firstStory, lastStory)
        htmlElementCounter = 0
        currentPage.innerHTML = parseInt(currentPage.innerHTML) - 1
    }
})

firstPageBtn.addEventListener('click',function (){
    firstStory = 0
    lastStory = 5
    news(category[currentCategory],firstStory,lastStory)
    htmlElementCounter = 0
    currentPage.innerHTML = 1
})

lastPageBtn.addEventListener('click',function (){
    checkArraySize(category[currentCategory])
    lastStory = articleArraySize
    firstStory = articleArraySize -5
    news(category[currentCategory],firstStory,lastStory)
    htmlElementCounter = 0
    currentPage.innerHTML =articleArraySize/5
})


newStoriesBtn.click()

function news(tag,firstStory,lastStory) {

    fetch(baseURL+ tag + '.json').then( res => res.json() )
        .then( (articles) => {
            articleArraySize = articles.length
            if(articleArraySize>lastStory) {

                for (let count = firstStory; count < lastStory; count++) {

                    getStory(articles[count], htmlElementCounter)
                    htmlElementCounter++

                }
            }
            else {
                alert('Reached last page.')
            }

        }).catch( (err) => {

        console.log('Couldn\'t fetch data', err)
    })
}
function getStory(id,count){


    fetch(baseURL+ 'item/' + id + '.json').then( res => res.json() )
        .then( (article) => {

            let author = document.querySelector('#made-by' + count)
            let date = document.querySelector('#date-made'+count)
            let score = document.querySelector('#story-score'+count)
            let title = document.querySelector('#story-title'+count)
            let url = document.querySelector('#story-url'+count)

            author.innerHTML = article.by
            date.innerHTML = article.time
            score.innerHTML = article.score
            title.innerHTML = article.title
            url.href = article.url


        }).catch( (err) => {

        console.log('Couldn\'t fetch data', err)
    })



}

function checkArraySize(tag){
        fetch(baseURL+ tag + '.json').then( res => res.json() )
            .then( (articles) => {
                articleArraySize = articles.length

            }).catch( (err) => {

            console.log('Couldn\'t fetch data', err)
        })

}
