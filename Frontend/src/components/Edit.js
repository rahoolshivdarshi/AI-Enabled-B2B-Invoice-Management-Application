import React, { useState } from "react";
import Axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from "@mui/material";


function Edit(props) {
    const [open, setOpen] = React.useState(false);

    const[editdata, setEditData] = useState({
      sl_no:"",  
      invoice_currency: "",
      cust_payment_terms: "",
    })

    function handleChange(e) {
        const newdata = {...editdata}
        newdata[e.target.name]= e.target.value
        setEditData(newdata)
    }


    async function handleSubmit(e) {
        e.preventDefault();
        let response = await Axios.post("http://localhost:8081/HighRadius/Edit", {},
        {
            headers: { 'Content-Type': 'application/json' },
            params: editdata,
        })
        props.setData(response.data)
        if(response)
          setOpen(false)
    }



    const handleClickOpen = () => {
        setOpen(true);
        console.log(props.selectedRow)
        setEditData({
          sl_no: props.selectedRow[0].sl_no,
          invoice_currency: props.selectedRow[0].invoice_currency,
          cust_payment_terms: props.selectedRow[0].cust_payment_terms,
        })
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
          disabled={props.numSelected!==1}>
            Edit
        </Button>
          
          <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle style={{ backgroundColor:'#283d4a', color:'#eee'}}>Edit</DialogTitle>
              <DialogContent style={{ backgroundColor:'#283d4a'}}>
                <Grid  container md={12} lg={12} sm={12} spacing={1}>
                  <Grid item>
                    <TextField
                      autoFocus
                      style={{ height:'55px',backgroundColor:'white',fontSize:'4px', borderRadius:'6px' }}
                      margin="dense"
                      id="name"
                      label="Customer Payment Terms"
                      name="cust_payment_terms"
                      value={editdata.cust_payment_terms}
                      onChange={(e) => handleChange(e)}
                      variant="outlined"
                    />
                  </Grid>
            
            
                  <Grid item>
                    <TextField
                      autoFocus
                      style={{ height:'55px',backgroundColor:'white',fontSize:'4px', borderRadius:'6px' }}
                      margin="dense"
                      id="name"
                      label="Invoice Currency"
                      name="invoice_currency"
                      value={editdata.invoice_currency}
                      onChange={(e) => handleChange(e)}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
            </DialogContent>


            <DialogActions style={{ backgroundColor:'#283d4a'}}>
              <Button style={{ color:'#eee'}} onClick={handleClose}>Cancel</Button>
              <Button style={{ color:'#eee'}}  onClick={handleSubmit}>Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}

export default Edit
