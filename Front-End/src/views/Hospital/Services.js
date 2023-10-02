import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import PageTitle from "../../components/common/PageTitle";

class servicesCmp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Fourth list of posts.
      PostsListFour: []
    };
    //this.DeleteService = this.DeleteService.bind(this);
  }

  componentDidMount() {
    fetch('https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/service?HID='+localStorage.getItem('UserTypeID'))
    .then((response) => response.json())
    .then(serviceList => {
        this.setState({ PostsListFour: serviceList });
    });
  }
  // fetch(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/service?where=${JSON.stringify({ HID: '644662ef42bb21884c60c6ba' })}`)
  // .then(response => response.json())
  // .then(data => console.log(data))
  // .catch(error => console.error(error));
  DeleteService(ServiceID){

    fetch('https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/service/' + ServiceID, {
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
        alert('Service Removed');
        window.location.reload();
      })
      .catch(error => {
        console.error('Delete operation failed:', error);
      });

  }


  render() {
    const {
      PostsListFour
    } = this.state;

    return (
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Services" subtitle="Hospital" className="text-sm-left" />
    </Row>

    {/* Default Light Table */}
    <Row>
      <Col>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h4 className="m-0">Hospital Services</h4>
          </CardHeader>
          <CardBody className="p-0 pb-3">
            <table className="table mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    #
                  </th>
                  <th scope="col" className="border-0">
                    Service Name
                  </th>
                  <th scope="col" className="border-0">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {PostsListFour.map((post, idx) => (
                  <tr>
                    <td>{idx+1}</td>
                    <td>{post.ServiceName}</td>
                    <td>
                      <Row form>              
                          <Col md="4" className="mb-3">   
                              <Button theme="danger" onClick={()=>{this.DeleteService(post._id)}}>Delete</Button>
                          </Col>  
                      </Row>          
                    </td>
                  </tr>
                ))}
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

export default servicesCmp;
