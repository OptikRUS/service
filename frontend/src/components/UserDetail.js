import React from "react";
import {useParams} from 'react-router-dom'


const UserDetail = ({items}) => {
    let {uid} = useParams();
    let user = items.filter((item) => item.uid === uid)[0];
    return (
        <div className="container-fluid d-flex justify-content-center">
            <ul className="list-group mb-3">
                <h4>
                    <span className="text-primary">User: {user.username}</span>
                </h4>
                <li className="list-group-item">
                    <div>
                        <h6 className="my-0">First name:</h6>
                        <small className="text-muted">{user.firstName}</small>
                    </div>
                </li>
                <li className="list-group-item">
                    <div>
                        <h6 className="my-0">Last name:</h6>
                        <small className="text-muted">{user.lastName}</small>
                    </div>
                </li>
                <li className="list-group-item ">
                    <div>
                        <h6 className="my-0">Email:</h6>
                        <small className="text-muted">{user.email}</small>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default UserDetail