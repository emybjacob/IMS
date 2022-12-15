import { withRouter } from 'react-router-dom';
import graphQLFetch from '../graphQLFetch.js';

class UserAdd extends React.Component {
  constructor() {
    super();
    this.state = {
      userTypes: [{
        _id: "",
        role: "Select Type"
      }]
    };
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const userTypeList = await graphQLFetch(`query{userTypeList{ _id role }}`);
    this.setState({
      userTypes: userTypeList.userTypeList
    });
  }

  async addUser(user) {
    const query = `
          mutation addUser($user: UserInputs!) {
              addUser(user: $user) {
                  userId
                  password
                  userType{role}
                  firstName
                  lastName
                  designation
              } 
          }`;
    const data = await graphQLFetch(query, {
      user
    });
    return data;
  }

  submit(e) {
    e.preventDefault();
    const form = document.forms.userAdd;
    const user = {
      userId: form.userId.value,
      password: form.password.value,
      userType: form.role.value,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      designation: form.designation.value
    };
    const response = this.addUser(user);
    console.log("response + _++++" + JSON.stringify(response));
    const {
      history
    } = this.props;
    history.push({
      pathname: '/users'
    });
  }

  render() {
    const fieldstyles = {
      width: '50%',
      padding: '12px 20px',
      margin: '8px 0',
      display: 'inline-block',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
      fontWeight: 'bolder'
    };
    const buttonStyles = {
      width: '50%',
      backgroundColor: '#000000',
      color: 'white',
      padding: '12px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    };
    const userTypes = this.state.userTypes;
    return /*#__PURE__*/React.createElement("form", {
      name: "userAdd",
      onSubmit: this.submit
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      class: "labelstyles",
      htmlFor: "userId"
    }, "User Id"), /*#__PURE__*/React.createElement("input", {
      class: "fieldstyles",
      type: "text",
      name: "userId",
      placeholder: "User Id",
      style: fieldstyles,
      required: true
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      class: "labelstyles",
      htmlFor: "password"
    }, "Password"), /*#__PURE__*/React.createElement("input", {
      class: "fieldstyles",
      type: "text",
      name: "password",
      placeholder: "Password",
      style: fieldstyles,
      required: true
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      class: "labelstyles",
      htmlFor: "firstName"
    }, "First Name"), /*#__PURE__*/React.createElement("input", {
      class: "fieldstyles",
      type: "text",
      name: "firstName",
      placeholder: "First Name",
      style: fieldstyles,
      required: true
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      class: "labelstyles",
      htmlFor: "lastName"
    }, "Last Name"), /*#__PURE__*/React.createElement("input", {
      class: "fieldstyles",
      type: "text",
      name: "lastName",
      placeholder: "Last Name",
      style: fieldstyles,
      required: true
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      class: "labelstyles",
      htmlFor: "designation"
    }, "Designation"), /*#__PURE__*/React.createElement("input", {
      class: "fieldstyles",
      type: "text",
      name: "designation",
      placeholder: "Designation",
      style: fieldstyles,
      required: true
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      class: "labelstyles",
      for: "role"
    }, "Role"), /*#__PURE__*/React.createElement("select", {
      class: "fieldstyles",
      name: "role",
      onChange: this.onChange,
      required: true
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Select User Role"), userTypes?.map(userType => /*#__PURE__*/React.createElement("option", {
      value: userType._id
    }, userType.role)))), /*#__PURE__*/React.createElement("button", {
      type: "submit",
      style: buttonStyles
    }, "Create User"));
  }

}

export default withRouter(UserAdd);