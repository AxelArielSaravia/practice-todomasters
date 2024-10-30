const TodoHistory = {
    history: [],
    /**@type{(state: Array<string>) => undefined}*/
    push(state) {
        if (Array.isArray(state)) {
            this.history.push([...state]);
        }
    },
    pop() {
        const history = TodoHistory.history;
        if (history.length > 1) {
            history.pop();
        }
        return history[history.length-1];
   },
};

export default TodoHistory;
