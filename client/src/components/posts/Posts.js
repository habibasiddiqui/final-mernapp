import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Row, Col, Button, Alert } from "react-bootstrap";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import DeleteDialog from "./DeleteDialog";
import one from '../../images/1.jpg';
import PostEditable from "../tables/PostEditable";


function Posts() {

  // table column
  const [cols, setCols] = useState([
    { title: 'Title', field: 'title', editable: 'onUpdate' },
    { title: 'Body', field: 'body', editable: 'onUpdate' },
    { title: 'Image', field: 'image', editable: 'onUpdate', 
      render: rowData => <img src={rowData.imageUrl} style={{width: 40, borderRadius: '50%'}} />
    },

  ])
  // table rows
  const [state, setstate] = useState([]);
  // table row images
  const [stateImg, setStateImg] = useState('');

  // to change for useefffect whenever deletes
  const [reload, setReload] = useState(false);

  // some UI stuff
  const [msg, setMsg] = useState('');
  const [delFlag, setDelFlag] = useState(false);
  const [show, setShow] = useState(true);

  // const history = useHistory();

  useEffect(() => {
      axios.get('http://localhost:4000/api/posts')
      .then((res) => {
        console.log(res.data.data);
        setstate(res.data.data);
        setStateImg(res.data.data[0].image);
      })
      .catch((e) => console.log(e));
      setMsg('');
  }, [reload]);


  // const DelPost = (item_id) => {
  //   axios.delete("http://localhost:4000/api/posts/" + item_id)
  //     .then(
  //       (res) => {
  //         // history.push('/posts');
  //         setReload(!reload);
  //         setDelFlag(true);
  //         setMsg('Post was deleted successfully');
          
  //       })
  //     .catch((err) => console.log(err));
  // }




  return (

    <>
    <PostEditable rows={state} cols={cols} reload={reload} setReload={setReload}/>
    
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
                    to={"/edit-post/" + item._id}
                  >
                    Edit
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
    </Row>  */}
    </>
  );
}

export default Posts;
