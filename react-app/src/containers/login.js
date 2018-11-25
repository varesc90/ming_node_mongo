import React, {Component} from 'react';


class Login extends Component{
    render() {
        return this.renderLogin();
    }

    renderLogin(){
        return (
        <div className="input-group col-sm-4">
            <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
            <input type="password" className="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" />
            <button onClick={()=>this.login()}>Login</button>
        </div>
        )
    }

    login(){
        alert('hey');
        fetch(`http://localhost:3000/users/login`,
            {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email":"vares.example@gmail.com",
                    "password":"asdf1234"
                })
            }
        )
            .then(res => this.props.setToken(res.headers.get('x-auth')));
    }

}

export default Login;