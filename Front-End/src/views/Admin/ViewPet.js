import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button
} from "shards-react";

import PageTitle from "../../components/common/PageTitle";
// import { useHistory } from "react-router-dom"

//     const [getOperation, setGetOperation] = useState()

//     const history = useHistory()

//     const getRequest = () => {
//       fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/operation")
//         .then(response => response.json())
//         .then(data => setGetOperation(data))
//         .then(data => console.log(data))
//     }

//     useEffect(() => {
//       getRequest()
//     }, [])

//     const deleteOperation = ID => {
//       fetch(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/operation/${ID}`, { method: "DELETE" })
//         .then(() => alert("Successfully removed...!"))
//         .then(() => window.location.reload())
//     }

//     const updateOperation = ID => {
//       window.sessionStorage.setItem("OperationID", ID)
//       history.push("/updateOperation")
//     }


const ViewPet = () => {
  // const [getOperation, setGetOperation] = useState()

  // const history = useHistory()

  // const getRequest = () => {
  //   fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/operation")
  //     .then(response => response.json())
  //     .then(data => setGetOperation(data))
  //     .then(data => console.log(data))
  // }

  // useEffect(() => {
  //   getRequest()
  // }, [])

  // const deleteOperation = ID => {
  //   fetch(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/operation/${ID}`, { method: "DELETE" })
  //     .then(() => alert("Successfully removed...!"))
  //     .then(() => window.location.reload())
  // }

  // const updateOperation = ID => {
  //   window.sessionStorage.setItem("OperationID", ID)
  //   history.push("/updateOperation")
  // }
  // const [searchTerm, setSearchTerm] = useState("");

  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Pet Details"
          subtitle="Pets"
          className="text-sm-left"
        />
      </Row>

      {/* Default Light Table */}
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
                      #
                    </th>
                    <th scope="col" className="border-0">
                      Pet Name
                    </th>
                    <th scope="col" className="border-0">
                      Breed
                    </th>
                    <th scope="col" className="border-0">
                      Age
                    </th>
                    <th scope="col" className="border-0">
                      Sex
                    </th>
                    <th scope="col" className="border-0">
                      Type
                    </th>
                    <th scope="col" className="border-0">
                      Image
                    </th>
                    <th scope="col" className="border-0">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Jimmy</td>
                    <td>Bulldog</td>
                    <td>1 to 5</td>
                    <td>Male</td>
                    <td>Silent</td>
                    <td>Photo</td>
                    <td>
                      <Row form>
                        <Col md="6" className="mb-3">
                          <Button theme="danger">Delete</Button>
                        </Col>
                        <Col md="6" className="mb-3">
                        <Button
                            theme="primary"
                            //   onClick={() => updateOperation(item._id)}
                          >
                            Edit
                          </Button>
                        </Col>
                      </Row>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewPet;
