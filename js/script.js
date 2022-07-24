let elInput = elfind('.js-input');
let elList = elfind('.todos-list');

let localData = localStorage.getItem('todos');
let todos = localData ? JSON.parse(localData) : [];

let createTodoItem = (todo) => {
    let elLi = elCreate('li');
    let elCheckboxInput = elCreate('input');
    let elText = elCreate('p');
    let elDiv = elCreate('div');
    let elEditBtn = elCreate('button');
    let eldeleteBtn = elCreate('button');


    elLi.className = 'd-flex align-items-center py-2 px-2 border-bottom item'
    elCheckboxInput.className = 'form-check-input mt-0 me-2 checkbox'
    elCheckboxInput.type = 'checkbox';
    elCheckboxInput.checked = todo.isComplated;

    elText.textContent = todo.title;
    elText.className = 'm-0';
    if (todo.isComplated) {
        elText.classList.add('text-decoration-line-through');
        elText.classList.add('text-muted');
    }


    elDiv.className = 'div ms-auto';
    elEditBtn.className = 'btn btn-success edit';
    eldeleteBtn.className = 'btn btn-danger ms-1 delete';

    elEditBtn.textContent = 'edit';
    eldeleteBtn.textContent = 'delete';

    elDiv.appendChild(elEditBtn);
    elDiv.appendChild(eldeleteBtn);
    elLi.appendChild(elCheckboxInput);
    elLi.appendChild(elText);
    elLi.appendChild(elDiv);
    elLi.dataset.id = todo.id;
    elList.appendChild(elLi);
}


let renderElements = (array) => {
    elList.innerHTML = null;

    for (let i = 0; i < array.length; i++) {
        createTodoItem(array[i]);
    }
}


let handleAddTodo = (evt) => {
    if (evt.keyCode === 13) {

        var newTodo = {
            id: uuid.v4(),
            title: elInput.value,
            isComplated: false,
        }

        todos.unshift(newTodo);

        localStorage.setItem('todos', JSON.stringify(todos))
        renderElements(todos);
        elInput.value = null;
    }
}


let handleDeleteTodo = (item) => {
    let filtredArr = [];

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id !== item.dataset.id) {
            filtredArr.push(todos[i]);
        }
    }

    todos = filtredArr;
    localStorage.setItem('todos', JSON.stringify(filtredArr))
    renderElements(filtredArr);
};

let handleEditTodo = (foundTodoIndex) => {
    let editText = prompt('edit', todos[foundTodoIndex].title);
    todos[foundTodoIndex].title = editText;

    renderElements(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
}

let handleCheckedTodo = (evt, foundTodoIndex) => {
    todos[foundTodoIndex].isComplated = evt.target.checked;

    renderElements(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
}


elInput.addEventListener('keyup', handleAddTodo);

elList.addEventListener('click', (evt) => {
    let elItem = evt.target.closest('.item');
    let foundTodoIndex = todos.findIndex((element => element.id === elItem.dataset.id));
    if (evt.target.matches('.delete')) return handleDeleteTodo(elItem);
    if (evt.target.matches('.edit')) return handleEditTodo(foundTodoIndex);
    if (evt.target.matches('.checkbox')) return handleCheckedTodo(evt, foundTodoIndex);
});

renderElements(todos)