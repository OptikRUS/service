import React, {useState} from "react";
import {Link} from 'react-router-dom'
import {Button} from "react-bootstrap";

const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>
                <Link to={`projects/${project.id}`}>{project.name}</Link>
            </td>
            <td>
                <a href={project.repoUrl}>{project.repoUrl}</a>
            </td>
            <td>
                {project.createdAt}
            </td>
            <td>
                <Button className='btn-success'>
                    <Link className="text-white" to={`projects/edit/${project.id}`}>
                        Edit
                    </Link>
                </Button>
                <Button onClick={() => deleteProject(project.id)} type='button'>
                    Delete
                </Button>
            </td>
        </tr>
    )
}


const ProjectsList = ({projects, deleteProject}) => {
    const [filteredProjects, setProjects] = useState(projects)
    
    const searchProject = (event) => {
        const query = event.target.value
        if (query) {
            setProjects(projects.filter((project) => project.name.includes(query)))
        } else {
            setProjects(projects)
        }
    }
    return (
        <div>
            <form className="form-inline mt-2 mt-md-0">
                <input className="form-control mr-sm-2" onChange={(event) => searchProject(event)}
                       type="search" placeholder="Search project"/>
            </form>
            <div>
                <Button>
                    <Link className="text-white" to='projects/create/'>Create new project</Link>
                </Button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Repo URL</th>
                        <th>Created at</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredProjects?.map((project) => <ProjectItem key={project.id} project={project}
                                                             deleteProject={deleteProject}/>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProjectsList