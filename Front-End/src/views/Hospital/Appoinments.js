import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import PageTitle from "../../components/common/PageTitle";
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavLink } from "shards-react";

class Appoinments extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      AppointmentDetails : []
    }
  }
  
  componentDidMount() {
    fetch('https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/appointment/?HID='+localStorage.getItem('UserTypeID'))
    .then((response) => response.json())
    .then(appointmentList => {
        this.setState({ AppointmentDetails: appointmentList });
        console.log(appointmentList);
    });
  }

  ChangePending(appID) {

    var productdata = {               
      "Status": "Completed"    
    };

    fetch('https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/appointment/'+appID, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productdata)
    })
    .then(response => response.json())
    .then(data => {
      alert('Appointment Completed');      
      window.location.reload();
    })
    .catch(error => {
      console.error('Error updating Doctor record:', error);
    });
  }

  ChangeCompleted(appID) {

    var productdata = {               
      "Status": "Pending"    
    };

    fetch('https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/appointment/'+appID, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productdata)
    })
    .then(response => response.json())
    .then(data => {
      alert('Appointment Pending');      
      window.location.reload();
    })
    .catch(error => {
      console.error('Error updating Doctor record:', error);
    });
  }

  render(){

  const { AppointmentDetails } = this.state;

  return (
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Appointment" subtitle="Hospital" className="text-sm-left" />
    </Row>

    {/* Default Light Table */}
    <Row>
      <Col>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Details</h6>
          </CardHeader>
          <CardBody className="p-0 pb-3">
            <table className="table mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    Appoinment ID
                  </th>
                  <th scope="col" className="border-0">
                    Pet Owner
                  </th>
                  <th scope="col" className="border-0">
                    Pet
                  </th>                  
                  <th scope="col" className="border-0">
                    Doctor
                  </th>
                  <th scope="col" className="border-0">
                    Reason
                  </th>
                  <th scope="col" className="border-0">
                    Fee
                  </th>
                  <th scope="col" className="border-0">
                    Room No
                  </th>
                  <th scope="col" className="border-0">
                    Date
                  </th>
                  <th scope="col" className="border-0">
                    Time
                  </th>
                  <th scope="col" className="border-0">
                    Note
                  </th>
                  <th scope="col" className="border-0">
                    File
                  </th>
                  <th scope="col" className="border-0">
                    Status
                  </th>
                  <th scope="col" className="border-0">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
              {(AppointmentDetails.length != 0) ? AppointmentDetails.map((post, idx) => (
                  <tr key={post._id}>
                    <td>{post._id}</td>
                    <td>{post.POID.OFirstName} {post.POID.OLastName}</td>
                    <td>{post.PID.PetName}</td>
                    <td>Dr. {post.DID.DFirstName} {post.DID.DLastName}</td>
                    <td>{post.TypeReason}</td>
                    <td>{post.Fee}.00</td>
                    <td>{post.RoomNo}</td>
                    <td>{post.Date}</td>
                    <td>{post.Time}</td>
                    <td>{post.Note}</td>
                    <td>
                          <Col md="12" className="mb-3">
                              <Button theme="warning" href={post.File}>View File</Button> 
                          </Col>
                    </td>
                    <td>            
                          <Col md="12" className="mb-3">
                              {post.Status === "Pending" ? <Button theme="success" onClick={() => this.ChangePending(post._id)}>Pending</Button> : <Button theme="dark" onClick={() => this.ChangeCompleted(post._id)}>Completed</Button>}         
                          </Col>
                    </td>
                    <td>
                      <Row form>              
                          <Col md="12">   
                            <NavLink tag={RouteNavLink} to={`/make-note-appointment?appID=${post._id}`}>
                              <Button theme="primary">Make a Note</Button>
                            </NavLink>
                          </Col>
                      </Row>          
                    </td>
                  </tr>
                    )) : 
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>No Appoinment Found</td>
                  </tr>}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
  )
  }
}
export default Appoinments;
