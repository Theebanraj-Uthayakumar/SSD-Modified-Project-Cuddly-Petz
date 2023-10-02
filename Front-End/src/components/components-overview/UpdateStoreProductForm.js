import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  // FormCheckbox,
  FormSelect,
  Button,
  FormTextarea,
  InputGroupText,
  InputGroupAddon,
  InputGroup
} from "shards-react";

// import { withRouter  } from 'react-router-dom';
class UpdateStoreProductForm extends React.Component {
  constructor(props) {
    super(props);

    this.params = new URLSearchParams(window.location.search);
    this.state = {
      // Fourth list of posts.
      ProductName: "",
      ProductDescription: "",
      ProductCategory: "",
      ProductImage: "",
      Price: "",
      Manufacturer: "",
      Stock: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitUpdateProductDetails = this.submitUpdateProductDetails.bind(
      this
    );
    // this.ConfirmOrder = this.ConfirmOrder.bind(this);
  }

  componentDidMount() {
    fetch(
      "https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/product/" + this.params.get("productID")
    )
      .then(response => response.json())
      .then(productDetails => {
        this.setState({ ProductName: productDetails.ProductName });
        this.setState({
          ProductDescription: productDetails.ProductDescription
        });
        this.setState({ ProductCategory: productDetails.ProductCategory });
        this.setState({ ProductImage: productDetails.ProductImage });
        this.setState({ Price: productDetails.Price });
        this.setState({ Manufacturer: productDetails.Manufacturer });
        this.setState({ Stock: productDetails.Stock });
      });
  }

  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.id;

    this.setState({
      [name]: value
    });
  };

  submitUpdateProductDetails = event => {
    const {
      // ProductID,
      ProductName,
      ProductDescription,
      ProductCategory,
      ProductImage,
      Price,
      Manufacturer,
      Stock
    } = this.state;

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
      ProductName: ProductName,
      ProductDescription: ProductDescription,
      ProductCategory: ProductCategory,
      ProductImage: ProductImage,
      Price: Price,
      Manufacturer: Manufacturer,
      Stock: Stock,
      PostedDate: date
    };

    fetch(
      "https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/product/" + this.params.get("productID"),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productdata)
      }
    )
      .then(response => response.json())
      .then(data => {
        alert("Successfully Product Updated");
      })
      .catch(error => {
        console.error("Error updating product record:", error);
      });
  };

  render() {
    return (
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form>
                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="ProductName">Product Name</label>
                    <FormInput
                      id="ProductName"
                      type="text"
                      placeholder="Name"
                      value={this.state.ProductName}
                      onChange={this.handleChange}
                    />
                  </Col>

                  <Col md="6">
                    <label htmlFor="feInputCategory">Category</label>
                    <FormSelect
                      id="ProductCategory"
                      value={this.state.ProductCategory}
                      onChange={this.handleChange}
                    >
                      <option>Choose...</option>
                      <option value="Toy">Toy</option>
                      <option value="Food">Food</option>
                      <option value="Drink">Drink</option>
                      <option value="Medicine">Medicine</option>
                    </FormSelect>
                  </Col>
                </Row>

                {/* <label htmlFor="ProductName">Product Name</label>
                    <input type="file" className="custom-file-input" id="customFile2" />
                    <label className="custom-file-label" htmlFor="customFile2">
                      Choose file...
                    </label> */}

                <Row form>
                  <Col md="6">
                    <label htmlFor="ProductName">Manufacturer</label>
                    <FormInput
                      id="Manufacturer"
                      type="text"
                      placeholder="Manufacturer Name"
                      value={this.state.Manufacturer}
                      onChange={this.handleChange}
                    />
                  </Col>

                  <Col md="6" className="form-group">
                    <label htmlFor="feInputCategory">Price</label>
                    <InputGroup>
                      <InputGroupAddon type="prepend">
                        <InputGroupText>$</InputGroupText>
                      </InputGroupAddon>
                      <FormInput
                        id="Price"
                        value={this.state.Price}
                        onChange={this.handleChange}
                      />
                      <InputGroupAddon type="append">
                        <InputGroupText>.00</InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col md="6" className="mb-3">
                    <label htmlFor="ProductName">Stocks</label>
                    <FormInput
                      id="Stock"
                      type="number"
                      placeholder="Available Stock"
                      value={this.state.Stock}
                      onChange={this.handleChange}
                    />
                  </Col>
                  <Col md="6" className="mb-3">
                    <label htmlFor="ProductImage">Product Image URL</label>
                    <FormInput
                      id="ProductImage"
                      type="url"
                      placeholder="Image URL"
                      value={this.state.ProductImage}
                      onChange={this.handleChange}
                    />
                  </Col>
                </Row>

                <FormGroup>
                  <label htmlFor="feInputProductDescription">
                    Product Description
                  </label>
                  <FormTextarea
                    id="ProductDescription"
                    placeholder="Tell something about your product..."
                    value={this.state.ProductDescription}
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <Button onClick={this.submitUpdateProductDetails}>
                  {" "}
                  Update{" "}
                </Button>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    );
  }
}

export default UpdateStoreProductForm;
