// const loadUser = () => {
//     fetch('https://jsonplaceholder.typicode.com/users')
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         displayUser(data);
//     }
//     );
// }

// const displayUser = (users) => {
//     const ul = document.getElementById('data');
//     for (const user of users) {
//         const li = document.createElement('li');
//         li.innerText = user.name;
//         ul.appendChild(li);
//     }
// }




// setTimeout(() => {
//     console.log('I am from first line');
// }, 3);

// setTimeout(() => {
//     console.log('I am from second line');
// }, 2);

// setTimeout(() => {
//     console.log('I am from setTimeout');
// }, 1);



fetch('./json/test.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        displayUser(data);
    }
    );

const displayUser = (users) => {
    const ul = document.getElementById('data');
    for (const user of users) {
        const li = document.createElement('li');
        li.innerText = user.company;
        ul.appendChild(li);
    }
}





