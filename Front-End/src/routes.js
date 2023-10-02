import React from "react";
import { Link } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import StoreOrders from "./views/PetShop/StoreOrders";
import AddNewBlog from "./views/AddNewBlog";
import PetStore from "./views/PetOwner/PetStoreItems";
import ProductDesc from "./views/PetOwner/ProductDesc";
import OrderConfirm from "./views/PetOwner/OrderConfirm";
import AddStoreProduct from "./views/PetShop/AddProduct";
import StoreItems from "./views/PetShop/StoreItems";
import AddDoctor from "./views/Hospital/AddDoctor";
import ViewDoctors from "./views/Hospital/ViewDoctors";
import Appoinments from "./views/Hospital/Appoinments";
import MakeAppointment from "./views/Hospital/MakeAppointment";
import AddNewServices from "./views/Hospital/AddNewServices";
import Services from "./views/Hospital/Services";
import AddNewUser from "./views/Admin/AddNewUser";
import AddNewPetShop from "./views/Admin/AddNewPetShop";
import AddNewHospital from "./views/Admin/AddNewHospital";
import ViewUsers from "./views/Admin/ViewUsers";
import ViewPetShop from "./views/Admin/ViewPetShop";
import ViewHospital from "./views/Admin/ViewHospital";
import AddNewPet from "./views/PetOwner/AddNewPet";
import AddNewPetOwner from "./views/Admin/AddNewPetOwner";
import ViewPet from "./views/Admin/ViewPet";
import ViewPetOwner from "./views/Admin/ViewPetOwner";
import MakeAppointmentUser from "./views/PetOwner/MakeAppointment";
import StoreOrdersUser from "./views/PetOwner/StoreOrdersUser";
import ViewPets from "./views/PetOwner/ViewPets";
import UpdatePet from "./views/PetOwner/UpdatePet";
import UserViewHospital from "./views/PetOwner/UserViewHospital";
import ViewPetRecords from "./views/PetOwner/ViewPetRecords";
import AddPetRecord from "./views/PetOwner/AddPetRecord";
import UpdatePetRecord from "./views/PetOwner/UpdatePetRecord ";
import UpdatePetShop from "./views/Admin/UpdatePetShop";
import UpdateHospital from "./views/Admin/UpdateHospital";
import OwnerAppointments from "./views/PetOwner/OwnerAppointments";
import ViewOwnerDoctors from "./views/PetOwner/ViewOwnerDoctors";
import BlogComments from "./views/BlogComments";
import UserAccount from "./views/Authentication/UserAccount";
import UpdateProduct from "./views/PetShop/UpdateProduct";
import UpdateDoctor from "./views/Hospital/UpdateDoctor";
import UpdateAppointment from "./views/Hospital/UpdateAppointment";
import FormDropDown from "./views/Admin/FormDropDown";
import ViewHospitalPetRecords from "./views/Hospital/ViewPetRecords";
import ViewPetShops from "./views/PetOwner/ViewPetShops";
import PetOwnerProfile from "./views/PetOwner/PetOwnerProfile";
import UpdatePetOwner from "./views/PetOwner/UpdatePetOwner";

/** auth middleware */
import { AuthorizeUser, ProtectRoute } from "./middleware/auth";
import Login from "./views/Authentication/LoginPage";
import Register from "./views/Authentication/RegistrationPage";
import PetOwnerPage from "./views/Authentication/PetOwnerPage";
import Forgotpassword from "./views/Authentication/OTPverification";
import NewPassword from "./views/Authentication/NewPassword";
import FirstAddNewPet from "./views/Authentication/FirstAddNewPet";

