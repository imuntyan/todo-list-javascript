const mocha = require('mocha');
const chai = require('chai');
const [expect] = [chai.expect];
const [describe, beforeEach, it] = [mocha.describe, mocha.beforeEach, mocha.it];

const TodoList = require('../main/todo-list');

describe('TodoList', () => {
   let todo;

   beforeEach(() => {
       todo = new TodoList();
   });

    it('should be able to add items', () =>{
        expect(todo.getEntries().length).to.be.eq(0);
        todo.addItem(5, 'Item 5');
        expect(todo.getEntries().length).to.be.eq(1);
    });
    it('should not be able to add items with priority < 1', () =>{
        expect(todo.getEntries().length).to.be.eq(0);
        expect(todo.addItem.bind(todo, 0, 'Item 0')).to.throw("priority must be positive");
        expect(todo.addItem.bind(todo, -1, 'Item -1')).to.throw("priority must be positive");
        expect(todo.addItem.bind(todo, -42, 'Item -42')).to.throw("priority must be positive");
    });

    it('should be able to remove items', () =>{
        expect(todo.getEntries().length).to.be.eq(0);
        todo.addItem(5, 'Item 5');
        const entries = todo.getEntries();
        expect(entries.length).to.be.eq(1);
        todo.removeItem(entries[0].id);
        expect(todo.getEntries().length).to.be.eq(0);
    });

    it('should calculate priorities properly', () =>{
        expect(todo.getEntries().length).to.be.eq(0);
        todo.addItem(2, 'Item 2');
        todo.addItem(3, 'Item 3');
        todo.addItem(5, 'Item 5');
        todo.addItem(7, 'Item 7');
        todo.addItem(12, 'Item 12');
        const priorities = todo.getPriorities();
        expect(priorities).to.be.deep.eq([1, 4, 6, 8, 9, 10, 11]);
    });

    it('should calculate priorities properly for empty list', () =>{
        expect(todo.getEntries().length).to.be.eq(0);
        const priorities = todo.getPriorities();
        expect(priorities).to.be.deep.eq([]);
    });

    it('should define non-existing item removal as a no-op', () =>{
        expect(todo.getEntries().length).to.be.eq(0);
        todo.removeItem("235467");
        expect(todo.getEntries().length).to.be.eq(0);
        todo.addItem(2, 'Item 2');
        expect(todo.getEntries().length).to.be.eq(1);
        todo.removeItem("235467");
        expect(todo.getEntries().length).to.be.eq(1);
    });

});