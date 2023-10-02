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
  FormTextarea,
  FormInput
  //   InputGroupText,
  //   InputGroupAddon,
  //   InputGroup
} from "shards-react";

// import CustomFileUpload from "./CustomFileUpload";

const AddNewPetRecordForm = ({ ID }) => {
  const [petname, setPetName] = useState("");
  const [recordType, setRecordType] = useState("");
  const [note, setNote] = useState("");
  const [file, setFile] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const [PetOwnerPets, setPetOwnerPets] = useState([]);

  // const handleFormSubmit = async event => {
  //   event.preventDefault();

  //   // const formData = new FormData();
  //   // formData.append("petname", petname);
  //   // formData.append("recordType", recordType);
  //   // formData.append("note", note);
  //   // formData.append("file", file);
  //   // formData.append("file", selectedFile)

  //   const formData = {
  //     PetName: petname,
  //     RecordType: recordType,
  //     Note: note,
  //     avatar: file,
  //     cloudinary_id: "empty",
  //   };

  //   try {
  //     const response = await fetch(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/pet-record`, {
  //       method: "POST",
  //       body: formData
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleFileChange = event => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  //   const fileName = file ? file.name : "Choose file...";
  //   document.getElementById("customFile2").nextSibling.innerText = fileName;
  // };

  useEffect(() => {
    fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/pet/?POID="+localStorage.getItem("UserTypeID"))
      .then(response => response.json())
      .then((petList) => {
        setPetOwnerPets(petList);
      });
  }, []);


  const handleFormSubmit = e => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("ShopName", shopname);
    // formData.append("Address", address);
    // formData.append("GoogleLocation", location);
    // formData.append("Email", email);
    // formData.append("Telephone", telephone);
    // formData.append("Mobile", mobile);
    // formData.append("cloudinary_id", "empty");
    // console.log(formData);

    const formData = {
      PetName: petname,
      PetOwnerID: localStorage.getItem("UserTypeID"),
      RecordType: recordType,
      Note: note,
      avatar: selectedFile,
      cloudinary_id: "empty",
    };

    fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/pet-record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert("Successfully added");
        window.location.reload();
      })
      .catch(error => {
        console.error("Error inserting product record:", error);
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
                  {PetOwnerPets.map((post) => (<option>{post.PetName}</option>))}
                  </FormSelect> */}

                  <FormSelect
                    id="DSpecialty"
                    value={petname}
                    onChange={e => setPetName(e.target.value)}
                  >
                    <option value="0">Choose a Pets</option>
                    {PetOwnerPets.map((post, idx) => (
                      <option key={post._id} value={post.PetName}>{post.PetName}</option>  
                    ))
                    }
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
                  <label htmlFor="selectedFile">Upload Record Document</label>
                    <FormInput
                      type="url"
                      id="selectedFile"
                      value={selectedFile}
                      onChange={e => setSelectedFile(e.target.value)}
                    /> 
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

export default AddNewPetRecordForm;
