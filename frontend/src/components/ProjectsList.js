const ProjectItem = ({project}) => {
    let  userList = ''
    project.users.forEach((user) => {userList += user.username + '\n'})
    return (
        <tr>
            <td>
                {project.name}
            </td>
            <td>
                {userList}
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
                    <th>Users</th>
                    <th>Url</th>
                    <th>Create at</th>
                </tr>
                </thead>
                <tbody>
                {projects?.map((project) => <ProjectItem key={project.id} project={project}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default ProjectsList