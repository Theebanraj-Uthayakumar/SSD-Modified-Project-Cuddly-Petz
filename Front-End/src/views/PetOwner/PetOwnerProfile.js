import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../../components/common/PageTitle";
import UserDetails from "../../components/user-profile-lite/UserDetails";
import HospitalDetails from "../../components/user-profile-lite/HospitalDetails";
import PetShopDetails from "../../components/user-profile-lite/PetShopDetails";
import PetOwnerAccountDetails from "../../components/user-profile-lite/PetOwnerAccountDetails";
import HospitalAccountDetails from "../../components/user-profile-lite/HospitalAccountDetails";
import PetShopAccountDetails from "../../components/user-profile-lite/PetShopAccountDetails";

const UserProfileLite = () => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="Pet Owner Profile" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
    </Row>
    <Row>
      <Col lg="4">
        {localStorage.getItem("UserType") == "PetOwner" ? <UserDetails/> : localStorage.getItem("UserType") == "PetShop" ? <PetShopDetails/> : localStorage.getItem("UserType") == "PetHospital" ? <HospitalDetails/> : ""}
      </Col>
      <Col lg="8">
      {localStorage.getItem("UserType") == "PetOwner" ? <PetOwnerAccountDetails/> : localStorage.getItem("UserType") == "PetShop" ? <PetShopAccountDetails/> : localStorage.getItem("UserType") == "PetHospital" ? <HospitalAccountDetails/> : ""}
      </Col>
    </Row>
  </Container>
);

export default UserProfileLite;