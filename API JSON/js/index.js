const loadUser = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        displayUser(data);
    }
    );
}

const displayUser = (users) => {
    const ul = document.getElementById('data');
    for (const user of users) {
        const li = document.createElement('li');
        li.innerText = user.name;
        ul.appendChild(li);
    }
}


