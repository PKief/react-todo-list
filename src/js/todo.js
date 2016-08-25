var Board = React.createClass({
    getInitialState: function () {
        return {
            todos: []
        };
    },

    eachTodo: function (item, i) {
        return React.createElement(Todo, {
            key: i,
            index: i,
            category: item["category"],
            title: item["text"],
            removeTodo: this.remove,
            updateTodo: this.update });
    },

    add: function (text, category) {
        if (text.trim() == '') {
            alert('You need to type in text!');
        } else {
            var arr = this.state.todos;
            arr.push({ text: text, category: category });
            this.setState({ comments: arr });
        }
    },

    remove: function (i) {
        var arr = this.state.todos;
        arr.splice(i, 1);
        this.setState({ todos: arr });
    },

    update: function (text, category, i) {
        var array = this.state.todos;
        array[i] = { text: text, category: category };
        this.setState({ todos: array });
    },

    render: function () {
        return React.createElement(
            "div",
            null,
            React.createElement(Input, { addTodo: this.add }),
            React.createElement(
                "div",
                { className: "todo-list" },
                this.state.todos.map(this.eachTodo)
            )
        );
    }
});

var Input = React.createClass({
    render: function () {
        return React.createElement(
            "div",
            { className: "ui action input" },
            React.createElement("input", { ref: "todoText", type: "text", placeholder: "Todo...", onKeyPress: this.handleKeyPress }),
            React.createElement(
                "select",
                { ref: "todoCategory", className: "ui compact selection dropdown" },
                React.createElement(
                    "option",
                    { value: "default" },
                    "Default"
                ),
                React.createElement(
                    "option",
                    { value: "important" },
                    "Important"
                ),
                React.createElement(
                    "option",
                    { value: "slight" },
                    "Slight"
                )
            ),
            React.createElement(
                "div",
                { type: "submit", className: "ui button", onClick: this.addTodoFunction },
                "Add todo"
            )
        );
    },
    addTodoFunction: function () {
        var categ = this.refs.todoCategory.options[this.refs.todoCategory.selectedIndex].value;
        this.props.addTodo(this.refs.todoText.value, categ);
        this.refs.todoText.value = '';
    },
    handleKeyPress: function (e) {
        if (e.key === 'Enter') {
            this.addTodoFunction();
        }
    }
});

var Todo = React.createClass({

    getInitialState: function () {
        return { editing: false };
    },

    removeTodo: function () {
        this.props.removeTodo(this.props.index);
    },

    edit: function () {
        this.setState({ editing: true });
    },

    save: function () {
        let title = this.refs.newTitle.value;
        let category = this.refs.newCategory.options[this.refs.newCategory.selectedIndex].value;
        this.props.updateTodo(title, category, this.props.index);
        this.setState({ editing: false });
    },

    renderNormal: function () {
        var classes = `todo ` + this.props.category + ' animated bounceInDown';
        return React.createElement(
            "div",
            { className: classes },
            React.createElement(
                "div",
                { className: "title" },
                this.props.title
            ),
            React.createElement(
                "div",
                { className: "category" },
                this.props.category
            ),
            React.createElement(
                "div",
                { className: "ui buttons" },
                React.createElement(
                    "button",
                    { className: "ui button", onClick: this.edit },
                    "Edit"
                ),
                React.createElement(
                    "button",
                    { className: "ui button done", onClick: this.removeTodo },
                    "Done!"
                )
            )
        );
    },

    renderForm: function () {
        var classes = `todo ` + this.props.category + ' animated bounceInDown';
        return React.createElement(
            "div",
            { className: classes },
            React.createElement(
                "div",
                { className: "ui input" },
                React.createElement("input", { type: "text", ref: "newTitle", defaultValue: this.props.title })
            ),
            React.createElement(
                "select",
                { ref: "newCategory", className: "ui compact selection dropdown" },
                React.createElement(
                    "option",
                    { value: "default" },
                    "Default"
                ),
                React.createElement(
                    "option",
                    { value: "important" },
                    "Important"
                ),
                React.createElement(
                    "option",
                    { value: "slight" },
                    "Slight"
                )
            ),
            React.createElement(
                "div",
                { className: "ui buttons" },
                React.createElement(
                    "button",
                    { className: "ui button", onClick: this.save },
                    "Save"
                )
            )
        );
    },

    render: function () {
        if (this.state.editing) {
            return this.renderForm();
        } else {
            return this.renderNormal();
        }
    }
});

ReactDOM.render(React.createElement(Board, null), document.getElementById('react-container'));