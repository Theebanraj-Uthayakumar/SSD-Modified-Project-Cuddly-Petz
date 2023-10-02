/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  FormGroup,
  FormTextarea,
  ButtonGroup
} from "shards-react";
import PageTitle from "../components/common/PageTitle";

class BlogComments extends React.Component {
  constructor(props) {
    super(props);

    this.params = new URLSearchParams(window.location.search);
    this.state = {
      // Third list of posts.
      PostsListThree: [
        // {
        //   author: "John James",
        //   authorAvatar: require("../images/avatars/1.jpg"),
        //   title: "Had denoting properly jointure which well books beyond",
        //   body:
        //     "In said to of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom work...",
        //   date: "29 February 2019"
        // }
      ],
      Comment: "",
      comments: [
        {
          id: 1,
          date: "3 days ago",
          author: {
            image: require("../images/avatars/1.jpg"),
            name: "John Doe",
            url: "#"
          },
          post: {
            title: "Hello World!",
            url: "#"
          },
          body: "Well, the way they make shows is, they make one show ..."
        },
        {
          id: 2,
          date: "4 days ago",
          author: {
            image: require("../images/avatars/2.jpg"),
            name: "John Doe",
            url: "#"
          },
          post: {
            title: "Hello World!",
            url: "#"
          },
          body: "After the avalanche, it took us a week to climb out. Now..."
        },
        {
          id: 3,
          date: "5 days ago",
          author: {
            image: require("../images/avatars/3.jpg"),
            name: "John Doe",
            url: "#"
          },
          post: {
            title: "Hello World!",
            url: "#"
          },
          body: "My money's in that office, right? If she start giving me..."
        }
      ]
    };
  }

  componentDidMount() {
    fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/blog/" + this.params.get("blogID"))
      .then(response => response.json())
      .then(blogList => {
        this.setState({
          PostsListThree: blogList
        });
      });

    fetch(
      "https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/comments/?BlogID=" +this.params.get("blogID")
    )
      .then(response => response.json())
      .then(commentsList => {
        this.setState({
          comments: commentsList
        });
      });
  }

  handleCommentPost = event => {
    const { Comment, PostsListThree } = this.state;

    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    var commentdata = {
      BlogID: PostsListThree._id,
      CommentID: "",
      Comment: Comment,
      CommentedBy: localStorage.getItem("UserTypeID"),
      CommentedTime: time,
      CommentedDate: date,
      UserType: localStorage.getItem("Username"),
      CreateDate: date,
      CreateTime: time
    };

    fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(commentdata)
    })
      .then(response => response.json())
      .then(data => {
        //alert('Successfully Doctor Registered');
        //console.error(data);
        //window.location.reload();
        this.componentDidMount();
      })
      .catch(error => {
        console.error("Error inserting Doctor record:", error);
      });
  };
  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.id;

    this.setState({
      [name]: value
    });
  };

  render() {
    const {
      // PostsListOne,
      // PostsListTwo,
      PostsListThree,
      // Comment,
      // blogID,
      comments

      // PostsListFour
    } = this.state;

    const deleteComments = ID => {
      if (window.confirm("Do you realy want to reject the comment") === true) {

        fetch(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/comments/${ID}`, {
          method: "DELETE"
        })
        .then(data => {
          alert('Comment Removed');
          this.componentDidMount();
          //console.error(data);
          //window.location.reload();
        })
        .catch(error => {
          console.error("Error inserting Doctor record:", error);
        });
  
      } else {     
        alert('Comment Saved');
      }

    };

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <Col lg="12">
            <PageTitle
              sm="4"
              title="Comments Section"
              subtitle="Comments"
              className="text-sm-left"
            />
          </Col>
        </Row>

        {/* Third Row of Posts */}
        <Row>
          <Col lg="12" key={PostsListThree._id}>
            <Card small className="card-post mb-4">
              <CardBody>
                <h5 className="card-title">{PostsListThree.Title}</h5>
                <p className="card-text text-muted">
                  {PostsListThree.Description}
                </p>
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
                      {PostsListThree.PostedBy}
                    </span>
                    <small className="text-muted">
                      {PostsListThree.PostedDate}
                    </small>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row noGutters className="page-header py-4">
          <Col lg="12">
            {/* <CommentSection blogID={PostsListThree._id} /> */}
            <Card small className="blog-comments">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Comments</h6>
              </CardHeader>

              <CardBody className="p-0">
                {comments.map((discussion, idx) => (
                  <div
                    key={idx}
                    className={
                      discussion.CommentedBy === localStorage.getItem("UserTypeID")
                        ? "blog-comments__item d-flex p-3 bg-dark"
                        : "blog-comments__item d-flex p-3"
                    }
                  >
                    {/* Avatar */}
                    <div className="blog-comments__avatar mr-3">
                      <img
                        src={require("../images/avatars/2.jpg")}
                        alt={discussion.CommentedBy}
                      />
                    </div>

                    {/* Content */}
                    <div className="blog-comments__content">
                      {/* Content :: Title */}
                      <div className="blog-comments__meta text-mutes">
                        <a className="text-secondary">
                          {discussion.UserType}
                        </a>{" "}
                        on <a className="text-secondary">Comment</a>
                        <span className="text-mutes">
                          - {discussion.CommentedDate}
                        </span>
                      </div>

                      {/* Content :: Body */}
                      
                      <p className="m-0 my-1 mb-2 text-muted">
                        {discussion.Comment}
                      </p>

                      {/* Content :: Actions */}
                      <div style={localStorage.getItem("UserType") == "Admin" ? { display: '' } : {display: 'none' }} className="blog-comments__actions">
                        <ButtonGroup size="sm">
                          {/* <Button theme="white">
                            <span className="text-success">
                              <i className="material-icons">check</i>
                            </span>{" "}
                            Approve
                          </Button> */}
                          <Button theme="white" onClick={() => deleteComments(discussion._id)}>
                            <span className="text-danger">
                              <i className="material-icons">clear</i>
                            </span>{" "}
                            Reject
                          </Button>
                          {/* <Button theme="white">
                            <span className="text-light">
                              <i className="material-icons">more_vert</i>
                            </span>{" "}
                            Edit
                          </Button> */}
                        </ButtonGroup>
                      </div>
                    </div>
                  </div>
                ))}
              </CardBody>

              <CardFooter className="border-top">
                <Row form>
                  <Col lg="10">
                    <FormGroup>
                      <FormTextarea
                        id="Comment"
                        value={this.state.Comment}
                        onChange={this.handleChange}
                        placeholder="Tell Something about pet your condition..."
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="2">
                    <Button
                      size="lg"
                      theme="primary"
                      onClick={this.handleCommentPost}
                    >
                      Post
                    </Button>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default BlogComments;
