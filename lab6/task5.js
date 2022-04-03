// task 5


function getAllTitles(data) {
    throwTitlesonScreen(data.reduce((titles, episode) => {
        titles.push(episode.title);
        return titles;
    }, []));
}

function throwTitlesonScreen(titles) {
    for (title of titles) {
        let titleBox = document.createElement('div');
        titleBox.style.position = 'absolute';
        titleBox.style.top = `${Math.random() * 98}%`;
        titleBox.style.left = `${Math.random() * 95}%`;
        titleBox.textContent = title;
        document.body.appendChild(titleBox);
    }
}

let button = document.getElementById('buttonForDumTitlesKillMe');
button.addEventListener('click', (e) => {
    fetch('https://breakingbadapi.com/api/episodes')
        .then(response => response.json())
        .then(data => getAllTitles(data));
});
