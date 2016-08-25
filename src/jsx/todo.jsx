var Board = React.createClass({
    getInitialState: function () {
        return {
            todos: []
        }
    },

    eachTodo: function (item, i) {
        return (
            <Todo
                key={i}
                index={i}
                category={item["category"]}
                title={item["text"]}
                removeTodo={this.remove}
                updateTodo={this.update}>
            </Todo>
        );
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
        return (
            <div>
                <Input addTodo={this.add}/>
                <div className="todo-list">
                    {this.state.todos.map(this.eachTodo) }
                </div>
            </div>
        );
    }
});

var Input = React.createClass({
    render: function () {
        return (
            <div className="ui action input">
                <input ref="todoText" type="text" placeholder="Todo..." onKeyPress={this.handleKeyPress}/>
                <select ref="todoCategory" className="ui compact selection dropdown">
                    <option value="default">Default</option>
                    <option value="important">Important</option>
                    <option value="slight">Slight</option>
                </select>
                <div type="submit" className="ui button" onClick={this.addTodoFunction}>Add todo</div>
            </div>
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
        return { editing: false }
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
        return (
            <div className={classes}>
                <div className="title">{this.props.title}</div>
                <div className="category">{this.props.category}</div>
                <div className="ui buttons">
                    <button className="ui button"onClick={this.edit}>Edit</button>
                    <button className="ui button done"onClick={this.removeTodo}>Done!</button>
                </div>
            </div>
        );
    },

    renderForm: function () {
        var classes = `todo ` + this.props.category + ' animated bounceInDown';
        return (
            <div className={classes}>
                <div className="ui input">
                    <input type="text" ref="newTitle" defaultValue={this.props.title}/>
                </div>
                <select ref="newCategory" className="ui compact selection dropdown">
                    <option value="default">Default</option>
                    <option value="important">Important</option>
                    <option value="slight">Slight</option>
                </select>
                <div className="ui buttons">
                    <button className="ui button"onClick={this.save}>Save</button>
                </div>
            </div>
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

ReactDOM.render(<Board/>, document.getElementById('react-container'));