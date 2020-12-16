const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const TodoList = require('./todo-list.js');

function TodoListCli() {

    function ask(question) {
        return new Promise(res => {
            readline.question(question, answer => {
                res(answer);
            })
        });
    }

    const C_LIST = ['list', 'l'];
    const C_EXIT = ['exit', 'quit', 'e', 'q'];
    const C_ADD = ['add', 'a'];
    const C_REMOVE = ['remove', 'r', 'delete', 'd'];
    const C_PRIORITIES = ['p', 'priorities'];

    const todo = new TodoList();

    async function doCommandPrompt() {

        const command = await ask('>> enter command: ');
        const vars = command.split(/[\s]+/).filter(v => v.length > 0);

        try {
            if (vars.length == 0) {
                doUnknown();
            }
            else {
                const cmd = vars[0];
                if (C_LIST.indexOf(cmd) != -1) {
                    const desc = todo.listEntries();
                    console.log(desc);
                }
                else if (C_EXIT.indexOf(cmd) != -1) {
                    process.exit(0);
                }
                else if (C_ADD.indexOf(cmd) != -1) {
                    const [priority, desc] = [Number.parseInt(vars[1]), vars[2]];
                    todo.addItem(priority, desc);
                }
                else if (C_REMOVE.indexOf(cmd) != -1) {
                    const id = vars[1];
                    todo.removeItem(id);
                }
                else if (C_PRIORITIES.indexOf(cmd) != -1) {
                    const pr = todo.getPriorityDescription();
                    console.log(JSON.stringify(pr));
                }
                else {
                    doUnknown();
                }
            }
        }
        catch (e) {
            console.error(e);
        }



        await doCommandPrompt();
    }

    function doUnknown() {
        console.log('Unknown command');
        doHelp();
    }

    function doHelp() {
        console.log('Available commands:')
        console.log('List items: ' + JSON.stringify(C_LIST));
        console.log('Add items: ' + JSON.stringify(C_ADD) + " <priority> <description>");
        console.log('Remove item: ' + JSON.stringify(C_REMOVE) + " <id>");
        console.log('List gaps in priorities: ' + JSON.stringify(C_PRIORITIES));
        console.log('Exit: ' + JSON.stringify(C_EXIT));
    }

    doCommandPrompt();

}

new TodoListCli();