var Backbone = require('backbone');
var c = require('../constants');
var Dispatcher = require('../dispatcher');


var Todo = Backbone.Model.extend({
    defaults: {
        text: "Default todo text",
        complete: false
    },
    toggleComplete: function() {
        this.set({ complete: !this.get('complete') });
    }
});


var TodoCollection = Backbone.Collection.extend({
    model: Todo,

    initialize: function() {
        this.dispatchId = Dispatcher.register(this.handleDispatchAction.bind(this));
    },

    handleDispatchAction: function(payload) {
        switch(payload.actionType) {
            case c.TODO_ADD:
                this.add({ text: payload.text });
                break;

            case c.TODO_TOGGLE:
                payload.todo.toggleComplete();
                break;

            case c.TODO_REMOVE:
                this.remove(payload.todo);
                break;
        }
    }
});

var TodoStore = new TodoCollection([
    {text: 'todo 1'},
    {text: 'todo 2'},
    {text: 'todo 3'}
]);

module.exports = TodoStore;
