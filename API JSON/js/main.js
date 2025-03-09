fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(response => response.json())
    .then(json => console.log(json))



// const loadData = () => {
//     fetch('https://jsonplaceholder.typicode.com/todos')
//         .then(response => response.json())
//         .then(json => console.log(json))
// }


// console.log('Hello World!')
// loadData();

// show all data in browser

const loadData = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => {
            const ul = document.getElementById('data');
            json.forEach(item => {
                const li = document.createElement('li');
                li.innerText = item.title;
                ul.appendChild(li);
            })
        })
}



