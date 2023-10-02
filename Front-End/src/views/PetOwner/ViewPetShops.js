import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  FormGroup,
  FormInput
} from "shards-react";
import PageTitle from "../../components/common/PageTitle";

class ViewPetShops extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Fourth list of posts.
      PostsListFour: [],
      searchQuery: ""
    };
  }

  componentDidMount() {
    fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/petshop")
      .then(response => response.json())
      .then(hospitalList => {
        this.setState({ PostsListFour: hospitalList });
      });
  }

  handleSearchQueryChange = e => {
    this.setState({ searchQuery: e.target.value });
  };

  render() {
    const { PostsListFour, searchQuery } = this.state;

    const filteredPostsList = PostsListFour.filter(post => {
      const searchRegex = new RegExp(searchQuery, "i");
      return (
        searchRegex.test(post.ShopName) ||
        searchRegex.test(post.Address) ||
        searchRegex.test(post.Email)
      );
    });

    const deleteHospital = ID => {
      fetch(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/pethospital/${ID}`, {
        method: "DELETE"
      })
        .then(() => alert("Successfully removed...!"))
        .then(() => window.location.reload());
    };

    const updateHospital = ID => {
      window.sessionStorage.setItem("PID", ID);
    };

    return (
      <Container
        fluid
        className="main-content-container px-4"
        style={{ height: "100vh", overflowY: "scroll" }}
      >
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Pet Shops"
            subtitle="Pet Owner"
            className="text-sm-left"
          />
        </Row>

        {/* Search Bar */}
        <Row>
          <Col>
            <Form>
              <FormGroup>
                <FormInput
                  type="text"
                  placeholder="Search by name, address, or Email"
                  value={searchQuery}
                  onChange={this.handleSearchQueryChange}
                />
              </FormGroup>
            </Form>
          </Col>
        </Row>

        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Pet Shop Details</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        Pet Shop Name
                      </th>
                      <th scope="col" className="border-0">
                        Address
                      </th>
                      <th scope="col" className="border-0">
                        Email
                      </th>
                      <th scope="col" className="border-0">
                        Telphone No
                      </th>
                      <th scope="col" className="border-0">
                        Mobile No
                      </th>
                      <th scope="col" className="border-0">
                        Open Time
                      </th>
                      <th scope="col" className="border-0">
                        Close Time
                      </th>
                      <th scope="col" className="border-0">
                        Location
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPostsList.length != 0 ? (
                      filteredPostsList.map((post, idx) => (
                        <tr key={idx}>
                          <td className="pl-4">{post.ShopName}</td>
                          <td>{post.Address}</td>
                          <td>{post.Email}</td>
                          <td>{post.Telephone}</td>
                          <td>{post.Mobile}</td>
                          <td>{post.OpenTime}</td>
                          <td>{post.CloseTime}</td>
                          <td>
                            <Row form>
                              <Col md="12" className="mb-3">
                                <Button
                                  href={post.GoogleLocation}
                                  theme="success"
                                  link
                                >
                                  View On Map
                                </Button>
                              </Col>
                            </Row>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>No Shops Found</td>
                      </tr>
                    )}
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

export default ViewPetShops;
