async function getColors() {
    //получаем данные из api
    let response = await fetch("https://reqres.in/api/unknown?per_page=12");
    let content = await response.json();
    let colors = content.data;
    let tbody = document.querySelector('.table__body');

    // в цикле создаем строки таблицы и присваиваем им полученные данные
    for (const color of colors) {
        color.name = color.name[0].toUpperCase() + color.name.substring(1);

        tbody.innerHTML +=
            `<tr>
                <td class="text-right id" data-name="id">
                    ${color.id}
                </td>
                <td class="name" data-name="name">
                    ${color.name}
                </td>
                <td class="color" data-name="color">
                    <div class="color__prev" style="background-color: ${color.color}; display: inline-block"></div>
                    <div class="color__hash" style="display: inline-block">${color.color}</div>
                </td>
                <td class="value" data-name="value">
                    ${color.pantone_value}
                </td>
            </tr>`;
    }

    //создаем нужные нам переменные
    let headerCheckboxes = document.querySelectorAll('th input');
    let buttonReset = document.querySelector('.header__btn');
    let td = document.querySelectorAll('td');
    let th = document.querySelectorAll('th');

    //достаем запись из LocalStorage по ключу и создаем массив с id выключенных чекбоксов
    let getUnchecked = JSON.parse(localStorage.getItem('checkboxes'));

    //если такой массив существует скрываем столбцы с таким же data-name при перезагрузке страницы
    if (getUnchecked) {
        //если массив существует, то кнопка Reset должна быть активной
        buttonReset.disabled = false;

        getUnchecked.forEach(el => {
            document.getElementById(el).checked = false;
            let dataName = document.querySelectorAll(`[data-name = "${el}"]`);

            dataName.forEach(el => {
                el.style.display = 'none'
            })
        })
    }

    //создаем пустой массив с unchecked checkboxes
    let unchecked = [];

    headerCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('click', (e) => {
                //если отключили чекбокс, то записываем его в массив
                if (!checkbox.checked) {
                    unchecked.push(e.currentTarget.id);
                }

                if (!checkbox.checked || unchecked.length === 0 || getUnchecked > 0) {
                    buttonReset.disabled = false;
                }

                //закидываем массив с анчекнутыми чекбоксами в Local Storage
                localStorage.setItem('checkboxes', JSON.stringify(unchecked));

                //если в Local Storage уже существует массив с чекбоксами
                if (getUnchecked) {
                    getUnchecked.push(e.currentTarget.id);

                    localStorage.setItem('checkboxes', JSON.stringify(getUnchecked));
                }

                //скрываем столбцы, если чекбокс с таким жу id анчекнут
                td.forEach(td => {
                    if (e.target.id === td.dataset.name && !e.target.checked) {
                        td.style.display = 'none'
                    }
                })
                //то же самое делаем с названием столбца в шапке
                th.forEach(th => {
                    if (e.target.id === th.dataset.name && !e.target.checked) {
                        th.style.display = 'none'
                    }
                })

            })
        }
    )
    //при нажатии кнопки Reset делаем все чекбоксы активными, показываем все столбцы и очищаем Local Storage
    buttonReset.addEventListener('click', () => {
        td.forEach(el => {
            el.style.display = 'table-cell'
        });

        th.forEach(el => {
            el.style.display = 'table-cell'
        })

        headerCheckboxes.forEach(el => {
            el.checked = true;
        })
        //делаем кнопку неактивной
        buttonReset.disabled = true;
        //обнуляем массив id из Local Storage
        getUnchecked = [];
        //удаляем данные из Local Storage
        localStorage.removeItem('checkboxes')
    })
}


getColors();








