const tableEl = document.querySelector('.table');
const noClick = document.querySelector('.no-click');
let jsonData = [];
const rowTable ={};
//Чтение данных с JSON
async function jsonRead() {
    try{
        const responce = await fetch('data.json');
        if (!responce.ok) {
            throw new Error('Данные JSON не получены!');
        }
        const data = await responce.json();
        localStorage.setItem('row', JSON.stringify(data));
        jsonData = data;
        addRowWeb(data);
    } catch (error) {
        console.log(`Ошибка: ${error}`);
    }
}

function addRowWeb(data) {
    for (const key1 in data) {
        for (const key in data[key1]) {
            if (key === 'name') {
                //Добавление в таблицу
                const web = `<tr id='${key1}'><th>${data[key1][key]}</p></tr>`;
                tableEl.insertAdjacentHTML('beforeend', web);
            } else if (key === 'time') {
                //Добавление в таблицу
                const web = `<td>${data[key1][key]}</td>`;
                document.getElementById(`${key1}`).insertAdjacentHTML('beforeend', web);
            } else if (key === 'maxParticipants') {
                //Добавление в таблицу
                const web = `<td>${data[key1][key]}</td>`;
                document.getElementById(`${key1}`).insertAdjacentHTML('beforeend', web);
            } else if (key === 'currentParticipants') {
                //Добаление в таблицу
                const web = `<td>${data[key1][key]}</td>`;
                document.getElementById(`${key1}`).insertAdjacentHTML('beforeend', web);
            }
        }
        //Добавление кнопки
        const web = `<td class ="btn-up"><button class="btn">Записаться</button></td>`;
        document.getElementById(`${key1}`).insertAdjacentHTML('beforeend', web);
    }

    //Добавление click на кнопку
    const btn = document.querySelectorAll('.btn');
    btn.forEach((el) => {
        //проверка свободного места
        const max = data[el.parentNode.parentNode.id].maxParticipants;
        const now = data[el.parentNode.parentNode.id].currentParticipants;
        if (max === now) {
            el.disable = true;
        }
        el.addEventListener('click', singUp);
    });
}

const singUp = (e) => {
    if (e.target.innerHTML === 'Записаться') {
        e.target.parentNode.previousElementSibling.innerHTML = jsonData[e.target.parentNode.parentNode.id].currentParticipants += 1;
        localStorage.setItem('row', JSON.stringify(jsonData));
        e.target.innerHTML = 'Отменить';
    } else {
        e.target.parentNode.previousElementSibling.innerHTML = jsonData[e.target.parentNode.parentNode.id].currentParticipants -= 1;
        localStorage.setItem('row', JSON.stringify(jsonData));
        e.target.innerHTML = 'Записаться';
    }
};

if (!localStorage.getItem('row')) {
    jsonRead();
} else {
    jsonData = JSON.parse(localStorage.getItem('row'));
    addRowWeb(jsonData);
}