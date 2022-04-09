import React from "react";
import {useParams} from 'react-router-dom'


const ProjectDetail = ({items}) => {
    let {id} = useParams();
    let project = items.filter((item) => item.id === +id)[0];
    return (
        <div>
            <div className="container-fluid d-flex justify-content-center text-white rounded bg-dark">
                <div className="col-md-6 px-0">
                    <h1 className="display-4 fst-italic">Project: {project.name}</h1>
                    <p className="lead mb-0">Repo: <a href="#" className="text-white fw-bold">{project.repoUrl}</a></p>
                    <p className="lead mb-0">Created at: {project.createdAt}</p>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetail