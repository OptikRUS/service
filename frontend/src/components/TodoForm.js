import React from 'react';
import {Button} from "react-bootstrap";


class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            text: '',
            isActive: 1,
            user: '',
            project: ''
        }
    }

    handlerOnChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handlerOnSubmit(event) {
        this.props.createTodo(this.state.name, this.state.text, this.state.isActive, this.state.user, this.state.project);
        event.preventDefault();
    }

    render() {
        return (
            <div className='d-flex justify-content-center'>
                <form onSubmit={(event) => this.handlerOnSubmit(event)}>
                    <div className='form-group'>
                        <label htmlFor="name">Name:</label>
                        <input type="text" className='form-control' name='name' value={this.state.name}
                               onChange={(event) => this.handlerOnChange(event)}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="text">Text:</label>
                        <textarea className='form-control' name='text' value={this.state.text}
                                  onChange={(event) => this.handlerOnChange(event)}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="user">User:</label>
                        <select name="user" className="form-control"
                                onChange={(event) => this.handlerOnChange(event)}> {this.props.users.map((user) =>
                            <option key={user.uid} value={user.url}>{user.username}</option>)}
                        </select>
                        <label htmlFor="project">Project:</label>
                        <select name="project" className="form-control"
                                onChange={(event) => this.handlerOnChange(event)}> {this.props.projects.map((project) =>
                            <option key={project.id} value={project.url}>{project.name}</option>)}
                        </select>
                    </div>
                    <Button type="submit" className='btn btn-primary'>Create</Button>
                </form>
            </div>
        );
    }
}

export default TodoForm