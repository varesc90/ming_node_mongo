import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            todos: []
        };
    }

    componentDidMount() {
        fetch(`http://localhost:3000/todos`,
            {
                method: 'GET',
                mode: "cors",
                headers: {
                    "x-auth":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmY5N2JlYTg3ZWFlNzAwMTAxMDk0NjMiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTQzMDc2ODQ2fQ.XmmFAUKkwWUlByEdrUzsPhgPS8Uo-mBzzZ50shj58DM"
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

    render() {
        const {error, isLoaded, todos} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {todos.map(todo => (
                        <li key={todo.id}>
                            {todo.text}
                        </li>
                    ))}
                </ul>
            );
        }
    }
}

export default App;
