import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button
} from "shards-react";
import PageTitle from "../../components/common/PageTitle";

class OwnerAppoinments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      AppointmentDetails: [],
      DoctorDetails: {},
      PetDetailsDetails: {}
    };
  }

  componentDidMount() {
    fetch(
      "https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/appointment/?POID="+localStorage.getItem("UserTypeID")
    )
      .then(response => response.json())
      .then(appointmentList => {
        this.setState({ AppointmentDetails: appointmentList });
        console.log(appointmentList);
      });
  }

  getDoctorDetails(DoctorID) {}

  render() {
    const { AppointmentDetails } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="My Appointments"
            subtitle="Pet owner"
            className="text-sm-left"
          />
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
                      <th className="border-0">Appoinment ID</th>
                      <th className="border-0">Pet</th>
                      <th className="border-0">Doctor</th>
                      <th className="border-0">Pet Hospital</th>
                      <th className="border-0">Reason</th>
                      <th className="border-0">Fee</th>
                      <th className="border-0">Room No</th>
                      <th className="border-0">Date</th>
                      <th className="border-0">Time</th>
                      <th className="border-0">Note</th>
                      <th className="border-0">File</th>
                      <th className="border-0">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(AppointmentDetails.length != 0) ? AppointmentDetails.map((post, idx) => (
                      <tr key={post._id}>
                        <td>{post._id}</td>
                        <td>{post.PID.PetName}</td>
                        <td>{post.DID.DFirstName}</td>
                        <td>{post.HID.HName}</td>
                        <td>{post.TypeReason}</td>
                        <td>{post.Fee}.00</td>
                        <td>{post.RoomNo}</td>
                        <td>{post.Date}</td>
                        <td>{post.Time}</td>
                        <td>{post.Note}</td>
                        <td>
                          <Button theme="warning" href={post.File}>
                            View File
                          </Button>
                        </td>
                        <td>
                          <Col md="12" className="mb-3">
                            {post.Status === "Pending" ? (
                              <Button theme="success">Pending</Button>
                            ) : (
                              <Button theme="dark">Completed</Button>
                            )}
                          </Col>
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
    );
  }
}

export default OwnerAppoinments;
