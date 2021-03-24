import React from "react";
import { useEffect, useState } from "react";
import { ListGroup, Row, Col, Button } from "react-bootstrap";
import { TextField, InputAdornment, IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

// const useStyles = makeStyles(theme => ({
//   disabled: {
//     color: "black",
//     borderBottom: 0,
//     "&:before": {
//       borderBottom: 0
//     }
//   },
// }));
const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  // for edit
  let [title, setTitle] = useState('');
  let [body, setBody] = useState('');
  let [image, setImage] = useState('');
  
  // const classes = useStyles();

  useEffect(() => {
    fetch("http://localhost:4000/api/posts/" + id)
      .then((res) => res.json())
      .then((data) => {
        setPost(data.data); 
      })
      .catch((err) => console.log(err));
  }, [id]);
  console.log(title, body, image);

  // update
  // const handleEdit = () => {
  //   const editTitle = prompt("new title", post?.title);
  //   setPost({
  //     title: editTitle,
  //   })
  //   console.log(post);
  // } 

  // let [mouseEnter, setMouseEnter] = useState(false);
  // let [editMode, setEditMode] = useState(false);

  return (
    <Row className="mt-5">
      <Col lg={3} md={2} sm={1} xs={1}></Col>
      <Col lg={6} md={8} sm={10} xs={10}>
        <ListGroup>
          <ListGroup.Item variant="primary" className="col-headers">
            Selected Post Information
          </ListGroup.Item>
          <ListGroup.Item variant="light">
            <Row>
              <Col className="col-headers">ID</Col>
              <Col>{post?._id}</Col>
            </Row>
            <Row>
              <Col className="col-headers">Title</Col>
              <Col>{post?.title}</Col>
            </Row>
            <Row>
              <Col className="col-headers">Body</Col>
              <Col>{post?.body}</Col>
            </Row>
            <Row>
              <Col className="col-headers">Image</Col>
              <Col><img src={post?.image} width='100px'/></Col>
            </Row>

            {/* <TextField
              // defaultValue={post?.title}
              value={title}
              margin="normal"
              onChange={(e)=>setTitle(e.target.value)}
              // disabled={!editMode}
              // className={classes.textField}
              onMouseEnter={() => {setMouseEnter(true); }}
              onMouseLeave={() => {setMouseEnter(false); }}
              InputProps={{
                // classes: {
                //   disabled: classes.disabled
                // },
               
                endAdornment: mouseEnter ? (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setEditMode(true) } >
                      <EditIcon />
                    </IconButton>
                  </InputAdornment>
                ) : (
                  ""
                )
                
          }}
        /> */}

{/* 
            <Row className="my-2">
                <Col className="text-center">
                  <Button type='submit' variant="info" size="md">
                    Done
                  </Button>
                </Col>
            </Row> */}

            
            <Row className="my-2">
                <Col className="text-center">
                  <Button variant="info"
                    size="sm"
                    as={Link}
                    to={"/edit-post/" + post?._id}>
                      Edit
                  </Button>
                </Col>
            </Row>
            
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col lg={3} md={2} sm={1} xs={1}></Col>
    </Row>
  );
};

export default SinglePost;
