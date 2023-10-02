import React, { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  FormInput,
  Row
} from "shards-react";

import { Link } from "react-router-dom";

const OTPVerification = () => {
  const [otp, setOTP] = useState("");
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleInputChange = event => {
    setOTP(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setIsValid(otp === "1234"); // replace "1234" with your actual OTP
  };

  return (
    <Container className="py-5">
      <Row style={{marginBottom: '40px'}}>
        <Col sm={{ size: 6, offset: 3 }}>
          <h3 className="text-center mb-4">Email Address Verification</h3>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <FormInput
                type="email"
                placeholder="Enter Email Address"
                value={otp}
                onChange={(e)=>e.targ}
              />
            </FormGroup>{" "}
            <Link to="/new-password">
              <Button type="submit" block>
                Verify OTP
              </Button>
            </Link>
          </Form>
          {isValid && (
            <Alert theme="success" className="mt-4">
              OTP is valid!
            </Alert>
          )}
          {!isValid && otp.length > 0 && (
            <Alert theme="danger" className="mt-4">
              OTP is invalid! Please try again.
            </Alert>
          )}
        </Col>
      </Row>
      <Row>
        <Col sm={{ size: 6, offset: 3 }}>
          <h3 className="text-center mb-4">Enter OTP Code</h3>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <FormInput
                type="number"
                placeholder="Enter OTP code"
                value={otp}
                onChange={handleInputChange}
              />
            </FormGroup>{" "}
            <Link to="/new-password">
              <Button type="submit" block>
                Verify OTP
              </Button>
            </Link>
          </Form>
          {isValid && (
            <Alert theme="success" className="mt-4">
              OTP is valid!
            </Alert>
          )}
          {!isValid && otp.length > 0 && (
            <Alert theme="danger" className="mt-4">
              OTP is invalid! Please try again.
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default OTPVerification;
