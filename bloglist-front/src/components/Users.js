import React from 'react';
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

const Users = ({ allUsers }) => {
  console.log('allUsers[0]', allUsers[0]);
  if (allUsers) {
    return (
      <div>
        <div>
          <p>Blogs created</p>
          {allUsers.map((user) => (
            <div key={user.id}>
              <Link to={`/users/${user.id}`}>{user.name}</Link> as{' '}
              {user.username} {user.blogs.length}
            </div>
          ))}
        </div>
      </div>
    );
  }
};

// const Users = ({ allUsers }) => {
//   console.log('allUsers[0]', allUsers[0])
//   if (allUsers) {
//     return (
//       <div>
//         <p>Blogs created</p>
//         <ul>
//           {allUsers.map((user) => (
//             <li key={user.id}>
//               {user.name} as {user.username} {user.blogs.length}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// };

export default Users;
