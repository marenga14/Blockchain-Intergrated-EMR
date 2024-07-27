import React, { Component } from "react";
import { Grid, Segment, Header, Image } from "semantic-ui-react";
import Layout from "../components/Layout";
import record from "../ethereum/record";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class RecordDetails extends Component {
  static async getInitialProps(props) {
    console.log("getInitialProps called..........");

    const addr = props.query.address;
    console.log("Address from query:", addr);

    const accounts = await web3.eth.getAccounts();
    console.log("Accounts:", accounts);

    var records, records2, appointment, profilePic;

    try {
      console.log("Fetching patient demographic records");
      records = await record.methods
        .searchPatientDemographic(addr)
        .call({ from: accounts[0] });
      console.log("Patient Demographic Records:", records);

      console.log("Fetching patient medical records");
      records2 = await record.methods
        .searchPatientMedical(addr)
        .call({ from: accounts[0] });
      console.log("Patient Medical Records:", records2);

      console.log("Fetching appointment records");
      appointment = await record.methods
        .searchAppointment(addr)
        .call({ from: accounts[0] });
      console.log("Appointment Records:", appointment);

      if (appointment[0].includes("0x00000000000")) appointment[0] = "";

      profilePic =
        records[3] === "Male"
          ? "https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
          : "https://cdn-icons-png.flaticon.com/512/3135/3135789.png";

      return {
        ic: records2.ic,
        name: records2.name,
        phone: records2.phone,
        gender: records2.gender,
        dob: records2.dob,
        height: records2.height,
        weight: records2.weight,

        houseaddr: records2.houseaddr,
        bloodgroup: records2.bloodgroup,
        allergies: records2.allergies,
        medication: records2.medication,
        emergencyName: records2.emergencyName,
        emergencyContact: records2.emergencyContact,

        doctoraddr: appointment[0],
        doctorname: appointment[1],
        date: appointment[2],
        time: appointment[3],
        diagnosis: appointment[4],
        prescription: appointment[5],
        description: appointment[6],
        status: appointment[7],
        profilePic,
      };
    } catch (err) {
      console.error("Error fetching records:", err);
      Router.pushRoute("/list");
      alert("You don't have permission to view this account");
      return {};
    }
  }

  renderDisplay() {
    console.log("props", this.props);
    return (
      <Grid columns={2} stackable className="fill-content">
        <Grid.Row>
          <Grid.Column width={1} />
          <Grid.Column width={5}>
            <Segment>
              <Image
                style={{ marginBottom: "25px" }}
                className="centered"
                src={this.props.profilePic}
                size="small"
                circular
              />
              <Segment>
                <h2 style={{ marginBottom: "25px" }}>{this.props.name}</h2>
                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column>
                      <b style={{ color: "grey" }}>IC</b>
                    </Grid.Column>
                    <Grid.Column>
                      <b>{this.props.ic}</b>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column>
                      <b style={{ color: "grey" }}>Phone</b>
                    </Grid.Column>
                    <Grid.Column>
                      <b>{this.props.phone}</b>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column>
                      <b style={{ color: "grey" }}>Gender</b>
                    </Grid.Column>
                    <Grid.Column>
                      <b>{this.props.gender}</b>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Segment>
            <Segment>
              <Header as="h3" color="grey" style={{ marginBottom: "25px" }}>
                EMERGENCY CONTACT
              </Header>
              <Grid columns={2} verticalAlign="top">
                <Grid.Row>
                  <Grid.Column>
                    <b style={{ color: "grey" }}>Name</b>
                    <div style={{ fontWeight: "bold" }}>
                      {this.props.emergencyName}
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <b style={{ color: "grey" }}>Phone</b>
                    <div style={{ fontWeight: "bold" }}>
                      {this.props.emergencyContact}
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
          <Grid.Column width={9}>
            <Segment>
              <Header as="h3" color="grey" style={{ marginBottom: "25px" }}>
                PERSONAL DETAILS
              </Header>
              <Grid columns={4} verticalAlign="top">
                <Grid.Row>
                  <Grid.Column>
                    <b style={{ color: "grey" }}>Full Name</b>
                    <div style={{ fontWeight: "bold" }}>{this.props.name}</div>
                  </Grid.Column>
                  <Grid.Column>
                    <b style={{ color: "grey" }}>Birthdate</b>
                    <div style={{ fontWeight: "bold" }}>{this.props.dob}</div>
                  </Grid.Column>
                  <Grid.Column>
                    <b style={{ color: "grey" }}>Height</b>
                    <div style={{ fontWeight: "bold" }}>
                      {this.props.height} cm
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <b style={{ color: "grey" }}>Weight</b>
                    <div style={{ fontWeight: "bold" }}>
                      {this.props.weight} kg
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={1}>
                <Grid.Row>
                  <Grid.Column>
                    <b style={{ color: "grey" }}>Address</b>
                    <div style={{ fontWeight: "bold" }}>
                      {this.props.houseaddr}
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Header
                as="h3"
                color="grey"
                style={{ marginTop: "35px", marginBottom: "25px" }}
              >
                MEDICAL DETAILS
              </Header>
              <Grid columns={2} verticalAlign="top">
                <Grid.Row>
                  <Grid.Column>
                    <b style={{ color: "grey" }}>Blood Group</b>
                    <div style={{ fontWeight: "bold" }}>
                      {this.props.bloodgroup}
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <b style={{ color: "grey" }}>Allergies</b>
                    <div style={{ fontWeight: "bold" }}>
                      {this.props.allergies}
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid>
                <Grid.Row>
                  <Grid.Column>
                    <b style={{ color: "grey" }}>Medications</b>
                    <div style={{ fontWeight: "bold" }}>
                      {this.props.medication}
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>

            <Segment>
              <Header as="h3" color="grey" style={{ marginBottom: "25px" }}>
                APPOINTMENT
              </Header>
              <Grid columns={1} verticalAlign="top">
                <Grid.Row>
                  <Grid.Column>
                    <b style={{ color: "grey" }}>Doctor Address</b>
                    <div style={{ fontWeight: "bold" }}>
                      {this.props.doctoraddr}
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <b style={{ color: "grey" }}>Doctor Name</b>
                    <div style={{ fontWeight: "bold" }}>
                      {this.props.doctorname}
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <b style={{ color: "grey" }}>Date</b>
                    <div style={{ fontWeight: "bold" }}>{this.props.date}</div>
                  </Grid.Column>
                  <Grid.Column>
                    <b style={{ color: "grey" }}>Time</b>
                    <div style={{ fontWeight: "bold" }}>{this.props.time}</div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <b style={{ color: "grey" }}>Prescription</b>
                    <div style={{ fontWeight: "bold" }}>
                      {this.props.prescription}
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <b style={{ color: "grey" }}>Description</b>
                    <div style={{ fontWeight: "bold" }}>
                      {this.props.description}
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column>
                    <b style={{ color: "grey" }}>Diagnosis</b>
                    <div style={{ fontWeight: "bold" }}>
                      {this.props.diagnosis}
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <b style={{ color: "grey" }}>Status</b>
                    <div style={{ fontWeight: "bold" }}>
                      {this.props.status}
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
          <Grid.Column width={1} />
        </Grid.Row>
      </Grid>
    );
  }

  render() {
    // const ethEnabled = async () => {
    //   if (window.ethereum) {
    //     try {
    //       await window.ethereum.request({ method: "eth_requestAccounts" });
    //       window.web3 = new Web3(window.ethereum);
    //       return true;
    //     } catch (error) {
    //       console.error("User denied account access");
    //     }
    //   } else if (window.web3) {
    //     window.web3 = new Web3(window.web3.currentProvider);
    //     return true;
    //   }
    //   return false;
    // };

    // try {
    //   ethEnabled();
    // } catch (error) {}
    return (
      <Layout>
        <div style={{ fontFamily: "Helvetica" }}>{this.renderDisplay()}</div>
      </Layout>
    );
  }
}

export default RecordDetails;
