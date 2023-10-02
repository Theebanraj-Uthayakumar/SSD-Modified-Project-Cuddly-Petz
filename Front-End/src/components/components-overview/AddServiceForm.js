import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  Button
} from "shards-react";

class AddServiceForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Fourth list of posts.
      HID: localStorage.getItem('UserTypeID'),
      ServiceName: "",
      HospitalDetails: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitServiceDetails = this.submitServiceDetails.bind(this);
    // this.ConfirmOrder = this.ConfirmOrder.bind(this);
  }

  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.id;

    this.setState({
      [name]: value
    });
  };

  submitServiceDetails = event => {
    const { HID, ServiceName } = this.state;

    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    // var time =
    //   today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    var productdata = {
      HID: HID,
      ServiceName: ServiceName,
      PostedDate: date
    };

    fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/service", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productdata)
    })
      .then(response => response.json())
      .then(data => {
        alert("Successfully Service Added");
        window.location.reload();
      })
      .catch(error => {
        console.error("Error inserting product record:", error);
      });
  };

  componentDidMount() {
    fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/pethospital/")
      .then(response => response.json())
      .then(pethospitalList => {
        this.setState({ HospitalDetails: pethospitalList });
        //console.log(pethospitalList);
      });
  }

  render() {
    const { HospitalDetails } = this.state;

    return (
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form>
                <Row form>
                  <Col md="12" className="form-group">
                    <label htmlFor="Time">Service Name</label>
                    <FormInput
                      id="ServiceName"
                      type="text"
                      placeholder="Service Name"
                      value={this.state.ServiceName}
                      onChange={this.handleChange}
                    />
                  </Col>
                </Row>

                <Button onClick={this.submitServiceDetails}>
                  Add New Service
                </Button>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    );
  }
}

export default AddServiceForm;
