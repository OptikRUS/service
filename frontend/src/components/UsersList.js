const UserItem = ({user}) => {

    return (
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
        </tr>
    )
}


const UsersList = ({users}) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead>
                <th>
                    Username
                </th>
                <th>
                    First name
                </th>
                <th>
                    Last name
                </th>
                {users.map((user) => <UserItem user={user}/>)}
                </thead>
            </table>
        </div>
    )
}

export default UsersList