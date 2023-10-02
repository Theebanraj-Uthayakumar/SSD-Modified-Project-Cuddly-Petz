import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Button,
  Form,
  FormGroup,
  FormInput,
} from "shards-react";

import PageTitle from "../../components/common/PageTitle";

import DoctorImage from '../../images/user-profile/01.jpg';
class ViewOwnerDoctors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // List of doctors fetched from the API.
      doctorsList: [],
      // List of doctors to display after applying the filter.
      filteredDoctorsList: [],
      // The search query.
      searchQuery: "",
    };
  }

  componentDidMount() {
    fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/doctor")
      .then((response) => response.json())
      .then((doctorsList) => {
        this.setState({
          doctorsList: doctorsList,
          filteredDoctorsList: doctorsList,
        });
      });
  }

  handleSearchInputChange = (event) => {
    const searchQuery = event.target.value;

    const filteredDoctorsList = this.state.doctorsList.filter((doctor) => {
      const fullName = `${doctor.DFirstName} ${doctor.DLastName}`;
      const specialty = doctor.DSpecialty;

      return (
        fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    this.setState({
      filteredDoctorsList: filteredDoctorsList,
      searchQuery: searchQuery,
    });
  };

  render() {
    const { filteredDoctorsList, searchQuery } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Doctors" subtitle="Hospital" className="text-sm-left" />
        </Row>

        {/* Search Bar */}
        <Row>
          <Col lg="4" md="6" sm="12" className="mb-4">
              <CardBody>
                <Form>
                  <FormGroup>
                    <label htmlFor="searchDoctors">Search Doctors</label>
                    <FormInput
                      id="searchDoctors"
                      placeholder="Search by name or specialty"
                      value={searchQuery}
                      onChange={this.handleSearchInputChange}
                    />
                  </FormGroup>
                </Form>
              </CardBody>
          </Col>
        </Row>

        {/* Fourth Row of posts */}
        <Row>
        {filteredDoctorsList.map((post, idx) => (
            <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
              <Card small className="card-post h-100">
                <div
                  className="card-post__image"
                  style={{ backgroundImage: `url(${DoctorImage})` }}
                />
                <CardBody>
                  <h5 className="card-title">
                    <a className="text-fiord-blue" href="#">
                      {post.DFirstName} {post.DLastName}
                    </a>
                  </h5>
                  <h5 className="card-sub-title">
                    <a className="text-fiord-blue" href="#">
                      {post.DSpecialty}
                    </a>
                  </h5>
                  <p className="card-text">{post.DAbout}</p>
                </CardBody>
                <CardFooter className="text-muted border-top py-3">
                    <div className="row">
                      <div className="col-4">
                      </div>
                      <div className="col-4">
                        <div className="my-auto ml-auto">
                          <Button href="/make-appoinments-byUser" size="sm" theme="warning" className="mb-2">
                            Channel
                          </Button>
                        </div>
                      </div>
                      <div className="col-4">
                      </div>
                    </div>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default ViewOwnerDoctors;
