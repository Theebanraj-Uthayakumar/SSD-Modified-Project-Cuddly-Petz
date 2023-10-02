import React, { useState, useEffect } from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  // FormInput,
  FormGroup,
  //   FormCheckbox,
  FormSelect,
  Button,
  FormTextarea
  //   InputGroupText,
  //   InputGroupAddon,
  //   InputGroup
} from "shards-react";

// import CustomFileUpload from "./CustomFileUpload";

const EditAppointmentForm = () => {
  const [petname, setPetName] = useState("");
  const [recordType, setRecordType] = useState("");
  const [note, setNote] = useState("");
  // const [file, setFile] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState("");

  // const [postsListFour, setPostsListFour] = useState([]);

  const ID = window.sessionStorage.getItem("PID");

  // fetch appointment data to edit
  useEffect(() => {
    fetch(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/pet-record/${ID}`)
      .then(response => response.json())
      .then(data => {
        setPetName(data.PetName);
        setRecordType(data.RecordType);
        setNote(data.Note);
        setImage(data.avatar);
      })
      .catch(error => console.error(error));
  }, [ID]);

  const handleFileChange = event => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const fileName = file ? file.name : "Choose file...";
    document.getElementById("customFile2").nextSibling.innerText = fileName;
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    const formData = {
      PetName: petname,
      RecordType: recordType,
      Note: note,
      avatar: image,
      cloudinary_id: "empty",
    };

    fetch(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/pet-record/${ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert("Successfully updated");
      })
      .catch(error => {
        console.error("Error updating appointment record:", error);
      });
  };
  

  return (
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form onSubmit={handleFormSubmit}>
              <Row form>
              <Col md="6" className="mb-3">
                  <label htmlFor="petname">Pet</label>
                  
                  {/* <FormSelect id="petname" onChange={e => setPetName(e.target.value)}>
                  {postsListFour.map((post) => (<option>{post.PetName}</option>))}
                  </FormSelect> */}

                  <FormSelect
                    id="DSpecialty"
                    value={petname}
                    onChange={e => setPetName(e.target.value)}
                  >
                    <option>Choose</option>
                    <option value="Sheero">Sheero</option>
                    <option value="Tommy">Tommy</option>
                    <option value="Rico">Rico</option>
                    <option value="Max">Max</option>
                  </FormSelect>
                  
                </Col>

                <Col md="6" className="mb-3">
                  <label htmlFor="DSpecialty">Record Type</label>
                  <FormSelect
                    id="DSpecialty"
                    value={recordType}
                    onChange={e => setRecordType(e.target.value)}
                  >
                    <option>Choose</option>
                    <option value="Pet X-Ray Record">Pet X-Ray Record</option>
                    <option value="Clinic Record">Clinic Record</option>
                    <option value="Vaccination Record">Vaccination Record</option>
                    <option value="Diary Record">Diary Record</option>
                  </FormSelect>
                </Col>

                <Col md="12">
                  <FormGroup>
                    <label htmlFor="feInputTypeReason">Note</label>
                    <FormTextarea
                      id="Note"
                      placeholder="Write a Note..."
                      value={note}
                      onChange={e => setNote(e.target.value)}
                    />
                  </FormGroup>
                </Col>

                <Col md="6" className="mb-3">
                  <label htmlFor="DSpecialty">Upload Record Document</label>
                  <div className="custom-file mb-3">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile2"
                      onChange={handleFileChange}
                    />
                    <label className="custom-file-label" htmlFor="customFile2">
                      Choose file...
                    </label>
                  </div>
                </Col>
              </Row>
              <Button type="submit" onClick={handleFormSubmit}>
                Add New Record
              </Button>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  );
};

export default EditAppointmentForm;
