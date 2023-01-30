showTodos();

		function showTodos() {
			let todos = localStorage.getItem('todos');
			if (todos == null) {
				todos_obj = [];
			} else {
				todos_obj = JSON.parse(todos);
			}
			localStorage.setItem('todos', JSON.stringify(todos_obj));
			let html = '';
			todos_obj.forEach(function (element, index) {
				html += `
      <li id="todo-${index}" class="todo">
        <div id="todo-text-container-${index}" class="todo-text-container">
          <input
            id="check-todo-btn-${index}"
            class="check-todo-btn"
            onclick="doneTodo(${index})"
            type="checkbox">
          <input
            id="todo-text-${index}"
            class="todo-text"
            readonly
            type="text"
            value="${element}">
        </div>
        <div
          id="btn-container-${index}"
          class="btn-container">
          <button
            id="delete-todo-btn-${index}"
            class="delete-todo-btn"
            onclick="deleteTodo(${index})">
            <i class="fal fa-trash fa-lg"></i>
          </button>
        <button
          id="edit-todo-btn-${index}"
          class="edit-todo-btn"
          onclick="editTodo(${index})">
          <i class="fal fa-edit fa-lg"></i>
        </button>
      </li>
    `
			});
			let todos_list_el = document.getElementById('todos-list');
			if (todos_obj.length != 0) {
				todos_list_el.innerHTML = html;
			} else {
				todos_list_el.innerHTML = "";
			}
		}

		const add_todo_btn = document.getElementById('add-todo-btn');
		add_todo_btn.addEventListener('click', function () {
			let todos = localStorage.getItem('todos');
			if (todos == null) {
				todos_obj = [];
			} else {
				todos_obj = JSON.parse(todos);
			}
			let input_todo_el = document.getElementById('input-todo');
			todos_obj.push(input_todo_el.value);
			localStorage.setItem('todos', JSON.stringify(todos_obj));
			input_todo_el.value = '';
			showTodos();
		});

		function editTodo(index) {
			let edit_todo_btn = document.getElementById(`edit-todo-btn-${index}`)
			const todo_text_el = document.getElementById(`todo-text-${index}`);
			todo_text_el.removeAttribute('readonly')
			todo_text_el.style.color = '#EB4764';
			const end_text = todo_text_el.value.length;
			todo_text_el.setSelectionRange(0, end_text);
			todo_text_el.focus();
			let btn_container_el = document.getElementById(`btn-container-${index}`);
			btn_container_el.removeChild(edit_todo_btn);
			let confirm_edit_btn = document.createElement('button');
			confirm_edit_btn.setAttribute('id', `confirm-edit-btn-${index}`);
			confirm_edit_btn.setAttribute('class', 'confirm-edit-btn');
			confirm_edit_btn.innerHTML = `
    <i class="fal fa-check-circle fa-lg"></i>
  `;
			btn_container_el.appendChild(confirm_edit_btn);
			confirm_edit_btn.addEventListener('click', function () {
				let todos = localStorage.getItem('todos');
				if (todos == null) {
					todos_obj = [];
				} else {
					todos_obj = JSON.parse(todos);
				}
				todos_obj[index] = todo_text_el.value;
				localStorage.setItem('todos', JSON.stringify(todos_obj));
				todo_text_el.setAttribute('readonly', '');
				btn_container_el.removeChild(confirm_edit_btn);
				btn_container_el.appendChild(edit_todo_btn);
				showTodos();
			});
		};

		function deleteTodo(index) {
			let todos = localStorage.getItem('todos');
			if (todos == null) {
				todos_obj = [];
			} else {
				todos_obj = JSON.parse(todos);
			}
			todos_obj.splice(index, 1);
			localStorage.setItem('todos', JSON.stringify(todos_obj))
			showTodos();
		};

		function doneTodo(index) {
			let check_todo_btn = document.getElementById(`check-todo-btn-${index}`)
			if (check_todo_btn.checked) {
				let current_todo = document.getElementById(`todo-text-${index}`);
				current_todo.setAttribute('disabled', '');
			} else {
				let current_todo = document.getElementById(`todo-text-${index}`);
				current_todo.removeAttribute('disabled');
			}
		}
