import React, { useState } from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  Button
} from "shards-react";

const AddAppointmentForm = () => {
  const [shopname, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [location, setGoogleLocation] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [mobile, setMobile] = useState("");
  const [opentime, setOpenTime] = useState("");
  const [closetime, setCloseTime] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  // const [ConfirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, seterrorMessage] = useState(true);
  // const [Users, setUsers] = useState([]);
  // const [selectedFile, setSelectedFile] = useState(null);

  // useEffect(() => {
  //   fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/user")
  //   .then(response => response.json())
  //   .then(Users => {
  //     setUsers(Users);
  //   });
  // });

  const checkUsername = (event) => {
    event.preventDefault();
    // Users.map((user) => {
    //   if (user.name === event.target.value) {
    //     alert("Username Already Exist. Please enter a new Username");
    //     return;
    //   }
    // });
    setUsername(event.target.value);
  };

  const checkPassword = (event) => {

    event.preventDefault();
    if(Password === event.target.value){
      // setConfirmPassword(event.target.value);
      seterrorMessage(true);
    }else {
      seterrorMessage(false);
    }
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    const formData = {
      ShopName: shopname,
      Address: address,
      GoogleLocation: location,
      Email: email,
      Telephone: telephone,
      Mobile: mobile,
      OpenTime: opentime,
      CloseTime: closetime,
    };

    fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/petshop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
          console.log(data);
          alert("Successfully Pet Shop added");
          
          const userformData = {
            name: Username,
            email: email,
            password: Password,
            UserTypeID: data._id,
            UserType: "PetShop",
            date: "2022.02.15",
          };

          fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(userformData)
          })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            alert("Successfully user account created");
          })
          .catch(error => {
            console.error("Error inserting user record:", error);
          });

      })
      .catch(error => {
        console.error("Error inserting pet shop record:", error);
      });
  };

  return (
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form onSubmit={handleFormSubmit}>
              <Row form>
                <Col md="6" className="form-group">
                  <label htmlFor="Date">Shop Name</label>
                  <FormInput
                    id="ShopName"
                    type="text"
                    value={shopname}
                    onChange={e => setShopName(e.target.value)}
                  />
                </Col>

                <Col md="6" className="form-group">
                  <label htmlFor="Date">Shop Address</label>
                  <FormInput
                    id="Address"
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                  />
                </Col>

                <Col md="6" className="form-group">
                  <label htmlFor="Date">Google Location</label>
                  <FormInput
                    id="GoogleLocation"
                    type="url"
                    value={location}
                    onChange={e => setGoogleLocation(e.target.value)}
                  />
                </Col>

                <Col md="6" className="form-group">
                  <label htmlFor="Email">Email</label>
                  <FormInput
                    id="Email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </Col>

                <Col md="6" className="form-group">
                  <label htmlFor="Telephone">Tele No</label>
                  <FormInput
                    id="Telephone"
                    type="tel"
                    placeholder="Telephone No"
                    value={telephone}
                    onChange={e => setTelephone(e.target.value)}
                  />
                </Col>

                <Col md="6" className="form-group">
                  <label htmlFor="Mobile">Mobile No</label>
                  <FormInput
                    id="Mobile"
                    type="tel"
                    placeholder="Mobile No"
                    value={mobile}
                    onChange={e => setMobile(e.target.value)}
                  />
                </Col>

                <Col md="6" className="form-group">
                  <label htmlFor="OpenTime">Open Time</label>
                  <FormInput
                    id="OpenTime"
                    type="time"
                    value={opentime}
                    onChange={e => setOpenTime(e.target.value)}
                  />
                </Col>

                <Col md="6" className="form-group">
                  <label htmlFor="CloseTime">Close Time</label>
                  <FormInput
                    id="CloseTime"
                    type="time"
                    value={closetime}
                    onChange={e => setCloseTime(e.target.value)}
                  />
                </Col>

                <Col md="6" className="form-group mt-5">
                  <label htmlFor="CloseTime">Username</label>
                  <FormInput
                    id="Username"
                    type="text"
                    onChange={checkUsername}
                  />
                </Col>
                

                <Col md="6" className="form-group mt-5">
                  <label htmlFor="CloseTime">Password</label>
                  <FormInput
                    id="Password"
                    type="password"
                    value={Password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </Col>
                

                <Col md="6" className="form-group">
                  <label htmlFor="CloseTime">Confirm Password</label>
                  {errorMessage?<FormInput id="ConfirmPassword" valid type="password" onChange={checkPassword}/>:<FormInput invalid id="ConfirmPassword" type="password" onChange={checkPassword}/>}
                  
                </Col>
              </Row>

              <Button
                href="/add-new-user"
                type="submit"
                onClick={handleFormSubmit}
              >
                Add New Shop
              </Button>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  );
};

export default AddAppointmentForm;