const privateRoutes = [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Link to="/landing" />,
    isPrivate: true
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview,
    isPrivate: true
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite,
    isPrivate: true
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost,
    isPrivate: true
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors,
    isPrivate: true
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview,
    isPrivate: true
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables,
    isPrivate: true
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts,
    isPrivate: true
  },
  {
    //PetShop
    path: "/add-new-store-product",
    layout: DefaultLayout,
    component: AddStoreProduct,
    isPrivate: true
  },
  {
    path: "/store-products",
    layout: DefaultLayout,
    component: StoreItems,
    isPrivate: true
  },
  {
    path: "/store-orders",
    layout: DefaultLayout,
    component: StoreOrders,
    isPrivate: true
  },
  {
    //Hospital
    path: "/add-new-doctor",
    layout: DefaultLayout,
    component: AddDoctor,
    isPrivate: true
  },
  {
    path: "/view-doctors",
    layout: DefaultLayout,
    component: ViewDoctors,
    isPrivate: true
  },
  {
    path: "/hospital-appoinments",
    layout: DefaultLayout,
    component: Appoinments,
    isPrivate: true
  },
  {
    path: "/owner-appoinments",
    layout: DefaultLayout,
    component: OwnerAppointments,
    isPrivate: true
  },
  {
    path: "/make-appoinments",
    layout: DefaultLayout,
    component: MakeAppointment,
    isPrivate: true
  },
  {
    path: "/make-appoinments-byUser",
    layout: DefaultLayout,
    component: MakeAppointmentUser,
    isPrivate: true
  },
  {
    path: "/add-new-service",
    layout: DefaultLayout,
    component: AddNewServices,
    isPrivate: true
  },
  {
    path: "/view-services",
    layout: DefaultLayout,
    component: Services,
    isPrivate: true
  },
  {
    //Admin
    path: "/add-new-user",
    layout: DefaultLayout,
    component: AddNewUser,
    isPrivate: true
  },
  {
    path: "/add-new-hospital",
    layout: DefaultLayout,
    component: AddNewHospital,
    isPrivate: true
  },
  {
    path: "/add-new-petshop",
    layout: DefaultLayout,
    component: AddNewPetShop,
    isPrivate: true
  },
  {
    path: "/add-new-pet",
    layout: DefaultLayout,
    component: AddNewPet,
    isPrivate: true
  },
  {
    path: "/add-new-petOwner",
    layout: DefaultLayout,
    component: AddNewPetOwner,
    isPrivate: true
  },
  {
    path: "/view-users",
    layout: DefaultLayout,
    component: ViewUsers,
    isPrivate: true
  },
  {
    path: "/view-petshops",
    layout: DefaultLayout,
    component: ViewPetShop,
    isPrivate: true
  },
  {
    path: "/view-pet",
    layout: DefaultLayout,
    component: ViewPet,
    isPrivate: true
  },
  {
    path: "/view-petOwner",
    layout: DefaultLayout,
    component: ViewPetOwner,
    isPrivate: true
  },
  {
    path: "/view-hospital",
    layout: DefaultLayout,
    component: ViewHospital,
    isPrivate: true
  },
  {
    path: "/add-new-blog",
    layout: DefaultLayout,
    component: AddNewBlog,
    isPrivate: true
  },
  {
    path: "/view-pet-store",
    layout: DefaultLayout,
    component: PetStore,
    isPrivate: true
  },
  {
    path: "/view-productdesc",
    layout: DefaultLayout,
    component: ProductDesc,
    isPrivate: true
  },
  {
    path: "/order-confirm",
    layout: DefaultLayout,
    component: OrderConfirm,
    isPrivate: true
  },
  {
    path: "/user-orders",
    layout: DefaultLayout,
    component: StoreOrdersUser,
    isPrivate: true
  },
  {
    path: "/user-view-pets",
    layout: DefaultLayout,
    component: ViewPets,
    isPrivate: true
  },
  {
    path: "/user-update-pets",
    layout: DefaultLayout,
    component: UpdatePet,
    isPrivate: true
  },
  {
    path: "/view-user-hospital",
    layout: DefaultLayout,
    component: UserViewHospital,
    isPrivate: true
  },
  {
    path: "/add-new-pet-record",
    layout: DefaultLayout,
    component: AddPetRecord,
    isPrivate: true
  },
  {
    path: "/user-view-pet-records",
    layout: DefaultLayout,
    component: ViewPetRecords,
    isPrivate: true
  },
  {
    path: "/user-update-pet-records",
    layout: DefaultLayout,
    component: UpdatePetRecord,
    isPrivate: true
  },
  {
    path: "/update-petshop",
    layout: DefaultLayout,
    component: UpdatePetShop,
    isPrivate: true
  },
  {
    path: "/update-hospital",
    layout: DefaultLayout,
    component: UpdateHospital,
    isPrivate: true
  },
  {
    path: "/view-user-doctors",
    layout: DefaultLayout,
    component: ViewOwnerDoctors,
    isPrivate: true
  },
  {
    path: "/blog-comments",
    layout: DefaultLayout,
    component: BlogComments,
    isPrivate: true
  },
  {
    path: "/petowner-register-account",
    layout: DefaultLayout,
    component: UserAccount,
    isPrivate: true
  },
  {
    path: "/update-store-product",
    layout: DefaultLayout,
    component: UpdateProduct,
    isPrivate: true
  },
  {
    path: "/update-doctor",
    layout: DefaultLayout,
    component: UpdateDoctor,
    isPrivate: true
  },
  {
    path: "/update-petOwner",
    layout: DefaultLayout,
    component: UpdatePetOwner,
    isPrivate: true
  },
  {
    path: "/make-note-appointment",
    layout: DefaultLayout,
    component: UpdateAppointment,
    isPrivate: true
  },
  {
    path: "/form-dropdown",
    layout: DefaultLayout,
    component: FormDropDown,
    isPrivate: true
  },
  {
    path: "/view-hospital-pet-records",
    layout: DefaultLayout,
    component: ViewHospitalPetRecords,
    isPrivate: true
  },
  {
    path: "/view-pet-shops",
    layout: DefaultLayout,
    component: ViewPetShops,
    isPrivate: true
  },
  {
    path: "/pet-owner-profile",
    layout: DefaultLayout,
    component: PetOwnerProfile,
    isPrivate: true
  }
];

const publicRoutes = [
  {
    path: "/login",
    exact: true,
    component: Login,
    isPrivate: false,
  },
  {
    path: "/register",
    exact: true,
    component: Register,
    isPrivate: false,
  },
  {
    path: "/petowner-register",
    exact: true,
    component: PetOwnerPage,
    isPrivate: false,
  },
  // {
  //   path: "/forgot-password",
  //   exact: true,
  //   component: Forgotpassword,
  //   isPrivate: false,
  // },
  {
    path: "/forgot-password",
    exact: true,
    component: NewPassword,
    isPrivate: false,
  },
  {
    path: "/add-first-pets",
    exact: true,
    component: FirstAddNewPet,
    isPrivate: false,
  }
];

export { privateRoutes, publicRoutes };
