import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import PageTitle from "../../components/common/PageTitle";

class ViewUsers  extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      // Fourth list of posts.
      PostsListFour: []
    };
  }

  componentDidMount() {
    fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/user")
      .then(response => response.json())
      .then(userList => {
        this.setState({ PostsListFour: userList });
      });
  }

  render() {
    const { PostsListFour } = this.state;

    const deleteUser = ID => {
      if (window.confirm("Do you realy want to In-Active the user") === true) {

        fetch(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/user/${ID}`, {
          method: "DELETE"
        })
          .then(() => alert("Successfully removed...!"))
          .then(() => window.location.reload());
  
      } else {     
        alert('User Account Saved');
      }

    };

    const updateHospital = ID => {
      window.sessionStorage.setItem("PID", ID);
    };

    // const handleViewMap = ID => {
    //   e.preventDefault();
    //   window.open(locationURL, "_blank");
    // };

    return (
        <Container fluid className="main-content-container px-4">
          {/* Page Header */}
          <Row noGutters className="page-header py-4">
            <PageTitle sm="4" title="User Accounts" subtitle="User" className="text-sm-left" />
          </Row>

          {/* Default Light Table */}
          <Row>
            <Col>
              <Card small className="mb-4">
                <CardHeader className="border-bottom">
                  <h6 className="m-0">User Details</h6>
                </CardHeader>
                <CardBody className="p-0 pb-3">
                  <table className="table mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th scope="col" className="border-0">
                          #
                        </th>
                        <th scope="col" className="border-0">
                          User Name
                        </th>
                        <th scope="col" className="border-0">
                          Email
                        </th>
                        <th scope="col" className="border-0">
                          User Type
                        </th>
                        <th scope="col" className="border-0">
                          Status
                        </th>
                        <th scope="col" className="border-0">
                          Action
                        </th>
                      </tr>
                    </thead>                    
                    {PostsListFour.map((post, idx) => (
                    <tbody>
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{post.name}</td>
                        <td>{post.email}</td>
                        <td>{post.UserType}</td>
                        <td>             
                          <Button  theme="success">Active</Button>    
                        </td>
                        <td>           
                          <Button  theme="dark" onClick={() => deleteUser(post._id)}>In-Active</Button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                  </table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
    );
  }
}

export default ViewUsers;
