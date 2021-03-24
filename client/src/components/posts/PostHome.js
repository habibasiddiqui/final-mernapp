import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Row, Col, Button, Alert, Container } from "react-bootstrap";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import DeleteDialog from "./DeleteDialog";
import { Card } from 'react-bootstrap';
import { Grid } from "@material-ui/core";

function PostHome() {
  const [state, setstate] = useState([]);

  // to change for useefffect whenever deletes
  const [reload, setReload] = useState(false);

  const [msg, setMsg] = useState('');
  const [delFlag, setDelFlag] = useState(false);
//   let [shortDesc, setShort] = useState('');


  useEffect(() => {
      axios.get('http://localhost:4000/api/posts')
      .then((res) => {
        console.log(res.data.data);
        setstate(res.data.data);
      })
      .catch((e) => console.log(e));
      setMsg('');
  }, [reload]);

//   const DelPost = (item_id) => {

//   axios.delete("http://localhost:4000/api/posts/" + item_id)
//     .then(
//       (res) => {
//         setReload(!reload);
//         setDelFlag(true);
//         setMsg('Post was deleted successfully');
        
//       })
//     .catch((err) => console.log(err));
//   }
//   if (state.length>1)
//     setShort(state.body.splice(0,250));
  
  const [show, setShow] = useState(true);


  return (
    <>
        {/* <Container fluid>
            <Row>

            </Row>
        </Container> */}
        <Grid container spacing={1}>
            
            <Grid className='post-div' item sm={12} md={8} lg={8}>
                {state.map ((item, ind) => (
                    <Card key={ind} className="text-left single-post-div">
                    <Card.Header className='title'>
                        <Card.Title>{item.title}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Grid container spacing={3}>
                            <Grid item xs={4} lg={4}  className='post-img-div'>
                                <img className='post-img' src={item.image}/>
                            </Grid>
                            <Grid item xs={8} lg={8}>
                                <Card.Text>
                                    {item.body.slice(0,100)}
                                </Card.Text>
                            </Grid>
                        </Grid>
                        
                        <Button className='submit' as={Link}
                            to={"/single-post-home/" + item._id}>
                        Continue reading
                        </Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">Posted date: dd-mm-yy</Card.Footer>
                    </Card>
                ))}
                
            </Grid>

            <Grid className='other-div' item sm={12} md={4} lg={4}>
                Other section
            </Grid>
        </Grid>
        
    {/* <Row className="mt-5">
      <Col lg={3} md={2} sm={1} xs={1}></Col>
      <Col lg={6} md={8} sm={10} xs={10}>
        <ListGroup>
          {delFlag ?
            <Alert variant="success" onClose={() => {setShow(false); setDelFlag(false)}} dismissible>
              Post was deleted successfully
            </Alert>
            : <span></span>}

          <ListGroup.Item variant="primary">
            <Row className="col-headers">
              <Col>Title</Col>
              <Col>Body</Col>
              <Col>Photo</Col>
              <Col>Actions</Col>
            </Row>
          </ListGroup.Item>

          {state.map((item, ind) => (
            <ListGroup.Item key={ind} variant="light">
              <Row>
                <Col>{item.title}</Col>
                <Col>{item.body}</Col>
                <Col><img width='100px' src={item.image}/></Col>

                <Col>
                  <Button 
                    variant="info"
                    size="sm"
                    as={Link}
                    to={"/single-post/" + item._id}
                  >
                    View
                  </Button>
                  &nbsp; &nbsp;

                  <DeleteDialog handleDelete={DelPost} id={item._id}/>
                  
                </Col>
              </Row>
            </ListGroup.Item>
          ))} 
        </ListGroup>
      </Col>
      <Col lg={3} md={2} sm={1} xs={1}></Col>
    </Row> */}

  
    
    

    </>
  );
}

export default PostHome;
