import React, { useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { tableIcons } from "./tableIcons";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  InputAdornment,
  Typography,
  Button,
} from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AddDialog from "../users/AddDialog";
import EditDialog from "../users/EditDialog";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

// ////////////////////////////////////////////////////////////////////////////////////////
function UserEditable({rows, cols, reload, setReload}) {
  const classes = useStyles();

  // table column data
  const [columns, setColumns] = useState([]);
  // table row data
  const [data, setData] = useState([]);

  // for edit
  const [editData, setEditData] = useState('');

  useEffect(() => {
    setData(rows);
    setColumns(cols);
  }, [rows]);

  // for add dialog box
  const [addOpen, setAddOpen] = useState(false);

  const handleAddOpen = () => {
    setAddOpen(true);
  };
  const handleAddClose = () => {
    setAddOpen(false);
  };

  // for edit dialog box
  const [editOpen, setEditOpen] = useState(false);

  const handleEditOpen = (data) => {
    //   console.log(data);
      setEditData(data);
    setEditOpen(true);

  };
  const handleEditClose = () => {
    setEditOpen(false);
  };




  // delete
  const handleDelete = (data) => {
    console.log(data);
    let row_id = data._id;
    axios.delete(`http://localhost:4000/api/users/${row_id}`)
    .then(
      res => {
        console.log('deleted successfully')
      }
    )
    .catch(
      e => console.log(e)
    )
  }

  return (
    <>
      <AddDialog
        open={addOpen}
        setOpen={setAddOpen}
        reload={reload}
        setReload={setReload}
        handleClose={handleAddClose}
      />

      <EditDialog 
        open={editOpen}
        setOpen={setEditOpen}
        handleClose={handleEditClose}
        oldData={editData}
      />
      

      <MaterialTable
        icons={tableIcons}
        title={`All Users Information`}
        columns={columns}
        data={data}
        actions={[
          {
            icon: tableIcons.Add,
            tooltip: "Add User",
            isFreeAction: true,
            onClick: handleAddOpen,
          },
          rowData => ({
              icon: tableIcons.Edit,
              tooltip: 'Edit',
              onClick: () => handleEditOpen(rowData),
          })
        ]}
        options={{
          headerStyle: {
            // backgroundColor: "#5ddef4",
            // backgroundColor: '#ff9e80',
            color: "#00",
            fontSize: "18px",
            fontWeight: 'bold'
          },
          actionsColumnIndex: -1,
          addRowPosition: 'last',
        }}
        editable={{
        //   onRowUpdate: (newData, oldData) =>
        //     new Promise((resolve, reject) => {
        //       setTimeout(() => {
        //         const dataUpdate = [...data];
        //         const index = oldData.tableData.id;
        //         dataUpdate[index] = newData;
        //         setData([...dataUpdate]);
        //         handleEdit(newData, oldData);
        //         resolve();
        //       }, 1000);
        //     }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                handleDelete(oldData);
                resolve();
              }, 1000);
            }),
        }}
      />
    </>
  );
}

export default UserEditable;
