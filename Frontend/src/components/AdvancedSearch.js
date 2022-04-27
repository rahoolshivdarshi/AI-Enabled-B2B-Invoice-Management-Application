import React, { useState } from "react";
import Axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from "@mui/material";


function AdvancedSearch(props) {

    const[open, setOpen] = React.useState(false);

    const[searchData, setSearchData] = useState({
        customer_number: "",
        business_year: "",
        document_id: "",
        invoice_id: ""
    })

    function handleChange(e) {
        const newdata = {...searchData}
        newdata[e.target.name]= e.target.value
        setSearchData(newdata)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let response = await Axios.post("http://localhost:8081/HighRadius/advancedSearch", {},
        {
            headers: { 'Content-Type': 'application/json' },
            params: searchData,
        })
        props.setData(response.data)
        if(response)
          setOpen(false)
    }

    const handleClickOpen = () => {
        setOpen(true);
        setSearchData({
            customer_number: "",
            business_year: "",
            document_id: "",
            invoice_id: ""
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
            style={{ color:'#eee', width:"170px"}}
            onClick={handleClickOpen}>
            Advance Search
          </Button>
          <Dialog open={open} onClose={handleClose} fullWidth >
            <DialogTitle style={{ backgroundColor:'#283d4a', color:'#eee'}}>Advance Search</DialogTitle>
            <DialogContent style={{ backgroundColor:'#283d4a'}}>
            <Grid  container md={12} lg={12} spacing={4}>
            <Grid item>
              <TextField
                style={{ height:'55px',backgroundColor:'white',fontSize:'4px', borderRadius:'6px' }}
                autoFocus
                margin="dense"
                id="name"
                label="Customer Number"
                name="customer_number"
                value={searchData.customer_number}
                onChange={(e) => handleChange(e)}
                variant="outlined"
              />
              </Grid>
              
              <Grid item>
              <TextField
                style={{ height:'55px',backgroundColor:'white',fontSize:'4px', borderRadius:'6px' }}
                autoFocus
                margin="dense"
                id="name"
                label="Business Year"
                name="business_year"
                value={searchData.business_year}
                onChange={(e) => handleChange(e)}
                type="number"
                variant="outlined"
              />
              </Grid>
            
             <Grid item>
              <TextField
                style={{ height:'55px',backgroundColor:'white',fontSize:'4px', borderRadius:'6px' }}
                autoFocus
                margin="dense"
                id="name"
                label="Document ID"
                name="document_id"
                value={searchData.document_id}
                onChange={(e) => handleChange(e)}
                variant="outlined"
              />
              </Grid>
        
              <Grid item>
              <TextField
                style={{ height:'55px',backgroundColor:'white',fontSize:'4px', borderRadius:'6px' }}
                autoFocus
                margin="dense"
                id="name"
                label="Invoice ID"
                name="invoice_id"
                value={searchData.invoice_id}
                onChange={(e) => handleChange(e)}
                variant="outlined"
              />
              </Grid>
            </Grid>
            </DialogContent>
        
            <DialogActions style={{ backgroundColor:'#283d4a'}}>
              <Button style={{ color:'#eee'}} onClick={handleClose}>Cancel</Button>
              <Button style={{ color:'#eee'}} onClick={(e) => handleSubmit(e)}>Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}

export default AdvancedSearch