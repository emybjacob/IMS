import React from 'react';
import { withRouter } from 'react-router-dom';
import graphQLFetch from '../graphQLFetch.js';


class UserEdit extends React.Component {
    constructor() {
        super();
        this.state = { user: {}, userTypes:[{_id:"",role:"Select Type"}]};
        this.updateUser = this.updateUser.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }
    componentDidUpdate(prevProps) {
        const { match: { params: { id: prevId } } } = prevProps;
        const { match: { params: { id } } } = this.props;
        if (id !== prevId) {
            this.loadData();
        }
    } onChange(event) {
        const { name, value } = event.target;
        this.setState(prevState => ({
            user: { ...prevState.user, [name]: value },
        }));
    }

    async updateUser(event) {
        event.preventDefault();
        const { user } = this.state;
        const query = `mutation updateUser($user: UserInputs!){
            updateUser(user: $user)
        }`;
        user.userType=user.role;
        delete user['role'];
        const data = await graphQLFetch(query, { user });
        alert('User Updated');
            setTimeout(() => window.location.href = '#/users', 1000)
    }


    async loadData() {
        const query = `query getUser($id: String!){
      getUser(id: $id){
        _id
        userId
        password
        userType{_id role}
        firstName
        lastName
        designation
      }
    }`;
        const { match: { params: { id } } } = this.props;
        const vars = {};
        vars.id = id;
        const response = await graphQLFetch(query, vars);
        if (response) {
            const user = response.getUser;
            user.userId = user.userId ? user.userId.toString() : '';
            user.password = user.password ? user.password.toString() : '';
            user.userType = user.userType ? user.userType : {};
            user.firstName = user.firstName ? user.firstName.toString() : '';
            user.lastName = user.lastName ? user.lastName.toString() : '';
            user.designation = user.designation ? user.designation : {};
            this.setState({ user });
        } else {
            this.setState({ user: {} });
        }
        const userTypeList = await graphQLFetch(`query{userTypeList{ _id role }}`);
        this.setState({userTypes: userTypeList.userTypeList})
    }
render(){
    const { user: { _id } } = this.state;
    const { match: { params: { id: propsId } } } = this.props;
    if (_id == null) {
      if (propsId != null) {
        return <h3>{`User not found.`}</h3>;
      }
      return null;
    }
    const { user: { userId, password, userType, firstName, lastName, designation } } = this.state;
    const userTypes = this.state.userTypes;

    return(
        <form name="updateUser" onSubmit={this.updateUser}>

        <h3>{`Editing User: ${userId}`}</h3>
        
      <div>
      <label class="labelstyles" for="userId">User Id</label>
      <input class="fieldstyles" type="text" name="userId" value={userId} onChange={this.onChange} placeholder="User Id" readOnly />
      </div>
      <div>
      <label class="labelstyles" for="password">Password</label>
      <input class="fieldstyles" type="text" name="password" value={password} onChange={this.onChange} placeholder="Password" required />
      </div>
      <div>
      <label class="labelstyles" for="firstName">First Name</label>
      <input class="fieldstyles" type="text" name="firstName" value={firstName} onChange={this.onChange} placeholder="User Id" readOnly />
      </div>
      <div>
      <label class="labelstyles" for="lastName">Last Name</label>
      <input class="fieldstyles" type="text" name="lastName" value={lastName} onChange={this.onChange} placeholder="Password" required />
      </div>
      <div>
      <label class="labelstyles" for="designation">Designation</label>
      <input class="fieldstyles" type="text" name="designation" value={designation} onChange={this.onChange} placeholder="Password" required />
      </div>
      
      <div>
      <label class="labelstyles" for="role">Role</label>
      <select class="fieldstyles" name="role" defaultValue={userType._id} onChange={this.onChange} required>
      <option selected hidden>{userType.role}</option>
      {userTypes?.map((userType) => (
              <option value={userType._id}>{userType.role}</option>
            ))}
      </select>
      </div>
      
      <button type="submit" class="btn">Update User</button>
  </form>
    )
}
}

export default withRouter(UserEdit);