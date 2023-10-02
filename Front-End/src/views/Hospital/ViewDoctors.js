/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  // Badge,
  Button
} from "shards-react";

import PageTitle from "../../components/common/PageTitle";
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavLink } from "shards-react";
import DoctorImage from '../../images/user-profile/01.jpg';
class ViewDoctors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Fourth list of posts.
      PostsListFour: []
    };
    //this.DeleteDoctor = this.DeleteDoctor.bind(this);
  }

  componentDidMount() {
    fetch('https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/doctor')
    .then((response) => response.json())
    .then(doctorsList => {
        this.setState({ PostsListFour: doctorsList });
    });
  }

  DeleteDoctor(DoctorID){

    let text;
    if (window.confirm("Do you realy want to delete the doctor") === true) {

      fetch('https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/doctor/' + DoctorID, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          alert('Doctor Removed');
          window.location.reload();
        })
        .catch(error => {
          console.error('Delete operation failed:', error);
        });

    } else {     
      alert('Doctor Saved');
    }

  }


  render() {
    const {
      PostsListFour
    } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Doctors" subtitle="Hospital" className="text-sm-left" />
        </Row>

        {/* Fourth Row of posts */}
        <Row>
          {PostsListFour.map((post, idx) => (
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
                        <div className="my-auto ml-auto">
                          <NavLink tag={RouteNavLink} to={`/update-doctor?doctorID=${post._id}`}>
                            <Button size="sm" theme="primary" className="mb-2">
                            <i className="far fa-bookmark mr-1" />
                            </Button>
                          </NavLink>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="mt-2 ml-auto">
                          {/* <Button size="sm" theme="danger" className="mb-2 mr-1">
                            <i className="far fa-trash-alt mr-1" onClick={() => this.DeleteDoctor(post._id)}/>Delete
                          </Button> */}
                          <Button size="sm" onClick={() => this.DeleteDoctor(post._id)} theme="dark" className="mr-1">
                                            X
                          </Button>
                        </div>
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

export default ViewDoctors;
