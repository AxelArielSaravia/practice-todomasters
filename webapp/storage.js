const LocalStorage = {
    /**@type{() => Array<string> | undefined}*/
    get() {
        const stodos = localStorage.getItem("todos");
        if (stodos === null) {
            return;
        }
        let todos
        try {
            todos = JSON.parse(stodos);
        } catch {
            localStorage.removeItem("todos");
        }
        if (!Array.isArray(todos)) {
            return;
        }
        return todos;
    },
    /**@type{(items: Array<string>) => undefined}*/
    save(items) {
        localStorage.setItem("todos", JSON.stringify(items))
    }
};

export default LocalStorage;
