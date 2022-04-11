import React from "react";
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
                <Button onClick={() => deleteProject(project.id)} type='button'>
                    Delete
                </Button>
            </td>
        </tr>
    )
}


const ProjectsList = ({projects, deleteProject}) => {
    return (
        <div>
            <div>
                <Link to='projects/create/'>Create new project</Link>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Repo URL</th>
                        <th>Created at</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {projects?.map((project) => <ProjectItem key={project.id} project={project}
                                                             deleteProject={deleteProject}/>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProjectsList