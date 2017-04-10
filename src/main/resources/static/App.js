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
			<br/>
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
			<div className="container">{todoes}</div>

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


			<article className="message is-info">
			  <div className="message-header">
			    <p><span className="icon is-small">
            	<i className="fa fa-calendar" aria-hidden="true"></i>
                </span>&nbsp;{this.props.todo.date}, {this.props.todo.task} </p>
			    <button className="delete" onClick={this.deleteTodo}></button>
			  </div>
				  <div className="message-body"> 
					 {this.props.todo.description}
					  <button className="button is-primary pull-right" onClick={this.deleteTodo}>Done</button><br/><br/>
				  </div>
			</article>
			
			
			
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
        		date: this.state.date, 
        		task: this.state.task,
        		description: this.state.description
        		};        
        this.props.addTodo(todo);        
    }
    
    render() {
        return (
                <div className="field">
	                <label className="label">Enter new task</label>
	                <p className="control has-icon">
	                
	                	<input type="date" placeholder="Date" name="date" className="input" onChange={this.handleChange} readonly />
			                <span className="icon is-small">
			                	<i className="fa fa-calendar" aria-hidden="true"></i>
			                </span>
	                </p>
	                
	                <p className="control has-icon">
		                <input type="text" placeholder="Task" className="input" name="task" onChange={this.handleChange} />
			                <span className="icon is-small">
			                	<i className="fa fa-tasks" aria-hidden="true"></i>
			                </span>
	                </p>
	                
	                <p className="control has-icon">
		                <input type="text" placeholder="Description" className="input" name="description" onChange={this.handleChange} />
			                <span className="icon is-small">
			                <i className="fa fa-file-text" aria-hidden="true"></i>
			                </span>
	                </p>
	                <br/><button className="button is-success pull-right" onClick={this.handleSubmit}>Add new Task!</button>
	                
                </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root') );