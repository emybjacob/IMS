import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import graphQLFetch from '../graphQLFetch.js';

class UserTable extends React.Component {
  render() {
    const userRows = this.props.users.map(user => /*#__PURE__*/React.createElement(UserRow, {
      key: user._id,
      user: user,
      history: this.props.history
    }));
    return /*#__PURE__*/React.createElement("div", {
      id: "userTable",
      class: "overflow"
    }, /*#__PURE__*/React.createElement(Link, {
      to: `/createUser`,
      className: "btnLink"
    }, "Create New User Account"), /*#__PURE__*/React.createElement("table", {
      className: "bordered-table"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "User Id"), /*#__PURE__*/React.createElement("th", null, "First Name"), /*#__PURE__*/React.createElement("th", null, "Last Name"), /*#__PURE__*/React.createElement("th", null, "Designation"), /*#__PURE__*/React.createElement("th", null, "Account Role"), /*#__PURE__*/React.createElement("th", null, "Actions"))), /*#__PURE__*/React.createElement("tbody", null, userRows)));
  }

}

class UserRow extends React.Component {
  constructor() {
    super();
    this.onDelete = this.onDelete.bind(this);
  }

  async onDelete(_id) {
    const query = `mutation deleteUser($_id: String!){
      deleteUser(_id: $_id)
    }`;
    console.log("id for deleting  " + _id);
    const {
      history
    } = this.props;
    let text = "Delete the user?";

    if (confirm(text) == true) {
      const data = await graphQLFetch(query, {
        _id: _id
      });
      setTimeout(() => history.go(0), 1000);
      alert('User Deleted');
    } // history.push({pathname: '/users',});
    // setTimeout(() => window.location.reload, 3000);

  }

  render() {
    const user = this.props.user;
    const linkStyles = {
      textDecoration: 'none',
      width: '100%',
      backgroundColor: '#000000',
      color: 'white',
      padding: '3px 15px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    };
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, user.userId), /*#__PURE__*/React.createElement("td", null, user.firstName), /*#__PURE__*/React.createElement("td", null, user.lastName), /*#__PURE__*/React.createElement("td", null, user.designation), /*#__PURE__*/React.createElement("td", null, user.userType.role), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Link, {
      to: `/userEdit/${user._id}`,
      style: linkStyles
    }, "Edit"), /*#__PURE__*/React.createElement("a", {
      style: linkStyles,
      onClick: () => {
        this.onDelete(user._id);
      }
    }, "Delete")));
  }

}

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
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
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query
        })
      });
      return response.json();
    }

    const result = UserData('/graphql', query).then(result => {
      console.log(result.data.userList);
      this.setState({
        users: result.data.userList
      });
      return result.data.userList;
    });
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(UserTable, {
      users: this.state.users,
      history: this.props.history
    }), /*#__PURE__*/React.createElement("hr", null));
  }

}

export default withRouter(UserList);