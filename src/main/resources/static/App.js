class App extends React.Component {

	constructor(props) {
		super(props);
		this.deleteTodo = this.deleteTodo.bind(this);
		this.addTodo = this.addTodo.bind(this);
		this.state = {todoes: []};
	}

	componentDidMount() {

		this.fetchTodoes();
		
	}
	
	
	fetchTodoes() {
		
		fetch('http://localhost:8080/api/todoes', { credentials: 'same-origin' }) 
		.then((response) => response.json()) 
		.then((responseData) => {
			this.setState({todoes: responseData._embedded.todoes}); 
		}); 
		
	}
	
	deleteTodo(todo) {
		fetch(todo._links.self.href, { method: 'DELETE', credentials: 'same-origin'})
		.then(res => this.fetchTodoes())
		.catch( err => console.error(err))                
	} 
	
	
	addTodo(todo) {
		fetch('http://localhost:8080/api/todoes', { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(todo)})
		.then(res => this.fetchTodoes())
		.catch( err => console.error(err))
	}
	
	
	
	render() {
		return (
			<div>
			<TodoList todoes={this.state.todoes} deleteTodo={this.deleteTodo}/>
			<AddNewTodo addTodo={this.addTodo} /> 
			</div>
		)
	}
}

class TodoList extends React.Component{
	render() {
		var todoes = this.props.todoes.map(todo =>
			<Todo key={todo._links.self.href} todo={todo} deleteTodo={this.props.deleteTodo}/>
		);
		return (
			<table className="table table-striped">
				<tbody>
					<tr>
						<th>Date</th>
						<th>Task</th>
						<th>Description</th>
						<th></th>
					</tr>
					{todoes}
				</tbody>
			</table>
		)
	}
}

class Todo extends React.Component{
	
    constructor(props) {
        super(props);
        this.deleteTodo = this.deleteTodo.bind(this);
    }

    deleteTodo() {
        this.props.deleteTodo(this.props.todo);
    } 
	
	
	
	
	render() {
		return (
			<tr>
				<td>{this.props.todo.date}</td>
				<td>{this.props.todo.task}</td>
				<td>{this.props.todo.description}</td>
	            <td>
            		<button className="btn btn-success pull-right" onClick={this.deleteTodo}>Done</button>
				</td>
			</tr>
		)
	}
}

class AddNewTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        		author: '', 
        		title: '',
        		isbn: '',
        		year: ''
        		};                
        this.handleSubmit = this.handleSubmit.bind(this);   
        this.handleChange = this.handleChange.bind(this);     
    	}

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }    
    
    handleSubmit(event) {
        event.preventDefault();
        var todo = {
        		title: this.state.date, 
        		author: this.state.task,
        		isbn: this.state.description
        		};        
        this.props.addTodo(todo);        
    }
    
    render() {
        return (
        		
                <form className="form-group">                
                <fieldset>
                <legend>Enter new task</legend>               
                	<input type="date" placeholder="Date" name="date" className="form-control" onChange={this.handleChange} />    
	                <input type="text" placeholder="Task" className="form-control" name="task" onChange={this.handleChange} />
	                <input type="text" placeholder="Description" className="form-control" name="description" onChange={this.handleChange} />
	                <button className="btn btn-success pull-right" onClick={this.handleSubmit}>Add new Task!</button>                                      
                </fieldset>
                </form> 
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root') );