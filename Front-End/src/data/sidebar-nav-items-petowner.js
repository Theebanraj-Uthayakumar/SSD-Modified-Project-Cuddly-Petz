export default function() {
  return [
    // {
    //   title: "Blog Dashboard",
    //   to: "/blog-overview",
    //   htmlBefore: '<i class="material-icons">edit</i>',
    //   htmlAfter: ""
    // },
    {
      title: "Blog Posts",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/blog-posts",
    },
    {
      title: "Pet Store",
      htmlBefore: '<i class="material-icons">shopping_cart_checkout</i>',
      to: "/view-pet-store",
    },
    {
      title: "Pet Shops",
      htmlBefore: '<i class="material-icons">shop</i>',
      to: "/view-pet-shops",
    },
    {
      title: "Orders",
      htmlBefore: '<i class="material-icons">library_add</i>',
      to: "/user-orders",
    },
    {
      title: "Add New Pet",
      htmlBefore: '<i class="material-icons">pets</i>',
      to: "/add-new-pet",
    },
    {
      title: "View Pets",
      htmlBefore: '<i class="material-icons">filter_list</i>',
      to: "/user-view-pets",
    },
    {
      title: "Add Pet Records",
      htmlBefore: '<i class="material-icons">bolt</i>',
      to: "/add-new-pet-record",
    },
    {
      title: "Pet Records",
      htmlBefore: '<i class="material-icons">done_all</i>',
      to: "/user-view-pet-records",
    },
    {
      title: "Pet Hospitals",
      htmlBefore: '<i class="material-icons">local_hospital</i>',
      to: "/view-user-hospital",
    },
    {
      title: "Make Appoinment",
      htmlBefore: '<i class="material-icons">app_registration</i>',
      to: "/make-appoinments-byUser",
    },
    {
      title: "View Appoinment",
      htmlBefore: '<i class="material-icons">apps</i>',
      to: "/owner-appoinments",
    },
    {
      title: "Doctors",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/view-user-doctors",
    },
    {
      title: "User Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/pet-owner-profile",
    },
  ];
}
