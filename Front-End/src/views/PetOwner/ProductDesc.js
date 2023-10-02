/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  // Row,
  // Col,
  // Card,
  // CardBody,
  // CardFooter,
  // Badge,
  Button
} from "shards-react";

// import PageTitle from "../../components/common/PageTitle";
// import { NavLink as RouteNavLink } from "react-router-dom";
// import { NavItem, NavLink } from "shards-react";


class PetStoreItems extends React.Component {
  constructor(props) {
    super(props);

    this.params = new URLSearchParams(window.location.search);
    this.state = {
      // Fourth list of posts.
      PostsListOne: {},
      stock :1,
      totalAmount:0
      // [
      //   {
      //     ProductImage: require("../../images/products/5.jpg"),
      //     author: "Alene Trenton",
      //     authorUrl: "#",
      //     ProductCategory: "Meal",
      //     categoryTheme: "primary",
      //     authorAvatar: require("../../images/avatars/1.jpg"),
      //     categoryUrl: "#",
      //     ProductName: "Happy Dog NaturCroq Chicken And Rice",
      //     ProductDescription:
      //       "PET Wash Tools Bath Massage Brush Soft Safety Silicone dog Cat Pet Cleaning bath Brush Pet Supplies",
      //     Price: "$5.68",
      //     Stock: "18",
      //     PostedDate: "28 February 2019"
      //   }
      // ]
    };
    this.increamentStock = this.increamentStock.bind(this);
    this.decreaseStock = this.decreaseStock.bind(this);
    this.AddtoCart = this.AddtoCart.bind(this);
  }

  componentDidMount() {
    fetch('https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/product/'+this.params.get("productID"))
    .then((response) => response.json())
    .then(productList => {
        this.setState({ PostsListOne: productList });
        this.setState({ totalAmount: productList.Price });
    });
  }

  increamentStock() {
    const {
      PostsListOne,
      stock,
      // totalAmount
    } = this.state;

    if(stock === PostsListOne.Stock){
      this.setState({ stock: PostsListOne.Stock });
    }else{
      this.setState({ stock: stock+1 });
      this.setState({ totalAmount: Math.round(((stock+1)*PostsListOne.Price) * 100) / 100 });
    }
  }

  decreaseStock() {
    const {
      PostsListOne,
      stock,
      // totalAmount
    } = this.state;

    if(stock === 1){
      this.setState({ stock: 1 });
    }else{
      this.setState({ stock: stock-1 });
      this.setState({ totalAmount: Math.round(((stock-1)*PostsListOne.Price) * 100) / 100  });
    }
    
  }

  AddtoCart(){
    const {
      // PostsListOne,
      stock,
      totalAmount
    } = this.state;

    // axios
    // .post("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/doctor", postData)
    // .then((response) => {
    //   setLoading(false);
    //   alert("Your data has been successfully added...");
    //   window.location.reload();
    // })
    // .catch((error) => {
    //   setLoading(false);
    //   alert("Sorry, Something Error...");
    // });

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    fetch('https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/cart/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        PetOwnerID: localStorage.getItem("UserTypeID"),
        ProductID: this.params.get("productID"),
        Qty: stock,
        Amount: totalAmount,
        Date: date,
        Time: time,
      })
    })
    .then(res => res.json())
    .then(
      data => 
      {
        alert("Successfully Product Added to the Cart");
        this.props.history.push('/order-confirm');
      })
    .catch(err => console.log(err));

  }

  render() {
    const {
        PostsListOne,
        stock,
        totalAmount
    } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
          <div className="App pb-5"> 
              <section className="section-content padding-y bg">
              <div className="container pt-5">    
              <article className="card">
                  <div className="card-body">
                          <div className="row">
                              <aside className="col-md-6">
                                      <article className="gallery-wrap">
                                          <div className="img-big-wrap">
                                              <a href="#"> <img src={PostsListOne.ProductImage} /></a>
                                          </div> 
                                      </article>
                              </aside>
                              <main className="col-md-6">
                                  <article>
                                      <a href="#" className="text-primary btn-link">{PostsListOne.ProductCategory}</a>
                                      <h3 className="title">{PostsListOne.ProductName}</h3>
                                      <div>                                    
                                          <i className="fa fa-star text-warning"></i> <i className="fa fa-star text-warning"></i> <i className="fa fa-star text-warning"></i> <i className="fa fa-star text-warning"></i> <i className="fa fa-star"></i> <span className="label-rating mr-3 text-muted">7/10</span>
                                      </div> 
              
                                      <hr />
                          
                                      <div className="mb-3">
                                          <h6>Short description</h6>
                                          <h6>{PostsListOne.ProductDescription}</h6>
                                      </div>
                                      
                                      <div className="form-group">
                                          <span className="text-muted">{PostsListOne.Stock} pieces</span> <label className="text-success">In Stock</label>
                                          <div className="col-xl-1">
                                              <div className="input-group">
                                                  <div className="input-group-prepend">
                                                      <button className="btn btn-outline-primary" onClick={this.decreaseStock} type="button">-</button>
                                                  </div>
                                                  <input type="text" className="form-control" value={stock} disabled/>
                                                  <div className="input-group-prepend">
                                                      <button className="btn btn-outline-primary" onClick={this.increamentStock} type="button">+</button>
                                                  </div>
                                              </div>
                                          </div>           
                                      </div>
              
                                      <div className="mb-3">
                                          <p className="text-dark" style={{ fontSize: 40 }}>$ {totalAmount}</p>
                                          <span className="monthly" style={{ fontSize: 18 }}>$ {PostsListOne.Price} / piece <a href="#" className="btn-link"></a></span>
                                      </div> 
              
                                      <div className="mb-4">
                                          {/* <NavLink tag={RouteNavLink} to={"/view-productdesc"}>
                                              <Button size="sm" theme="primary" className="mr-1">
                                              Buy now
                                              </Button>
                                          </NavLink> */}
                                          <a onClick={this.AddtoCart} className="btn btn-primary mr-1">Buy now</a>
                                          <Button className="btn btn-light" onClick={this.AddtoCart} >Add to card</Button>
                                      </div>
                                      
                                  </article> 
                              </main>
                          </div> 
                  </div> 
              </article>
              </div>       
              </section>
          </div>
      </Container>
    );
  }
}

export default PetStoreItems;