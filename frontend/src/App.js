import React from "react";
import './App.css';

import axios from "axios";

import UsersList from "./components/UsersList";
import Footer from "./components/footer";
import ProjectsList from "./components/ProjectsList";
import ToDosList from "./components/ToDosList";
import ProjectDetail from "./components/ProjectDetail";
import Head from "./components/head";
import {BrowserRouter, Link, Route} from 'react-router-dom'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': []
        }
    }

    componentDidMount() {
        axios
            .get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const data = response.data
                this.setState({
                    'users': data.results
                })
            })
            .catch(error => console.log(error))

        axios
            .get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                const data = response.data
                this.setState({
                    'projects': data.results
                })
            })
            .catch(error => console.log(error))

        axios
            .get('http://127.0.0.1:8000/api/todos/')
            .then(response => {
                const data = response.data
                this.setState({
                    'todos': data.results
                })
            })
            .catch(error => console.log(error))
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
                            </div>
                        </div>
                    </nav>
                    <Route exact path='/' component={() => <Head/>}/>
                    <Route exact path='/users' component={() => <UsersList users={this.state.users}/>}/>
                    <Route exact path='/projects' component={() => <ProjectsList projects={this.state.projects}/>}/>
                    <Route path='/projects/:id'>
                        <ProjectDetail items={this.state.projects}/>
                    </Route>
                    <Route exact path='/notes' component={() => <ToDosList todos={this.state.todos}/>}/>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
}

export default App;