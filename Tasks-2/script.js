function addTodo() {
      const input = document.getElementById("todo-input");
      const taskText = input.value.trim();
      if (taskText === "") return;

      const li = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = taskText;
      span.onclick = () => li.classList.toggle("done");

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "x";
      deleteBtn.onclick = () => li.remove();

      li.appendChild(span);
      li.appendChild(deleteBtn);
      document.getElementById("todo-list").appendChild(li);

      input.value = "";
    }