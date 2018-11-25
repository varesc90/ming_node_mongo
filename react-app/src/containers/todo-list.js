import React, {Component} from 'react';


class TodoLists extends Component {


    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            todos: []
        };
    }


    render() {
        return (
            <ul className="list-group col-sm-4">
                {this.renderList()}
            </ul>
        );
    }

    renderList(){
        if(this.props.token) {
            const {error, isLoaded, todos} = this.state;
            if (error) {
                return <div>Error: {error.message}</div>;
            } else if (!isLoaded) {
                return <div>Loading...</div>;
            } else {
                console.log(todos);
                return (
                    <ul>
                        {todos.map(todo => (
                            <li key={todo._id}>
                                {todo.text}
                            </li>
                        ))}
                    </ul>
                );
            }
        }else{
            return "Please login to see all todos";
        }
    }

    getTodo(){
        fetch(`http://localhost:3000/todos`,
            {
                method: 'GET',
                mode: "cors",
                headers: {
                    "x-auth":this.props.token
                }
            }
        )
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        todos: result.todos
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidMount() {
        if(this.props.token){
            this.getTodo();
        }
    }

}

export default TodoLists;