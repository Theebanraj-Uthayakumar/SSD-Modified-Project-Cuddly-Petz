import React, { useState, useEffect } from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  //   FormGroup,
  //   FormCheckbox,
  FormSelect,
  Button
  //   FormTextarea,
  //   InputGroupText,
  //   InputGroupAddon,
  //   InputGroup
} from "shards-react";

// import CustomFileUpload from "./CustomFileUpload";

const EditAppointmentForm = () => {
  const [petname, setPetName] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [image, setImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const ID = window.sessionStorage.getItem("PID");

  // fetch appointment data to edit
  useEffect(() => {
    fetch(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/pet/${ID}`)
      .then(response => response.json())
      .then(data => {
        setPetName(data.PetName);
        setSelectedType(data.SelectedType);
        setSelectedBreed(data.SelectedBreed);
        setAge(data.Age);
        setSex(data.Sex);
        setImage(data.avatar);
      })
      .catch(error => console.error(error));
  }, [ID]);

  const animalOptions = ["Dog", "Cat", "Bird"].map(animal => (
    <option key={animal} value={animal}>
      {animal}
    </option>
  ));

  const breedOptions =
    selectedType === "Dog"
      ? ["Labrador", "Poodle", "Golden Retriever"].map(breed => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))
      : selectedType === "Cat"
      ? ["Persian", "Siamese", "Maine Coon"].map(breed => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))
      : selectedType === "Bird"
      ? ["Parrot", "Canary", "Finch"].map(breed => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))
      : null;

  const handleFileChange = event => {
    const file = event.target.files[0];
    setSelectedFile(file);
    const fileName = file ? file.name : "Choose file...";
    document.getElementById("customFile2").nextSibling.innerText = fileName;
  };

  const handleTypeChange = e => {
    setSelectedType(e.target.value);
    setSelectedBreed("");
  };

  const handleBreedChange = e => {
    setSelectedBreed(e.target.value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    const formData = {
      PetName: petname,
      SelectedType: selectedType,
      SelectedBreed: selectedBreed,
      Age: age,
      Sex: sex,
      avatar: image,
      cloudinary_id: "empty"
    };

    fetch(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/pet/${ID}`, {
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
            <Form>
              <Row form>
                <Col md="6" className="mb-3">
                  <label htmlFor="DSpecialty">Pet Name</label>
                  <FormInput
                    id="feFirstName"
                    placeholder="Pet Name"
                    value={petname}
                    onChange={e => setPetName(e.target.value)}
                  />
                </Col>

                <Col md="6" className="mb-3">
                  <label htmlFor="animal">Pet Type</label>
                  <FormSelect
                    id="animal"
                    value={selectedType}
                    onChange={handleTypeChange}
                  >
                    <option value="">--Please select an animal--</option>
                    {animalOptions}
                  </FormSelect>
                  {selectedType && (
                    <div>
                      <label htmlFor="breed">Select a breed:</label>
                      <FormSelect
                        id="breed"
                        value={selectedBreed}
                        onChange={handleBreedChange}
                      >
                        <option value="">--Please select a breed--</option>
                        {breedOptions}
                      </FormSelect>
                    </div>
                  )}
                </Col>

                <Col md="6" className="mb-3">
                  <label htmlFor="DSpecialty">Pet Age</label>
                  <FormSelect
                    id="DSpecialty"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                  >
                    <option>Choose</option>
                    <option value="Below 1">Below 1</option>
                    <option value="1 - 4">1 - 4</option>
                    <option value="5 - 9">5 - 9</option>
                    <option value="10 - above">10 - above</option>
                  </FormSelect>
                </Col>

                <Col md="6" className="mb-3">
                  <label htmlFor="DSpecialty">Sex</label>
                  <FormSelect
                    id="DSpecialty"
                    value={sex}
                    onChange={e => setSex(e.target.value)}
                  >
                    <option>Choose</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </FormSelect>
                </Col>

                <Col md="6" className="mb-3">
                  <label htmlFor="DSpecialty">Upload Image</label>
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
                Update Pet
              </Button>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  );
};

export default EditAppointmentForm;
