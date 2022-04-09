import React from 'react';


class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            repo: '',
            user: '',
        }
    }

    handlerOnChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handlerOnSubmit(event) {
        this.props.createProject(this.state.name, this.state.repo, this.state.user);
        event.preventDefault();
    }

    render() {
        return (
            <div className='d-flex justify-content-center'>
                <form onSubmit={(event) => this.handlerOnSubmit(event)}>
                    <div className='form-group'>
                        <label htmlFor="name">Name</label>
                        <input type="text" className='form-control' name='name' value={this.state.name}
                               onChange={(event) => this.handlerOnChange(event)}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="repo">Repo URL</label>
                        <input type="text" className='form-control' name='repo' value={this.state.repo}
                               onChange={(event) => this.handlerOnChange(event)}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="user">Users</label>
                        <select name="user" className='form-control'
                                onChange={(event) => this.handlerOnChange(event)}>
                            {this.props.users.map((user) => <option key={user.uid} value={user.uid}>{user.username}</option>)}
                        </select>
                    </div>
                    <input type="submit" value="Create" className='btn-primary'/>
                </form>
            </div>
        );
    }
}

export default ProjectForm