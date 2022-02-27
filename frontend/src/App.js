import React from "react";
import './App.css';

import axios from "axios";

import UsersList from "./components/UsersList";
import Menu from "./components/menu";
import Footer from "./components/footer";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        axios
            .get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data
                this.setState({
                    'users': users
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="container">
                <Menu/>
                <UsersList users={this.state.users}/>
                <Footer/>
            </div>
        )
    }
}

export default App;