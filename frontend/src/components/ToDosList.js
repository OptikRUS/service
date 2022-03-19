import React from 'react'

const ToDoItem = ({todo}) => {
    return (
        <tr>
            <td>
                {todo.user}
            </td>
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
                    <th>User</th>
                    <th>Name</th>
                    <th>Text</th>
                    <th>Last update</th>
                </tr>
                </thead>
                <tbody>
                {todos?.map((todo) => <ToDoItem key={todo.id} todo={todo}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default ToDosList


// import React from 'react'
//
// const ToDoItem = ({item}) => {
//     return (
//         <tr>
//             <td>{item.user}</td>
//             <td>{item.name}</td>
//             <td>{item.text}</td>
//         </tr>)
// }
// const ToDosList = ({items}) => {
//     return (
//         <table>
//             <thead>
//             <tr>
//                 <th>Author</th>
//                 <th>Name</th>
//                 <th>Text</th>
//             </tr>
//             </thead>
//             <tbody>
//             {items?.map((item) => <ToDoItem item={item}/>)}
//             </tbody>
//         </table>
//     )
// }
// export default ToDosList