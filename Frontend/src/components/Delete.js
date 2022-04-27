import React, { useState } from "react";
import Axios from "axios";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


function Delete(props) {
    const [open, setOpen] = useState(false);

    function handleSoftDelete() {
      const updatedData = props.data.filter(row => !props.selected.includes(row.sl_no))
      props.handleDelete(updatedData)
      setOpen(false)
    }

    async function handleDelete(e) {
        e.preventDefault();
        let response = await Axios.post("http://localhost:8081/HighRadius/Delete" , {},
        {
            headers: { 'Content-Type': 'application/json' },
            params: props.selected,
        })
        props.setData(response.data)
        if(response)
          setOpen(false)
        }
    

    const handleClickOpen = () => {
        setOpen(true);
        console.log("In deleted!")
        console.log(props.selected)
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
        <Button 
          variant="outlined"
          color="primary"
          style={{ color:'#eee', width:"140px"}}
          onClick={handleClickOpen} 
          disabled={props.numSelected===0}>
            Delete
        </Button>
          
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle style={{backgroundColor:'#283d4a', color:"white"}}>Delete Records?</DialogTitle>
        
            <DialogContent style={{backgroundColor:'#283d4a', color:"white"}} >
                <br/> Are you sure you want to delete these record[s] ? <br/>
            </DialogContent>


            <DialogActions style={{backgroundColor:'#283d4a', color:"white"}}>
              <Button style={{backgroundColor:'#283d4a', color:"white"}} onClick={handleClose}>Cancel</Button>
              <Button style={{backgroundColor:'#283d4a', color:"white"}} onClick={handleDelete}>Delete</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}

export default Delete
