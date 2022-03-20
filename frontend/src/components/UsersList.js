import {Link} from "react-router-dom";
import React from "react";

const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                <Link to={`users/${user.uid}`}>{user.username}</Link>
            </td>
            <td>
                {user.firstName}
            </td>
            <td>
                {user.lastName}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}


const UsersList = ({users}) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => <UserItem user={user}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default UsersList