import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

export default class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Username:"",
      visible: false,
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  handleLOgout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("UserType");
    localStorage.removeItem("UserTypeID");
    localStorage.removeItem("PetOwnerID");
    localStorage.removeItem("Username");
    window.location.reload();
  }

  componentDidMount() {

    fetch('https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/user/?UserID='+localStorage.getItem('UserTypeID'))
    .then((response) => response.json())
    .then(LoggedUserDetailsList => {
        this.setState({Username : LoggedUserDetailsList[0].name });
        localStorage.setItem("Username",LoggedUserDetailsList[0].name )
    });
    
  }

  render() {
    const { Username } = this.state;
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={require("./../../../../images/avatars/0.jpg")}
            alt="User Avatar"
          />{" "}
          {localStorage.getItem('UserType') === "PetOwner" ?  <span className="d-none d-md-inline-block">{Username}</span> : <span className="d-none text-light d-md-inline-block">{Username}</span>}
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="/pet-owner-profile">
            <i className="material-icons">&#xE7FD;</i> Profile
          </DropdownItem>
          {/* <DropdownItem tag={Link} to="edit-user-profile">
            <i className="material-icons">&#xE8B8;</i> Edit Profile
          </DropdownItem>
          <DropdownItem tag={Link} to="file-manager-list">
            <i className="material-icons">&#xE2C7;</i> Files
          </DropdownItem>
          <DropdownItem tag={Link} to="transaction-history">
            <i className="material-icons">&#xE896;</i> Transactions
          </DropdownItem> */}
          {/* <DropdownItem divider /> */}
          <DropdownItem className="text-danger">
            <div onClick={this.handleLOgout}>
              <i className="material-icons text-danger">&#xE879;</i> Logout
            </div>
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
