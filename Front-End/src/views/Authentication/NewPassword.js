import axios from "axios";
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  //   Label,
  FormInput,
  Button
} from "shards-react";

const ChangedPassword = () => {
  const [username, setUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = () => {
    console.log(username, newPassword, confirmPassword);
    if (!username || !newPassword || !confirmPassword) {
      alert("Please fill all required fileds.");
    } else {
      if (newPassword !== confirmPassword) {
        alert("password does not match");
      } else {
        axios
          .put("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/resetPassword", {
            name: username,
            password: newPassword
          })
          .then(res => {
            alert("Password has been reset");
            window.location.href = "/login";
          })
          .catch(err => {
            console.log(err);
            if(err.response.data.error){
              alert(err.response.data.error);
            }
          });
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }} style={{ marginTop: "40px" }}>
          <h3 className="text-center">Change Password</h3>
          <Form>
            <FormGroup>
              <label htmlFor="new-password">Username</label>
              <FormInput
                type="text"
                id="new-password"
                placeholder="Enter User Name"
                value={username}
                onChange={e => setUserName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="new-password">New Password</label>
              <FormInput
                type="password"
                id="new-password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="confirm-password">Confirm Password</label>
              <FormInput
                type="password"
                id="confirm-password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </FormGroup>
            <Button onClick={handleResetPassword}>Reset Password</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangedPassword;
