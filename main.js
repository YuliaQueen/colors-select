async function getColors() {
    let response = await fetch("https://reqres.in/api/unknown?per_page=12");
    let content = await response.json();
    let colors = content.data;
    let tbody = document.querySelector('.table__body');

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

    let headerCheckboxes = document.querySelectorAll('th input');
    let buttonReset = document.querySelector('.header__btn');
    let td = document.querySelectorAll('td');
    let th = document.querySelectorAll('th');

    headerCheckboxes.forEach(head => {
        head.addEventListener('click', (e) => {


            td.forEach(td => {
                if (e.target.id === td.dataset.name && !e.target.checked) {
                    td.style.display = 'none'
                }
            })

            th.forEach(th => {
                if (e.target.id === th.dataset.name && !e.target.checked) {
                    th.style.display = 'none'
                }
            })

        })
    })

    buttonReset.addEventListener('click', () => {
        td.forEach(el => {
            el.style.display = 'table-cell'
        });

        th.forEach(el => {
            el.style.display = 'table-cell'
        })
    })
}


getColors();








