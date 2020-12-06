const formAddTodo = document.querySelector('.form-add-todo');
const inputSearchTodo = document.querySelector('.form-search');
const todosContainer = document.querySelector('.todos-container');

const removeTodo = clickedElement => {
    const trashDataValue = clickedElement.dataset.trash;
    const todo = document.querySelector(`[data-todo="${trashDataValue}"]`);

    if (trashDataValue) {
        todo.remove();
    }
}

const addTodo = inputValue => {
    if (inputValue.length) {
        inputValue.trim();

        todosContainer.innerHTML +=
            `<li class="list-group-item d-flex justify-content-between align-items-center" data-todo="${inputValue}">
                <span>${inputValue}</span>
                <i class="far fa-trash-alt" data-trash="${inputValue}"></i>
            </li>`;
    }

    event.target.reset();
}

const filterTodos = (todos, inputValue, returnMachedTodos) => todos
    .filter(todo => {
        const machedTodos = todo.textContent.toLocaleLowerCase().includes(inputValue);
        return returnMachedTodos ? machedTodos : !machedTodos;
    })

const manipulateClasses = (todos, classToAdd, classToRemove) => {
    todos.forEach(todo => {
        todo.classList.add(classToAdd);
        todo.classList.remove(classToRemove);
    })
}

const hideTodos = (todos, inputValue) => {
    const todosToHide = filterTodos(todos, inputValue, false);
    manipulateClasses(todosToHide, 'hidden', 'd-flex')
}

const showTodos = (todos, inputValue) => {
    const todosToShow = filterTodos(todos, inputValue, true);
    manipulateClasses(todosToShow, 'd-flex', 'hidden');
}

formAddTodo.addEventListener('submit', event => {
    event.preventDefault();
    const inputValue = event.target.add.value;
    addTodo(inputValue);

});

todosContainer.addEventListener('click', event => {
    const clickedElement = event.target;
    removeTodo(clickedElement);

})

inputSearchTodo.addEventListener('input', event => {
    const inputValue = event.target.value.trim().toLowerCase();
    const todos = Array.from(todosContainer.children);
    showTodos(todos, inputValue)
    hideTodos(todos, inputValue)

})