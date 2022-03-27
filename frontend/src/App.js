import React from "react";
import './App.css';

import axios from "axios";

import UsersList from "./components/UsersList";
import Footer from "./components/footer";
import ProjectsList from "./components/ProjectsList";
import ToDosList from "./components/ToDosList";
import ProjectDetail from "./components/ProjectDetail";
import Head from "./components/head";
import UserDetail from "./components/UserDetail";
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import LoginForm from "./components/Auth";
import Cookies from "universal-cookie/lib";
import {Button} from "react-bootstrap";

const pageNotFound404 = ({location}) => {
    return (
        <h1>Page at '{location.pathname}' not found</h1>
    )
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': []
        }
    }

    logout() {
        this.setToken('');
    }

    getToken(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
            .then(response => {
                this.setToken(response.data['token'], username)
            }).catch(error => alert('Неверный логин или пароль'))
    }

    getTokenFromStorage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        const username = cookies.get('username')
        this.setState({'token': token, 'username': username}, () => this.loadData())
    }

    setToken(token, username) {
        const cookies = new Cookies()
        cookies.set('token', token)
        cookies.set('username', username)
        this.setState({token: token, username: username}, () => this.loadData())
    }

    loadData() {
        const headers = this.getHeaders()
        axios
            .get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                const data = response.data
                this.setState({
                    'users': response.data.results
                })
            })
            .catch(error => console.log(error))

        axios
            .get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                this.setState({
                    'projects': response.data.results
                })
            })
            .catch(error => console.log(error))

        axios
            .get('http://127.0.0.1:8000/api/todos/', {headers})
            .then(response => {
                this.setState({
                    'todos': response.data.results
                })
            })
            .catch(error => console.log(error))
    }

    getHeaders() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.isAuthenticated()) {
            headers['Authorization'] = `Token ${this.state.token}`
        }
        return headers
    }

    isAuthenticated() {
        return this.state.token !== '';
    }

    componentDidMount() {
        this.getTokenFromStorage();
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <nav className="navbar navbar-expand-md navbar-dark sticky-top bg-dark">
                        <div className="container-fluid">
                            <Link className="navbar-brand" to="/">GeekLibrary</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarCollapse" aria-controls="navbarCollapse"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarCollapse">
                                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/users">Users</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/projects">Projects</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/notes">Notes</Link>
                                    </li>
                                </ul>
                                {this.isAuthenticated() ?
                                    <Button onClick={() => this.logout()}
                                            onMouseOver={(event) => event.target.textContent = 'Logout'}
                                            onMouseOut={(event) => event.target.textContent = this.state.username}>{this.state.username}</Button> :
                                    <Link to="/login" className="btn btn-success">Login</Link>}
                            </div>
                        </div>
                    </nav>
                    <Switch>
                        <Route exact path='/' component={() => <Head/>}/>
                        <Route exact path='/users' component={() => <UsersList users={this.state.users}/>}/>
                        <Route path='/users/:uid'>
                            <UserDetail items={this.state.users}/>
                        </Route>
                        <Route exact path='/projects' component={() => <ProjectsList projects={this.state.projects}/>}/>
                        <Route path='/projects/:id'>
                            <ProjectDetail items={this.state.projects}/>
                        </Route>
                        <Route exact path='/notes' component={() => <ToDosList todos={this.state.todos}/>}/>
                        <Route exact path='/login' component={() => <LoginForm
                            getToken={(username, password) => this.getToken(username, password)}/>}/>
                        <Route component={pageNotFound404}/>
                    </Switch>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
}

export default App;