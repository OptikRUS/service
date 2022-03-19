const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                {project.name}
            </td>
            <td>
                {project.url}
            </td>
            <td>
                {project.createdAt}
            </td>
        </tr>
    )
}


const ProjectsList = ({projects}) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Url</th>
                    <th>Data Created</th>
                </tr>
                </thead>
                <tbody>
                {projects?.map((project) => <ProjectItem key={project.url} project={project}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default ProjectsList