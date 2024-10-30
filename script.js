"use strict";
import {TodoList, Command} from "./webapp/classes.js";
import LocalStorage from "./webapp/storage.js";
import TodoHistory from "./webapp/momento.js";


if (globalThis == undefined) {
    globalThis = window;
}

const DOM = {
    todoList: undefined,
    addBtn: undefined,
    todoInput: undefined
};
globalThis.DOM = DOM;

const Template = {
    listItem: undefined,
};

{
    const DOMTemplate = document.createElement("template");
    DOMTemplate.innerHTML = `
        <li data-text="">
            <span class="text"></span>
            <button class="delete-btn" name="delete">Delete</button>
        </li>
    `;
    Template.listItem = DOMTemplate.content.firstElementChild;
}

const renderList = function () {
    DOM.todoList.innerHTML = "";
    for (let todo of TodoList.items) {
        const listItem = Template.listItem.cloneNode(true);
        listItem.firstElementChild.textContent = todo;
        listItem.dataset.text = todo;
        DOM.todoList.appendChild(listItem);
    }
}

document.addEventListener(
    "DOMContentLoaded",
    function () {
        //create references we will need later
        DOM.todoList = document.getElementById("todo-list");
        DOM.addBtn = document.getElementById("add-btn");
        DOM.todoInput = document.getElementById("todo-input");

        //Event Listeners
        DOM.addBtn.addEventListener(
            "click",
            Command.add,
            false
        );
        DOM.todoList.addEventListener(
            "click",
            function (event) {
                const target = event.target;
                console.log(target.name);
                if (target.name === "delete") {
                    const todo = target.parentElement.dataset.text;
                    Command.delete(todo);
                }
            },
            false
        );

        document.addEventListener(
            "keydown",
            function (event) {
                if (event.ctrlKey && event.key === "p") {
                    event.preventDefault();
                    Command.add();
                } else if (event.ctrlKey && event.key === "z") {
                    event.preventDefault();
                    Command.undo(TodoHistory);
                }
            },
            false
        )

        {
            let list = LocalStorage.get();
            if (list !== undefined) {
                TodoList.items = list;
            }
            TodoHistory.push(TodoList.items);
            renderList();
            console.info({Items: TodoList.items});
            console.info({History: TodoHistory.history});

            TodoList.addObservers(function (cmd) {
                if (cmd !== "no-storage") {
                    LocalStorage.save(TodoList.items);
                }
                if (cmd !== "no-history") {
                    TodoHistory.push(TodoList.items);
                }
                renderList();

                console.info({Items: TodoList.items});
                console.info({History: TodoHistory.history});
            });
        }
    },
    false
);
