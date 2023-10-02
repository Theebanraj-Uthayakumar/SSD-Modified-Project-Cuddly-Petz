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

class UpdateDoctorForm extends React.Component {

  constructor(props) {
    super(props);

    this.params = new URLSearchParams(window.location.search);
    
    this.state = {
      // Fourth list of posts.
      DFirstName: "",
      DLastName: "",
      DAddress: "",
      DPhoneNumber: "",
      DEmailAddress: "",
      DSpecialty: "",
      DExperience: "",
      DOB: "",
      DAbout: "",
      DoctorsSpecialityDetails:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateDoctorDetails = this.updateDoctorDetails.bind(this);
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

  updateDoctorDetails = (event) => {

    const { DAbout, DOB, DSpecialty,DExperience, DEmailAddress, DPhoneNumber, DAddress, DLastName,DFirstName } = this.state;
    
    
    var productdata = { 
      DFirstName: DFirstName,
      DLastName: DLastName,
      DAddress: DAddress,
      DPhoneNumber: DPhoneNumber,
      DEmailAddress: DEmailAddress,
      DSpecialty: DSpecialty,
      DExperience: DExperience,
      DOB: DOB,
      DAbout: DAbout,
    };

    fetch('https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/doctor/'+this.params.get("doctorID"), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productdata)
    })
    .then(response => response.json())
    .then(data => {
      alert('Successfully Doctor Updated');      
      window.location.reload();
    })
    .catch(error => {
      console.error('Error updating Doctor record:', error);
    });

  }

  
  componentDidMount() {
    fetch('https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/doctor/'+this.params.get("doctorID"))
    .then((response) => response.json())
    .then(doctorEditDetails => {
        this.setState({ DFirstName: doctorEditDetails.DFirstName });
        this.setState({ DLastName: doctorEditDetails.DLastName });
        this.setState({ DAddress: doctorEditDetails.DAddress });
        this.setState({ DPhoneNumber: doctorEditDetails.DPhoneNumber });
        this.setState({ DEmailAddress: doctorEditDetails.DEmailAddress });
        this.setState({ DSpecialty: doctorEditDetails.DSpecialty });
        this.setState({ DExperience: doctorEditDetails.DExperience });
        this.setState({ DOB: doctorEditDetails.DOB });
        this.setState({ DAbout: doctorEditDetails.DAbout });
    });

    fetch('https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/category?FormType=DR')
    .then((response) => response.json())
    .then(doctorspeaciltyList => {
        this.setState({ DoctorsSpecialityDetails: doctorspeaciltyList });
        //console.log(doctorList);
    });
  }

  render() 
  {
    const {DoctorsSpecialityDetails} = this.state;
  return (
  <ListGroup flush>
    <ListGroupItem className="p-3">
      <Row>
        <Col>
          <Form>
            <Row form>
              <Col md="6" className="form-group">
                <label htmlFor="DFirstName">Doctor First Name</label>
                <FormInput
                  id="DFirstName"
                  type="text"
                  placeholder="First Name"
                  value={this.state.DFirstName}
                  onChange={this.handleChange}
                />
              </Col>

              <Col md="6" className="form-group">
                <label htmlFor="DLastName">Doctor Last Name</label>
                <FormInput
                  id="DLastName"
                  type="text"
                  placeholder="Last Name"
                  value={this.state.DLastName}
                  onChange={this.handleChange}
                />
              </Col>

              <Col md="6" className="form-group">
                <label htmlFor="DPhoneNumber">Phone No</label>
                <FormInput
                  id="DPhoneNumber"
                  type="tel"
                  placeholder="Phone No"
                  value={this.state.DPhoneNumber}
                  onChange={this.handleChange}
                />
              </Col>

              <Col md="6" className="form-group">
                <label htmlFor="DEmailAddress">Email</label>
                <FormInput
                  id="DEmailAddress"
                  type="email"
                  placeholder="Email"
                  value={this.state.DEmailAddress}
                  onChange={this.handleChange}
                />
              </Col>    

              
              <Col md="12" className="mb-3">   
                <FormGroup>
                  <label htmlFor="feInputDAddress">Address</label>
                  <FormTextarea id="DAddress" placeholder="Doctors Address..." 
                  value={this.state.DAddress}
                  onChange={this.handleChange}/>
                </FormGroup>
              </Col>   

              <Col md="6">
                <label htmlFor="DSpecialty">Speciality</label>
                <FormSelect id="DSpecialty"
                    value={this.state.DSpecialty}
                    onChange={this.handleChange}>
                    <option value="0">Choose a Doctor</option>
                    {DoctorsSpecialityDetails.map((post, idx) => (
                      <option key={post._id}  value={post.CategoryName}>{post.CategoryName}</option>  
                    ))
                    }
                </FormSelect>
              </Col>

              <Col md="6" className="form-group">
                <label htmlFor="DExperience">Experience</label>
                <FormInput
                  id="DExperience"
                  type="number"
                  placeholder="Experience"
                  value={this.state.DExperience}
                  onChange={this.handleChange}
                />
              </Col>   

            </Row>

            <Row form>              
              <Col md="12" className="mb-3">   
              <FormGroup>
                <label htmlFor="feInputDAbout">About</label>
                <FormTextarea id="DAbout" placeholder="Tell Something about the doctor..."
                value={this.state.DAbout}
                onChange={this.handleChange}/>
              </FormGroup>
              </Col>
            </Row>
            <Button onClick={this.updateDoctorDetails}>Update Doctor</Button>
          </Form>
        </Col>
      </Row>
    </ListGroupItem>
  </ListGroup>
  );
  }
};
export default UpdateDoctorForm;
