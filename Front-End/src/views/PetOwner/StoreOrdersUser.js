import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  FormSelect
} from "shards-react";

import PageTitle from "../../components/common/PageTitle";

class StoreOrdersUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Fourth list of posts.
      PostsListOne: [],
      selectedMonth: ""
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    fetch(
      "https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/order/?POID=" +
        localStorage.getItem("UserTypeID")
    )
      .then(response => response.json())
      .then(orderList => {
        this.setState({ PostsListOne: orderList });
          //console.log(orderList);
    });
  }

  handleSelectChange(event) {
    this.setState({ selectedMonth: event.target.value });
  }

  handleSelectChange(event) {
    this.setState({ selectedMonth: event.target.value });
  }

  render() {
    const { PostsListOne, selectedMonth } = this.state;
    let filteredPosts = PostsListOne.filter(post => {
      if (!selectedMonth) {
        return true;
      }

      let postDate = new Date(post.OrderDate);
      let postMonth = postDate.getMonth() + 1; // Months are 0-indexed

      return postMonth === parseInt(selectedMonth);
    });
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Orders"
            subtitle="Store"
            className="text-sm-left"
          />
        </Row>

        {/* Select month */}
        <Row className="mb-3">
        <Col style={{ maxWidth: "200px" }}>
            <FormSelect value={selectedMonth} onChange={this.handleSelectChange} >
              <option value="">All Months</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </FormSelect>
          </Col>
        </Row>

        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Active Orders</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        #
                      </th>
                      <th scope="col" className="border-0">
                        Order ID
                      </th>
                      <th scope="col" className="border-0">
                        Order Date
                      </th>
                      <th scope="col" className="border-0">
                        Order Time
                      </th>
                      <th scope="col" className="border-0">
                        Amount
                      </th>
                      <th scope="col" className="border-0">
                        Order Method
                      </th>
                      <th scope="col" className="border-0">
                        Payment Method
                      </th>
                      <th scope="col" className="border-0">
                        Order Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                    (PostsListOne.length != 0) ? PostsListOne.map((post, idx) => (        
                      <tr key={post._id}>
                        <td>1</td>
                        <td>{post._id}</td>
                        <td>{post.OrderDate}</td>
                        <td>{post.OrderTime}</td>
                        <td>$ {post.TotalAmount}</td>
                        <td>
                          <Row form>
                            <Col md="12" className="mb-3">
                              {post.PickupMethod === "Pick-Up" ? (
                                <Button theme="warning">Pick-Up</Button>
                              ) : (
                                <Button theme="primary">Delivery</Button>
                              )}
                            </Col>
                          </Row>
                        </td>
                        <td>
                          <Row form>
                            <Col md="12" className="mb-3">
                              {post.PaymentMethod === "Cash" ? (
                                <Button theme="success">Cash</Button>
                              ) : (
                                <Button theme="info">Card</Button>
                              )}
                            </Col>
                          </Row>
                        </td>
                        <td>
                          <Row form>
                            <Col md="12" className="mb-3">
                              {post.OrderStatus === "Pending" ? (
                                <Button theme="dark">Preparing</Button>
                              ) : (
                                <Button theme="danger">Delivered</Button>
                              )}
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
                      <td>No Orders Found</td>
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
export default StoreOrdersUser;
