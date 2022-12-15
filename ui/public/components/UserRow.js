// import { withRouter } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import graphQLFetch from '../graphQLFetch.js';

// class UserRow extends React.Component {
//   constructor(){
//     super();
//     this.onDelete = this.onDelete.bind(this);
//   }
//   async onDelete(_id) {
//     const query = `mutation deleteUser($_id: String!){
//       deleteUser(_id: $_id)
//     }`;
//     console.log("id for deleting  " + _id)
//     const { history } = this.props;
//     let text = "Delete the user?";
//     if (confirm(text) == true) {
//       const data = await graphQLFetch(query, { _id: _id });
//       alert('User Deleted');
//     }
//     // history.push({pathname: '/users',});
//     // setTimeout(() => window.location.reload, 3000);
//     setTimeout(() => history.push({pathname: '/users',}), 3000);
//   }
//   render() {
//       const user = this.props.user;const linkStyles = {
//         textDecoration: 'none',
//         width: '100%',
//         backgroundColor: '#000000',
//         color: 'white',
//         padding: '3px 15px',
//         border: 'none',
//         borderRadius: '4px',
//         cursor: 'pointer'
//     }
//       return (
//           <tr>
//           <td>{user.userId}</td>
//           <td>{user.userType.role}</td>
//           <td><Link to={`/userEdit/${user._id}`} style={linkStyles}>Edit</Link>
//           <a style={linkStyles} onClick={() => { this.onDelete(user._id); }}>Delete</a></td>
//           </tr>
//       )
//   }
// }

// export default withRouter(UserRow);