const { v4: uuidv4 } = require('uuid');

function TodoList() {
    let todo = [];

    this.listEntries = function() {
        let desc = "TODO:\n";
        todo.forEach(e => desc += e + "\n");
        return desc;
    }

    this.getEntries = function() {
        return [...todo];
    }

    this.addItem = function(priority, desc) {
        if (priority < 1) {
            throw Error("priority must be positive");
        }

        const id = uuidv4();
        todo.push({"id": id, "priority": priority, "desc": desc});
        todo.sort( (a, b) => a.priority - b.priority );
    }

    this.removeItem = function(id) {
        todo = todo.reduce((prev, curr) => {
            if (curr.id != id) prev.push(curr);
            return prev;
        }, []);
    }

    this.getPriorities = function() {
        if (todo.length == 0) return [];

        const gaps = todo.reduce((acc, curr, index) => {
            let prev;
            if (index == 0)
                prev = {"id": null, priority: 0, desc: null};
            else
                prev = todo[index - 1];

            for (let i = prev.priority + 1; i < curr.priority; i++)
                acc.push(i);

            return acc;
        }, []);

        return gaps;
    }

}

module.exports = TodoList;