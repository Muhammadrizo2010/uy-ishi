const elForm = document.querySelector(".form");
const elInput = document.querySelector(".input");
const elList = document.querySelector(".list");
const clearBtn = document.querySelector(".btn-clear");
const elMode = document.querySelector(".mode")

let todos = JSON.parse(localStorage.getItem("data")) || [];
elForm.onsubmit = (evt) => {
    evt.preventDefault();
    todos.push(elInput.value);

    localStorage.setItem("data", JSON.stringify(todos));
    console.log(todos);

    render(todos, elList);

    elInput.value = "";
};

console.log(todos);
render(todos, elList);

function render(array, list) {
    list.innerHTML = "";

    array.forEach((el) => {
        list.innerHTML += `<li class="item">
    <span class="item-text">${el}</span>
    <button class="btn-edit" data-id="${el}">#</button>
    <button class="btn-delete" data-id="${el}">x</button>
    </li>`;
    });



    elList.onclick = (evt) => {
        if (evt.target.classList.contains("btn-delete")) {
            // console.log("x btn bosildi!!");
            console.log(evt.target.dataset.id);

            
            let filteredTodos = todos.filter((el) => el != evt.target.dataset.id);
            console.log(filteredTodos);
            
            localStorage.setItem("data", JSON.stringify(filteredTodos));
            todos = JSON.parse(localStorage.getItem("data"));
            render(filteredTodos, elList);
        };

        if (evt.target.classList.contains("btn-edit")) {
            console.log(evt.target.dataset.id);
            elInput.value = evt.target.dataset.id;

            let findedIndex = todos.findIndex((el) => el == evt.target.dataset.id);
            console.log(findedIndex);

            document.querySelector(".form-btn").innerHTML = "edit";

            elForm.onsubmit = (e) => {
                e.preventDefault();

                todos.splice(findedIndex, 1, elInput.value);

                localStorage.setItem("data", JSON.stringify(todos));
                todos = JSON.parse(localStorage.getItem("data"));

                render(todos, elList);
                console.log(todos);

                window.location.reload();
            };
        }
    }
}

clearBtn.onclick = () => {
    localStorage.removeItem(".data");
    todos = [];
    render(todos, elList);
};

 let mode = true;

elMode.onclick = () => {
    if (mode == false) {
        document.body.classList.remove("dark");
        localStorage.setItem("mode", "light");
        mode = true;
    } else {
        document.body.classList.add("dark");
        localStorage.setItem("mode", "dark");
        mode = false;
    }
};

document.body.classList.add(localStorage.getItem("mode"));

// elForm (evt.target.class);