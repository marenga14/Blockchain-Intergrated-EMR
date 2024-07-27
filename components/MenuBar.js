import React, { Component } from "react";
import { Menu, Icon, Dropdown } from "semantic-ui-react";
import web3 from "web3";
import { Link } from "../routes";
import { Router } from "../routes";

//Header that is used in all pages

export default class MenuBar extends Component {
  onClickedPatient = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    Router.pushRoute(`/record/${accounts[0]}`);
  };

  onClickedDoctor = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    Router.pushRoute(`/doctor/${accounts[0]}`);
  };

  render() {
    return (
      <Menu size="large" inverted>
        <Link route="/">Home</Link>

        <Menu.Menu position="right">
          <Link route="/dashboard">Dashboar</Link>

          <Link route="/list">Records List</Link>

          <Dropdown item text="Doctor">
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link route="/">View Profile</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link route="/edit-doctor">Edit Profile</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link route="/make-appointment">Make Appointment</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link route="/edit-appointment">Update Appointment</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown item text="Patient">
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link route="/">View Profile</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link route="/edit-patient">Edit Profile</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link route="/approve-doctor">Allow Access</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link route="/revoke-doctor">Revoke Access</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown item text="Register">
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link route="/register-patient">Patient</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link route="/register-doctor">Doctor</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }
}
