import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import graphQLFetch from '../graphQLFetch.js';

class UserTable extends React.Component {
  render() {
    const userRows = this.props.users.map(user => <UserRow key={user._id} user={user} history={this.props.history}/>);
    return (
      <div id="userTable" class="overflow">
      <Link to={`/createUser`} className="btnLink">Create New User Account</Link>
        <table className="bordered-table">
            <thead>
                <tr>
                    <th>User Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Designation</th>
                    <th>Account Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {userRows}
            </tbody>
        </table>
        </div>
    )
}
}

class UserRow extends React.Component {
  constructor(){
    super();
    this.onDelete = this.onDelete.bind(this);
  }
  async onDelete(_id) {
    const query = `mutation deleteUser($_id: String!){
      deleteUser(_id: $_id)
    }`;
    console.log("id for deleting  " + _id)
    const { history } = this.props;
    let text = "Delete the user?";
    if (confirm(text) == true) {
      const data = await graphQLFetch(query, { _id: _id });
      setTimeout(() => history.go(0), 1000);
      alert('User Deleted');
    }
    // history.push({pathname: '/users',});
    // setTimeout(() => window.location.reload, 3000);
  }
  render() {
      const user = this.props.user;const linkStyles = {
        textDecoration: 'none',
        width: '100%',
        backgroundColor: '#000000',
        color: 'white',
        padding: '3px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
      return (
          <tr>
          <td>{user.userId}</td>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.designation}</td>
          <td>{user.userType.role}</td>
          <td><Link to={`/userEdit/${user._id}`} style={linkStyles}>Edit</Link>
          <a style={linkStyles} onClick={() => { this.onDelete(user._id); }}>Delete</a></td>
          </tr>
      )
  }
}

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    this.loadData();
  }
  loadData() {
      const query = `query {
        userList {
              _id
              userId
              password
              firstName
              lastName
              designation
              userType{role}
          }
      }`;
      async function UserData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        return response.json();
    }

      const result = UserData('/graphql', query)
          .then(result => {
              console.log(result.data.userList);
              this.setState({ users: result.data.userList });
              return result.data.userList;
          })
      
  }

  render() {
    return (
      <React.Fragment>
        
          <UserTable users={this.state.users} history={this.props.history}/>
          <hr />          
      </React.Fragment>
    );
  }
}
export default withRouter(UserList);