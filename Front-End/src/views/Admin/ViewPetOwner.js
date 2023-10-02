import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  FormInput
} from "shards-react";

import PageTitle from "../../components/common/PageTitle";

class ViewPetOwner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      PostsListFour: [],
      searchValue: ""
    };
  }

  componentDidMount() {
    fetch('https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/petowners')
    .then((response) => response.json())
    .then(petowners => {
        this.setState({ PostsListFour: petowners });
    });
  }

  handleSearch = event => {
    this.setState({ searchValue: event.target.value });
  };

  render() {
    const {
      PostsListFour,
      searchValue
    } = this.state;

    const filteredPostsList = PostsListFour.filter(post => {
      const searchRegex = new RegExp(searchValue, "i");
      return (
        searchRegex.test(post.OFirstName) ||
        searchRegex.test(post.Address) ||
        searchRegex.test(post.PhoneNumber)
      );
    });

    const deletePetOwner = (ID) =>{
      fetch(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/petowners/${ID}`, { method: 'DELETE' })
      .then(() => alert("Successfully removed...!"))
      .then(()=> window.location.reload());
    }

    return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Pet Owner"
          subtitle=""
          className="text-sm-left"
        />
      </Row>

      {/* Search Bar */}
      <Row>
          <Col md="6">
            <FormInput
              placeholder="Search by name, address, phone or email"
              value={searchValue}
              onChange={this.handleSearch}
            />
          </Col>
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
              <thead className="bg-light" style={{color: "blue"}}>

                  <tr>
                    <th scope="col" className="border-0">
                      #
                    </th>
                    <th scope="col" className="border-0">
                      First Name
                    </th>
                    <th scope="col" className="border-0">
                      Last Name
                    </th>
                    <th scope="col" className="border-0">
                      Address
                    </th>
                    <th scope="col" className="border-0">
                      Phone Number
                    </th>
                    <th scope="col" className="border-0">
                      Email
                    </th>
                    <th scope="col" className="border-0">
                      Occupation
                    </th>
                    <th scope="col" className="border-0">
                      Telephone
                    </th>
                    <th scope="col" className="border-0">
                      Emergency Contact
                    </th>
                    <th scope="col" className="border-0">
                      Action
                    </th>
                  </tr>
                </thead>
                {filteredPostsList.map((post, idx) => (
                <tbody key={idx}>
                  <tr>
                  <td>{idx + 1}</td>
                    <td>{post.OFirstName}</td>
                    <td>{post.OLastName}</td>
                    <td>{post.Address}</td>
                    <td>{post.PhoneNumber}</td>
                    <td>{post.EmailAddress}</td>
                    <td>{post.Occupation}</td>
                    <td>{post.TelephoneNo}</td>
                    <td>{post.EmergencyContact}</td>
                    {/* <td>{post.DFirstName}</td> */}
                    <td>
                    <Row form>
  <Col md="6" className="mb-3">
    <Button theme="danger" onClick={() => deletePetOwner(post._id)}>Delete</Button>
  </Col>
  <Col md="6" className="mb-3">
    <Button
      theme="primary"
      style={{ marginLeft: '12px' }} // Add margin to the left of the button
    >
      Edit
    </Button>
  </Col>
</Row>


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

export default ViewPetOwner;
