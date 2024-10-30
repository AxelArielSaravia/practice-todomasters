import observerMixin from "./mixin.js";

export const TodoList = {
    ...observerMixin,
    /**@type{Array<string>}*/
    items: [],
    /**@type{(item: string) => boolean}*/
    add(item) {
        if (TodoList.items.indexOf(item) === -1) {
            TodoList.items.push(item);
            return true;
        }
        return false;
    },
    /**@type{(item: string) => boolean}*/
    delete(item) {
        let i = TodoList.items.indexOf(item);
        if (i == -1) {
            return false;
        }
        TodoList.items.splice(i, 1);
        return true;
    },
    /**
     * @returns the index of the item
     * @type{(item: string) => number}*/
    find(item) {
        return TodoList.items.indexOf(item);
    }
};

export const Command = {
    ADD: "add",
    DELETE: "delete",
    UNDO: "undo",
    numOfCommands: 3,
    add() {
        const DOMTodoInput = globalThis.DOM.todoInput;
        const value = DOMTodoInput.value.trim();
        if (value === "") {
            return;
        }
        let ok = TodoList.add(value);
        if (!ok) {
            return;
        }
        DOMTodoInput.value = "";
        TodoList.notify("");
    },
    /**@type{(item: string) => undefined}*/
    delete(item) {
        let ok = TodoList.delete(item);
        if (ok) {
            TodoList.notify("");
        }
    },
    /**@type{(history: {pop: () => Array<string> | undefined}) => undefined}*/
    undo(history) {
        const prevList = history.pop();
        if (prevList) {
            TodoList.items = [...prevList];
            TodoList.notify("no-history");
        }
    }
};
