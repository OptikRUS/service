import React from "react";
import './App.css';

import axios from "axios";

import UsersList from "./components/UsersList";
import Menu from "./components/menu";
import Footer from "./components/footer";
import ProjectsList from "./components/ProjectsList";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
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
                <UsersList users={this.state.users}/>
                <ProjectsList projects={this.state.projects}/>
                <Footer/>
            </div>
        )
    }
}

export default App;