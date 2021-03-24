import React from "react";
import { useEffect, useState } from "react";
import { ListGroup, Row, Col, Button } from "react-bootstrap";
import { TextField, InputAdornment, IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import axios from "axios";

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  // for edit
  let [title, setTitle] = useState('');
  let [body, setBody] = useState('');
  let [image, setImage] = useState('');
  let [user, setUser] = useState('');


  // update
  const handleEdit = (e) => {
    e.preventDefault()
    let newPost = {title, body ,image}
    console.log(newPost)
    axios.post('http://localhost:4000/api/posts/update/'+id, newPost)
    .then(res => console.log(res))
    .catch(err => console.log(err, 'error'));
  } 

  useEffect(() => {
    fetch("http://localhost:4000/api/posts/" + id)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data); 
        setTitle(data.data.title);
        setBody(data.data.body);
        setImage(data.data.image);
      })
      .catch((err) => console.log(err));
  }, [id]);

  

  return (
    <form onSubmit={handleEdit}>
    <Row className="mt-5">
      <Col lg={3} md={2} sm={1} xs={1}></Col>
      <Col lg={6} md={8} sm={10} xs={10}>
        <ListGroup>
          <ListGroup.Item variant="primary" className="col-headers">
            Selected Post Information
          </ListGroup.Item>
          <ListGroup.Item variant="light">
            {/* <Row>
              <Col className="col-headers">ID</Col>
              <Col>{post?._id}</Col>
            </Row> */}
            <Row>
              <Col className="col-headers">Title</Col>
              <Col>
                <input type='text' value={title} 
                  onChange={e => setTitle(e.target.value)} 
                />
              </Col>
            </Row>
            <Row>
              <Col className="col-headers">Body</Col>
              <Col>
                <textarea type='text' value={body} rows='5' style={{width:'100%'}}
                  onChange={e => setBody(e.target.value)}                
                ></textarea>
              </Col>
            </Row>
            <Row>
              <Col className="col-headers">Image</Col>
              <Col><img src={image} width='100px'/>
              <FileBase64
                    multiple={false}
                    onDone={({base64})=>setImage(base64)}>

              </FileBase64></Col>
            </Row>

            

            <Row className="my-2">
                <Col className="text-center">
                  <Button type='submit' variant="info" size="md">
                    Done
                  </Button>
                </Col>
            </Row>

            
            {/* <Row className="my-2">
                <Col className="text-center">
                  <Button variant="info"
                    size="sm"
                    as={Link}
                    to={"/edit-post/" + post?._id}>
                      Edit
                  </Button>
                </Col>
            </Row> */}
            
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col lg={3} md={2} sm={1} xs={1}></Col>
    </Row>
    </form>
  );
};

export default EditPost;
