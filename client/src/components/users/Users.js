import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Row, Col, Button, Alert } from "react-bootstrap";
import axios from 'axios';
import DeleteDialog from './DeleteDialog';
import UserEditable from "../tables/UserEditable";

function Users() {

  // table column
  const [cols, setCols] = useState([
    { title: 'Name', field: 'name', editable: 'onUpdate' },
    { title: 'Email', field: 'email', editable: 'never' },
  ])
  // table rows
  const [state, setstate] = useState([]);

  const [reload, setReload] = useState(false);
  
  const [msg, setMsg] = useState('');

  useEffect(() => {
      axios.get('http://localhost:4000/api/users')
      .then((res) => {
        // console.log(res.data);
        setstate(res.data.data);
      })
      .catch((e) => console.log(e));
      setMsg('');
  }, [reload]);

  
  const DelPost = (item_id) => {
    axios.delete("http://localhost:4000/api/users/" + item_id)
      .then(
        (res) => {
          setReload(!reload);
          setMsg('User was deleted successfully');
        })
      .catch((err) => console.log(err));
    }
  
  const [show, setShow] = useState(true);

  return (

 
    <UserEditable rows={state} cols={cols}  reload={reload} setReload={setReload}/>
    
  );
}

export default Users;
