import React from 'react'

const ToDoItem = ({todo}) => {
    return (
        <tr>
            <td>
                {todo.name}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.updateAt}
            </td>
        </tr>
    )
}


const ToDosList = ({todos}) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Text</th>
                    <th>Last update</th>
                </tr>
                </thead>
                <tbody>
                {todos?.map((todo) => <ToDoItem key={todo.url} todo={todo}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default ToDosList
