import React from "react";
import './App.css';

import axios from "axios";

import UsersList from "./components/UsersList";
import Menu from "./components/menu";
import Footer from "./components/footer";
import ProjectsList from "./components/ProjectsList";
import ToDosList from "./components/ToDosList";
import {BrowserRouter, Route} from 'react-router-dom'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [
                {
                    "name": "education",
                    "url": "http://www.becker-collins.com/tag/list/homepage/",
                    "createdAt": "1992-05-06T00:38:02Z",
                    "users": [
                        {
                            "username": "brandy98",
                            "firstName": "Ryan",
                            "lastName": "Cox",
                            "email": "copelandadam@example.com"
                        },
                        {
                            "username": "dawnmedina",
                            "firstName": "Christopher",
                            "lastName": "Mayo",
                            "email": "lmiller@example.org"
                        },
                        {
                            "username": "courtneywest",
                            "firstName": "Tina",
                            "lastName": "Guerrero",
                            "email": "nathanielochoa@example.com"
                        },
                        {
                            "username": "alyssa42",
                            "firstName": "Debra",
                            "lastName": "Washington",
                            "email": "briannahorn@example.com"
                        },
                        {
                            "username": "lrichards",
                            "firstName": "Amber",
                            "lastName": "Smith",
                            "email": "laurencalderon@example.org"
                        }
                    ],
                    "todoList": [
                        {
                            "url": "http://127.0.0.1:8000/api/todos/2178/",
                            "updateAt": "2022-03-06T11:54:39.981650Z",
                            "isActive": true
                        },
                        {
                            "url": "http://127.0.0.1:8000/api/todos/2328/",
                            "updateAt": "1981-07-29T11:56:59Z",
                            "isActive": true
                        },
                        {
                            "url": "http://127.0.0.1:8000/api/todos/2478/",
                            "updateAt": "2014-07-23T06:46:50Z",
                            "isActive": false
                        }
                    ]
                },
                {
                    "name": "character",
                    "url": "http://williams.com/about/",
                    "createdAt": "1980-12-31T04:21:46Z",
                    "users": [
                        {
                            "username": "yangbrett",
                            "firstName": "Candace",
                            "lastName": "Baker",
                            "email": "donnacoleman@example.org"
                        },
                        {
                            "username": "richard41",
                            "firstName": "Christopher",
                            "lastName": "Smith",
                            "email": "pierceveronica@example.org"
                        }
                    ],
                    "todoList": [
                        {
                            "url": "http://127.0.0.1:8000/api/todos/2179/",
                            "updateAt": "2007-03-01T00:54:36Z",
                            "isActive": false
                        },
                        {
                            "url": "http://127.0.0.1:8000/api/todos/2329/",
                            "updateAt": "1997-03-01T18:09:59Z",
                            "isActive": false
                        },
                        {
                            "url": "http://127.0.0.1:8000/api/todos/2479/",
                            "updateAt": "2003-08-31T23:24:57Z",
                            "isActive": true
                        }
                    ]
                },
                {
                    "name": "best",
                    "url": "https://www.king-morrow.com/categories/register/",
                    "createdAt": "2009-09-23T00:33:17Z",
                    "users": [
                        {
                            "username": "mbell",
                            "firstName": "Jimmy",
                            "lastName": "Perry",
                            "email": "dochoa@example.com"
                        },
                        {
                            "username": "gchaney",
                            "firstName": "Julia",
                            "lastName": "Duncan",
                            "email": "mguzman@example.net"
                        },
                        {
                            "username": "agarrett",
                            "firstName": "Joseph",
                            "lastName": "Williams",
                            "email": "mcculloughsean@example.org"
                        },
                        {
                            "username": "jeffreymiller",
                            "firstName": "Kelly",
                            "lastName": "Jones",
                            "email": "craignelson@example.com"
                        },
                        {
                            "username": "flynnkimberly",
                            "firstName": "Christina",
                            "lastName": "Davis",
                            "email": "tanderson@example.net"
                        }
                    ],
                    "todoList": [
                        {
                            "url": "http://127.0.0.1:8000/api/todos/2180/",
                            "updateAt": "1979-11-29T12:51:09Z",
                            "isActive": true
                        },
                        {
                            "url": "http://127.0.0.1:8000/api/todos/2330/",
                            "updateAt": "1998-06-04T04:42:37Z",
                            "isActive": false
                        },
                        {
                            "url": "http://127.0.0.1:8000/api/todos/2480/",
                            "updateAt": "1970-05-08T22:46:43Z",
                            "isActive": false
                        }
                    ]
                }
            ],
            'todos': [
                {
                    "url": "http://127.0.0.1:8000/api/todos/2178/",
                    "user": "Джанго Фреймворков",
                    "project": "education",
                    "name": "Davis PLC",
                    "text": "Performance wonder pick weight travel stock. Prepare move front follow.\r\nSection pull list father sound safe. Bed poor rise forget. Win will she add. Sense program college large late answer find.",
                    "createdAt": "2016-01-25T05:19:24Z",
                    "updateAt": "2022-03-06T11:54:39.981650Z",
                    "isActive": true
                },
                {
                    "url": "http://127.0.0.1:8000/api/todos/2179/",
                    "user": "Jenna Roth",
                    "project": "character",
                    "name": "Mclaughlin-Jimenez",
                    "text": "Ahead approach ready oil member something pick. Write more institution similar away factor. West it skin focus leg upon live.",
                    "createdAt": "2000-04-10T19:03:54Z",
                    "updateAt": "2007-03-01T00:54:36Z",
                    "isActive": false
                },
                {
                    "url": "http://127.0.0.1:8000/api/todos/2180/",
                    "user": "Jennifer Hardin",
                    "project": "best",
                    "name": "Parker-Carpenter",
                    "text": "Nor right head building floor field. Actually worker organization can. Artist meet religious.\nBed small method today. Short human camera live task.",
                    "createdAt": "2007-09-10T00:36:14Z",
                    "updateAt": "1979-11-29T12:51:09Z",
                    "isActive": true
                }
            ]
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
    }

    render() {
        return (
            <div className="App">
                <Menu/>
                {/*<UsersList users={this.state.users}/>*/}
                {/*<ProjectsList projects={this.state.projects}/>*/}
                {/*<ToDosList todos={this.state.todos}/>*/}
                <BrowserRouter>
                        <Route exact path='/' component={() => <UsersList users={this.state.users}/>}/>
                        <Route exact path='/projects' component={() => <ProjectsList projects={this.state.projects}/>}/>
                        <Route exact path='/notes' component={() => <ToDosList todos={this.state.todos}/>}/>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
}

export default App;