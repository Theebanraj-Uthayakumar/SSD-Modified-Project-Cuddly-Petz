import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  // ButtonGroup,
  Button,
  Row,
  Col,
  FormGroup,
  FormTextarea
} from "shards-react";

const handleCommentPost = (blogID) => {

  alert(blogID);

}


const CommentSection = ({ title, discussions,blogID }) => {

  const [comment, setComment] = useState("");

  return(
  
  <Card small className="blog-comments">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{blogID}</h6>
    </CardHeader>

    <CardBody className="p-0">
      {discussions.map((discussion, idx) => (
        <div key={idx} className="blog-comments__item d-flex p-3">
          {/* Avatar */}
          <div className="blog-comments__avatar mr-3">
            <img src={discussion.author.image} alt={discussion.author.name} />
          </div>

          {/* Content */}
          <div className="blog-comments__content">
            {/* Content :: Title */}
            <div className="blog-comments__meta text-mutes">
              <a className="text-secondary" href={discussion.author.url}>
                {discussion.author.name}
              </a>{" "}
              on{" "}
              <a className="text-secondary" href={discussion.post.url}>
                {discussion.post.title}
              </a>
              <span className="text-mutes">- {discussion.date}</span>
            </div>

            {/* Content :: Body */}
            <p className="m-0 my-1 mb-2 text-muted">{discussion.body}</p>
          </div>
        </div>
      ))}
    </CardBody>

    <CardFooter className="border-top">
          <Row form>              
              <Col lg="10">   
                <FormGroup>
                  <FormTextarea id="comment" onChange={(e)=> setComment(e.target.value)} placeholder="Tell Something about pet your condition..." />
                </FormGroup>
              </Col>
              <Col lg="2">                   
                <Button size="lg"theme="primary" onClick={(e) => handleCommentPost(blogID)}>
                  Post
                </Button>
              </Col>
          </Row>
    </CardFooter>
  </Card>
)};

CommentSection.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  blogID: PropTypes.string,
  /**
   * The discussions dataset.
   */
  discussions: PropTypes.array
};

CommentSection.defaultProps = {
  title: "Discussions",  
  blogID: "this.props.blogID",
  discussions: [
    {
      id: 1,
      date: "3 days ago",
      author: {
        image: require("../../images/avatars/1.jpg"),
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
        image: require("../../images/avatars/2.jpg"),
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
        image: require("../../images/avatars/3.jpg"),
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

export default CommentSection;
