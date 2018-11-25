import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import TodoLists from './containers/todo-list';
import Login from './containers/login';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            error: null,
            isLoaded: false,
            todos: []
        };
        this.setToken = this.setToken.bind(this);
    }




    render() {

        if(!this.state.token){
            return (
                <div>
                    <Login setToken={this.setToken}/>
                </div>

            );
        }
        return (
            <div>
                <TodoLists token={this.state.token}/>
            </div>
        );
    }

    setToken(token){
        this.setState({token:token});
    }

}

export default App;
