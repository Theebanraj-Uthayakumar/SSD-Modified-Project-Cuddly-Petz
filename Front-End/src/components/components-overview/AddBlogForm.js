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
  // InputGroupText,
  // InputGroupAddon,
  // InputGroup
} from "shards-react";

class AddBlogForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      // Fourth list of posts.
      Title: "",
      Description: "",
      ImageUrl: "",
      PostedDate: "",
      PostedTime: "",
      PostedBy: "",
      BlogType: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitBlogDetails = this.submitBlogDetails.bind(this);
    // this.ConfirmOrder = this.ConfirmOrder.bind(this);
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.id;

    this.setState({
      [name]: value
    });
  }

  // componentDidMount() {
  //   fetch('https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/category?FormType=DR')
  //   .then((response) => response.json())
  //   .then(doctorspeaciltyList => {
  //       this.setState({ DoctorsSpecialityDetails: doctorspeaciltyList });
  //       //console.log(doctorList);
  //   });
    
  // }

  submitBlogDetails = (event) => {

    const { Title, Description, BlogType, PostedBy,ImageUrl } = this.state;
    
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


    var blogdata = { 
      Title: Title,
      Description: Description,
      ImageUrl: ImageUrl,
      PostedDate: date,
      PostedTime: time,
      PostedBy: PostedBy,
      BlogType: BlogType
    };

    fetch('https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blogdata)
    })
    .then(response => response.json())
    .then(data => {
      alert('Successfully Blog Published');      
      window.location.reload();
    })
    .catch(error => {
      console.error('Error inserting blog record:', error);
    });

  }

  render() 
  {
  return (
  <ListGroup flush>
    <ListGroupItem className="p-3">
      <Row>
        <Col>
          <Form>
            <Row form>
              

              <Col md="12" className="form-group">
                <label htmlFor="Title">Blog Title</label>
                <FormInput
                  id="Title"
                  type="text"                  
                  value={this.state.Title}
                  onChange={this.handleChange}
                  placeholder="Blog Title"
                />
              </Col>

            </Row>
            
            <Row form>              
              <Col md="12">   
              <FormGroup>
                <label htmlFor="Description">Description</label>
                <FormTextarea id="Description" 
                  value={this.state.Description}
                  onChange={this.handleChange}
                  placeholder="Write a about your Blog..." />
              </FormGroup>
              </Col>
            </Row>
            
            <Row form>              
              <Col md="12">   
              <FormGroup>
                <label htmlFor="ImageUrl">Image URL</label>
                <FormInput id="ImageUrl" 
                  value={this.state.ImageUrl}
                  onChange={this.handleChange}
                  placeholder="Image URL" />
              </FormGroup>
              </Col>
            </Row>

            
            <Row form> 
            <Col md="12" className="mb-3">
              <label htmlFor="DSpecialty">Type</label>                
              <FormSelect id="BlogType"
                  value={this.state.BlogType}
                  onChange={this.handleChange}>              
                  <option value="0">Choose Type</option>           
                  <option value="Blog">Blog</option>   
                  <option value="Article">Article</option>
              </FormSelect>
            </Col>
            </Row>

            <Row form>  
              <Col md="12" className="form-group">
                <label htmlFor="PostedBy">Posted By</label>
                <FormInput
                  id="PostedBy"
                  type="text"                  
                  value={this.state.PostedBy}
                  onChange={this.handleChange}
                />
              </Col>
            </Row>

            <Button onClick={this.submitBlogDetails}>Publish Blog</Button>
          </Form>
        </Col>
      </Row>
    </ListGroupItem>
  </ListGroup>
  );
}
};
export default AddBlogForm;
