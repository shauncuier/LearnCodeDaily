const loadUser = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            displayUser(data);
        });
}
const displayUser = (users) => {
    console.log(users[0].address.city);

}



// const displayUser = (users) => {
//     const ul = document.getElementById('data');
//     users.forEach(user => {
//         const li = document.createElement('li');
//         li.innerText = user.name;
//         ul.appendChild(li);
//     });
// }