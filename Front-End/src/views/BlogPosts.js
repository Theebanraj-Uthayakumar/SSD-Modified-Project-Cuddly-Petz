import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Button,
  ButtonGroup,
  FormInputGroup,
  FormInput
} from "shards-react";
import PageTitle from "../components/common/PageTitle";
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavLink } from "shards-react";
class BlogPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postsListOne: [],
      postsListTwo: [],
      searchQuery: ""
    };
  }


  componentDidMount() {
    fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/blog?BlogType=Blog")
      .then(response => response.json())
      .then(blogList => {
        this.setState({ postsListOne: blogList });
      });

    fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/blog?BlogType=Article")
      .then(response => response.json())
      .then(blogList2 => {
        this.setState({ postsListTwo: blogList2 });
      });
  }

  handleSearch = event => {
    this.setState({ searchQuery: event.target.value });
  };

  filterPosts = posts => {
    const { searchQuery } = this.state;

    return posts.filter(post =>
      post.Title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  render() {
    const { postsListOne, postsListTwo, searchQuery } = this.state;

    const filteredPostsListOne = this.filterPosts(postsListOne);
    const filteredPostsListTwo = this.filterPosts(postsListTwo);

    
    const deleteBlog = ID => {
      if (window.confirm("Do you realy want to delete the blog") === true) {

        fetch(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/blog/${ID}`, {
          method: "DELETE"
        })
        .then(data => {
          alert('Blog Removed');
          this.componentDidMount();
          //console.error(data);
          //window.location.reload();
        })
        .catch(error => {
          console.error("Error inserting Blog:", error);
        });
  
      } else {     
        alert('Blog Saved');
      }

    };

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <Col lg="10">
            <PageTitle
              sm="4"
              title="Blog Posts"
              subtitle="Blog"
              className="text-sm-left"
            />
          </Col>
          <Col lg="2">

            
            <NavLink tag={RouteNavLink} to={"/add-new-blog"}>
              <Button size="lg" theme="primary" className="float-end">
                <i className="far fa-edit mr-1" /> New Blog
              </Button>
            </NavLink>
          </Col>
        </Row>

         {/* Search Bar */}
         <Row className="mb-3">
          <Col>
            <FormInput
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={this.handleSearch}
            />
          </Col>
        </Row>

        {/* Third Row of Posts */}
        <Row>
          {filteredPostsListOne.map((post, idx) => (
            <Col lg="12" key={idx}>
              <Card small className="card-post mb-4">
                <CardBody>
                  <h5 className="card-title">{post.Title}</h5>
                  <p className="card-text text-muted">{post.Description}</p>
                </CardBody>
                <CardFooter className="border-top d-flex">
                  <div className="card-post__author d-flex">
                    <a
                      href="#"
                      className="card-post__author-avatar card-post__author-avatar--small"
                      style={{
                        backgroundImage: `url('${require("../images/avatars/1.jpg")}')`
                      }}
                    >
                      Written by James Khan
                    </a>
                    <div className="d-flex flex-column justify-content-center ml-3">
                      <span className="card-post__author-name">
                        {post.PostedBy}
                      </span>
                      <small className="text-muted">{post.PostedDate}</small>
                    </div>
                  </div>
                  <div className="my-auto ml-auto">
                    <Button href={post.ImageUrl} className="ml-2" theme="primary">
                      <span className="text-dark">
                        <i className="material-icons">image</i>
                      </span>{"  "}
                      View Image
                    </Button>
                    <Button className="ml-4" style={localStorage.getItem("UserType") == "Admin" ? { display: '' } : {display: 'none' }}  theme="danger" onClick={() => deleteBlog(post._id)}>
                      <span className="text-warning">
                        <i className="material-icons">delete</i>
                      </span>{"  "}
                      Reject
                    </Button>
                    <NavLink tag={RouteNavLink} to={`/blog-comments?blogID=${post._id}`}>
                      <Button size="sm" theme="white" className="mb-2">
                        <i className="far fa-edit mr-1" /> Comments
                      </Button>
                    </NavLink>
                  </div>
                  
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <Col lg="10">
            <PageTitle
              sm="4"
              title="Article Posts"
              subtitle="Article"
              className="text-sm-left"
            />
          </Col>
          <Col lg="2">
            <NavLink tag={RouteNavLink} to={"/add-new-blog"}>
              <Button size="lg" theme="info" className="float-end">
                <i className="far fa-edit mr-1" /> New Article
              </Button>
            </NavLink>
          </Col>
        </Row>

        {/* Third Row of Posts */}
        <Row>
          {filteredPostsListTwo.map((post, idx) => (
            <Col lg="12" key={idx}>
              <Card small className="card-post mb-4">
                <CardBody>
                  <h5 className="card-title">{post.Title}</h5>
                  <p className="card-text text-muted">{post.Description}</p>
                </CardBody>
                <CardFooter className="border-top d-flex">
                  <div className="card-post__author d-flex">
                    <a
                      href="#"
                      className="card-post__author-avatar card-post__author-avatar--small"
                      style={{
                        backgroundImage: `url('${require("../images/avatars/3.jpg")}')`
                      }}
                    >
                      Written by James Khan
                    </a>
                    <div className="d-flex flex-column justify-content-center ml-3">
                      <span className="card-post__author-name">
                        {post.PostedBy}
                      </span>
                      <small className="text-muted">{post.PostedDate}</small>
                    </div>
                  </div>
                  <div className="my-auto ml-auto">
                    <Button href={post.ImageUrl} className="ml-2" theme="primary">
                      <span className="text-dark">
                        <i className="material-icons">image</i>
                      </span>{"  "}
                      View Image
                    </Button>
                    <Button className="ml-4" style={localStorage.getItem("UserType") == "Admin" ? { display: '' } : {display: 'none' }}  theme="danger" onClick={() => deleteBlog(post._id)}>
                      <span className="text-warning">
                        <i className="material-icons">delete</i>
                      </span>{"  "}
                      Reject   
                    </Button>
                    <NavLink tag={RouteNavLink} to={`/blog-comments?blogID=${post._id}`}>
                      <Button size="sm" theme="white" className="mb-2">
                        <i className="far fa-edit mr-1" /> Comments
                      </Button>
                    </NavLink>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default BlogPosts;
