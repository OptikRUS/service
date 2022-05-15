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
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";
import ProjectEdit from "./components/ProjectEdit";

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
            'project': [],
            'searched_projects': [],
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
                this.setState({
                    'users': response.data.results
                })
            })
            .catch(error => console.log(error))

        axios
            .get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                this.setState({
                    'projects': response.data.results,
                    'searched_projects': response.data.results
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

    deleteProject(id) {
        const headers = this.getHeaders()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}/`, {headers})
            .then(response => {
                this.setState({
                    projects: this.state.projects.filter((item) => item.id !== id)
                })
            })
            .catch(error => console.log(error))
    }

    deleteTodo(id) {
        const headers = this.getHeaders()
        axios.delete(`http://127.0.0.1:8000/api/todos/${id}/`, {headers})
            .then(response => {
                this.setState({todos: this.state.todos})
            })
            .catch(error => console.log(error))
    }

    createProject(name, repo, users) {
        const headers = this.getHeaders()
        const data = {name: name, repoUrl: repo, users: users}
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers})
            .then(response => {
                let newProject = response.data;
                this.setState({projects: [...this.state.projects, newProject]})
            })
            .catch(error => console.log(error))
    }

    editProject(id, name, repo, users) {
        const headers = this.getHeaders()
        const data = {name: name, repoUrl: repo, users: users}
        axios.put(`http://127.0.0.1:8000/api/projects/${id}/`, data, {headers})
            .then(response => {
                let newProject = response.data;
                this.setState({projects: [...this.state.projects, newProject]})
            })
            .catch(error => console.log(error))
    }

    createToDo(name, text, isActive, user, project) {
        const headers = this.getHeaders()
        const data = {name: name, text: text, isActive: isActive, user: user, project: project}
        axios.post(`http://127.0.0.1:8000/api/todos/`, data, {headers})
            .then(response => {
                let newTodo = response.data;
                this.setState({todos: [...this.state.todos, newTodo]})
            })
            .catch(error => console.log(error))
    }

    // searchProject(event) {
    //     const query = event.target.value
    //     let filteredProjects = this.state.projects.filter((project) => project.name.includes(query))
    //     let allProjects = this.state.projects
    //     if (query) {
    //         this.setState({searched_projects: filteredProjects})
    //     } else {
    //         this.setState({searched_projects: allProjects})
    //     }
    // }

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
                        <Route exact path='/projects/create/' component={() => <ProjectForm users={this.state.users}
                                                                                            createProject={(name, repo, users) => this.createProject(name, repo, users)}/>}/>
                        <Route exact path='/projects/edit/:id' component={() => <ProjectEdit users={this.state.users}
                                                                                             projects={this.state.searched_projects}
                                                                                             editProject={(id, name, repo, users) => this.editProject(id, name, repo, users)}/>}/>
                        <Route exact path='/projects'
                               component={() => <ProjectsList projects={this.state.searched_projects}
                                                              deleteProject={(id) => this.deleteProject(id)}/>}/>
                        <Route path='/projects/:id'>
                            <ProjectDetail items={this.state.projects}/>
                        </Route>
                        <Route exact path='/notes/create/'
                               component={() => <TodoForm users={this.state.users} projects={this.state.projects}
                                                          createTodo={(name, text, isActive, user, project) => this.createToDo(name, text, isActive, user, project)}/>}/>
                        <Route exact path='/notes' component={() => <ToDosList todos={this.state.todos}
                                                                               deleteTodo={(id) => this.deleteTodo(id)}/>}/>
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