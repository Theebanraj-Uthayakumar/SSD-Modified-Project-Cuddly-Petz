import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Form,
  FormInput,
  FormGroup,
  // FormCheckbox,
  FormSelect,
  Button,
  CardBody
  // FormTextarea,
  // InputGroupText,
  // InputGroupAddon,
  // InputGroup
} from "shards-react";

import PageTitle from "../../components/common/PageTitle";
// import Colors from "../../components/components-overview/Colors";
// import Checkboxes from "../../components/components-overview/Checkboxes";
// import RadioButtons from "../../components/components-overview/RadioButtons";
// import ToggleButtons from "../../components/components-overview/ToggleButtons";
// import SmallButtons from "../../components/components-overview/SmallButtons";
// import SmallOutlineButtons from "../../components/components-overview/SmallOutlineButtons";
// import NormalButtons from "../../components/components-overview/NormalButtons";
// import NormalOutlineButtons from "../../components/components-overview/NormalOutlineButtons";
// import Forms from "../../components/components-overview/Forms";
// import FormValidation from "../../components/components-overview/FormValidation";
// import AddAppointmentForm from "../../components/components-overview/AddAppointmentForm";
// import Sliders from "../../components/components-overview/Sliders";
// import ProgressBars from "../../components/components-overview/ProgressBars";
// import ButtonGroups from "../../components/components-overview/ButtonGroups";
// import InputGroups from "../../components/components-overview/InputGroups";
// import SeamlessInputGroups from "../../components/components-overview/SeamlessInputGroups";
// import CustomFileUpload from "../../components/components-overview/CustomFileUpload";
// import DropdownInputGroups from "../../components/components-overview/DropdownInputGroups";
// import CustomSelect from "../../components/components-overview/CustomSelect";
// import { NavLink as RouteNavLink } from "react-router-dom";
// import { NavLink } from "shards-react";
class FormDropDown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Fourth list of posts.
      CategoryName: "",
      CategoryDescription: "",
      FormType: "",
      CategoryID: "",
      updateBtnStatus: false,
      CategoryDetails: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitCategoryDetails = this.submitCategoryDetails.bind(this);
    this.loadPetDetails = this.loadPetDetails.bind(this);
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

  submitCategoryDetails = event => {
    const { CategoryName, CategoryDescription, FormType } = this.state;

    // var today = new Date();
    // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    var categorydata = {
      CategoryName: CategoryName,
      CategoryDescription: CategoryDescription,
      FormType: FormType
    };

    if (CategoryName === "" || CategoryDescription === "" || FormType === "") {
      alert("Please fill all required fields");
    } else {
      fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(categorydata)
      })
        .then(response => response.json())
        .then(data => {
          alert("Successfully Category Added");
          window.location.reload();
        })
        .catch(error => {
          console.error("Error making appointment:", error);
        });
    }
  };

  updateCategoryDetails = event => {
    const {
      CategoryName,
      CategoryDescription,
      FormType,
      CategoryID
    } = this.state;

    var categorydata = {
      CategoryName: CategoryName,
      CategoryDescription: CategoryDescription,
      FormType: FormType
    };

    if (CategoryName === "" || CategoryDescription === "" || FormType === "") {
      alert("Please fill all required fields");
    } else {
      fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/category/" + CategoryID, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(categorydata)
      })
        .then(response => response.json())
        .then(data => {
          alert("Successfully Category Updated");
          window.location.reload();
        })
        .catch(error => {
          console.error("Error updating Category:", error);
        });
    }
  };

  componentDidMount() {
    fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/category")
      .then(response => response.json())
      .then(CategoryList => {
        this.setState({ CategoryDetails: CategoryList });
        //console.log(doctorList);
      });
  }

  loadPetDetails(PetOwnerID) {
    this.setState({ POID: PetOwnerID });
    fetch(
      'https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/pet/?where={"PetOwnerID":}' + PetOwnerID
    )
      .then(response => response.json())
      .then(categoryList => {
        this.setState({ PetDetails: categoryList });
        //console.log(categoryList);
      });
  }

  DeleteCategory(ServiceID) {
    fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/category/" + ServiceID, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        alert("Service Removed");
        window.location.reload();
      })
      .catch(error => {
        console.error("Delete operation failed:", error);
      });
  }

  UpdateCategory(ServiceID) {
    fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/category/" + ServiceID)
      .then(response => response.json())
      .then(categoryList => {
        this.setState({ CategoryName: categoryList.CategoryName });
        this.setState({
          CategoryDescription: categoryList.CategoryDescription
        });
        this.setState({ FormType: categoryList.FormType });
        this.setState({ CategoryID: categoryList._id });
        this.setState({ updateBtnStatus: true });
        //console.log(categoryList);
      });
  }

  render() {
    const {
      // CategoryName,
      // CategoryDescription,
      // FormType,
      CategoryDetails,
      updateBtnStatus
    } = this.state;
    return (
      <div>
        <Container fluid className="main-content-container px-4">
          <Row noGutters className="page-header py-4">
            <PageTitle
              sm="4"
              title="Add New Form Drop Down Items"
              subtitle="Admin"
              className="text-sm-left"
            />
          </Row>

          <Row className="mb-5">
            <Col lg="12" className="mb-4">
              <Card small>
                <CardHeader className="border-bottom">
                  <h6 className="m-0">Form Drop down</h6>
                </CardHeader>
                <ListGroup flush>
                  <ListGroupItem className="p-3">
                    <Row>
                      <Col>
                        <Form>
                          <Row form>
                            <Col md="12">
                              <FormGroup>
                                <label htmlFor="feInputTypeReason">
                                  Category Value
                                </label>
                                <FormInput
                                  id="CategoryName"
                                  value={this.state.CategoryName}
                                  onChange={this.handleChange}
                                  placeholder="Category Value"
                                  maxLength={35}
                                />
                              </FormGroup>
                            </Col>

                            <Col md="12">
                              <FormGroup>
                                <label htmlFor="feInputTypeReason">
                                  Category Description
                                </label>
                                <FormInput
                                  id="CategoryDescription"
                                  value={this.state.CategoryDescription}
                                  onChange={this.handleChange}
                                  placeholder="Category Name"
                                />
                              </FormGroup>
                            </Col>

                            <Col md="12" className="mb-3">
                              <label htmlFor="DSpecialty">
                                Form Applicable
                              </label>
                              <FormSelect
                                id="FormType"
                                value={this.state.FormType}
                                onChange={this.handleChange}
                              >
                                <option value="0">
                                  Choose Form Applicable
                                </option>
                                <option value="DR">Doctor Registration</option>
                                <option value="PS">
                                  Pet Store Item Registration
                                </option>
                              </FormSelect>
                            </Col>
                          </Row>
                          {!updateBtnStatus ? (
                            <Button
                              onClick={this.submitCategoryDetails}
                              id="AddBtn"
                            >
                              Add Category
                            </Button>
                          ) : (
                            <Button
                              onClick={this.updateCategoryDetails}
                              id="UpdateBtn"
                            >
                              Update Category
                            </Button>
                          )}
                        </Form>
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>

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
                          Categoty Name
                        </th>
                        <th scope="col" className="border-0">
                          Category Description
                        </th>
                        <th scope="col" className="border-0">
                          Form Type
                        </th>
                        <th scope="col" className="border-0 pl-5">
                          Action
                        </th>
                        <th scope="col" className="border-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {CategoryDetails.map((post, idx) => (
                        <tr key={post._id}>
                          <td>{post.CategoryName}</td>
                          <td>{post.CategoryDescription}</td>
                          {post.FormType === "DR" ? (
                            <td>Doctor Registration Form</td>
                          ) : (
                            <td>Pet Store Item Form</td>
                          )}
                          <td>
                            <Col md="4" className="mb-3">
                              <Button
                                theme="danger"
                                onClick={() => {
                                  this.DeleteCategory(post._id);
                                }}
                              >
                                Delete
                              </Button>
                            </Col>
                          </td>
                          <td>
                            <Col md="4" className="mb-3">
                              <Button
                                theme="primary"
                                onClick={() => {
                                  this.UpdateCategory(post._id);
                                }}
                              >
                                Update
                              </Button>
                            </Col>
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
      </div>
    );
  }
}

export default FormDropDown;
