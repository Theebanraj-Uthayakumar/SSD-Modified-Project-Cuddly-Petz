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
      to: "/blog-posts"
    },
    {
      title: "Add New Product",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/add-new-store-product"
    },
    {
      title: "Products",
      htmlBefore: '<i class="material-icons">redeem</i>',
      to: "/store-products"
    },
    {
      title: "Orders",
      htmlBefore: '<i class="material-icons">local_hospital</i>',
      to: "/store-orders"
    },
    {
      title: "Profile",
      htmlBefore: '<i class="material-icons">local_hospital</i>',
      to: "/pet-owner-profile"
    }
  ];
}
