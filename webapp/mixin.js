const observerMixin = {
    /**@type{Array<function>}*/
    observers: [],
    /**@type{(obs: function) => undefined}*/
    addObservers(obs) {
        observerMixin.observers.push(obs);
    },
    /**@type{(obs: function) => undefined}*/
    removeObservers(obs) {
        var observers = observerMixin.observers;
        var i = observers.indexOf(obs);
        if (i === -1) {
            return;
        }
        observers.splice(i, 1);
    },
    /**@type{(cmd: string) => undefined}*/
    notify(cmd) {
        var observers = observerMixin.observers;
        for (let i = 0; i < observers.length; i += 1) {
            let obs = observers[i];
            obs(cmd);
        }
    }
};
export default observerMixin;
