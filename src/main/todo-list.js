const { v4: uuidv4 } = require('uuid');

function TodoList() {
    let todo = [];

    this.listEntries = function() {
        let desc = "TODO:\n";
        todo.forEach(e => desc += JSON.stringify(e) + "\n");
        return desc;
    }

    this.getEntries = function() {
        return [...todo];
    }

    this.addItem = function(priority, desc) {
        if (priority === null || priority === undefined) throw new Error("priority is required");
        if (!Number.isInteger(priority)) throw new Error("priority must be numeric");
        if (!desc) throw new Error("description is required");
        if (priority < 1) {
            throw new Error("priority must be positive");
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

            if (curr.priority - prev.priority > 1)
                acc.push([prev.priority + 1, curr.priority - 1]);

            return acc;
        }, []);

        return gaps;
    }

    this.getPriorityDescription = function() {
        const priorities = this.getPriorities();
        const desc = priorities.reduce((acc, curr) => {
            if (curr[0] == curr[1]) acc.push(curr[0].toString());
            else acc.push(curr[0] + "-" + curr[1]);
            return acc;
        }, []);
        return desc;
    }

}

module.exports = TodoList;