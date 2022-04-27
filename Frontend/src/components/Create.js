import React, { useState } from "react";
import Axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from "@mui/material";


function Create(props) {

    const [open, setOpen] = React.useState(false);

    const[data, setData] = useState({
        business_code: "",
        cust_number: "",
        clear_date: "",
        business_year: "",
        doc_id: "",
        posting_date: "",
        document_create_date: "",
        due_in_date: "",
        invoice_currency: "",
        document_type: "",
        posting_id: "",
        area_business: "",
        total_open_amount: "",
        baseline_create_date: "",
        cust_payment_terms: "",
        invoice_id: ""
    })

    function handleChange(e) {
        const newdata = {...data}
        newdata[e.target.name]= e.target.value
        setData(newdata)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let response = await Axios.post("http://localhost:8081/HighRadius/Add", {},
        {
            headers: { 'Content-Type': 'application/json' },
            params: data,
        })
        props.setData(response.data)
        if(response)
          setOpen(false)
    }

    function handleClear(e) {
        setData({
        business_code: "",
        cust_number: "",
        clear_date: "",
        business_year: "",
        doc_id: "",
        posting_date: "",
        document_create_date: "",
        due_in_date: "",
        invoice_currency: "",
        document_type: "",
        posting_id: "",
        area_business: "",
        total_open_amount: "",
        baseline_create_date: "",
        cust_payment_terms: "",
        invoice_id: ""
        })
    }

    const handleClickOpen = () => {
        setOpen(true);
        setData({
            business_code: "",
            cust_number: "",
            clear_date: "",
            business_year: "",
            doc_id: "",
            posting_date: "",
            document_create_date: "",
            due_in_date: "",
            invoice_currency: "",
            document_type: "",
            posting_id: "",
            area_business: "",
            total_open_amount: "",
            baseline_create_date: "",
            cust_payment_terms: "",
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
            style={{ color:'#eee', width:"140px"}}
            onClick={handleClickOpen}>
            Add
          </Button>
          <Dialog open={open} onClose={handleClose}
            sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: "1000px",  // Set your width here
                },
              },
            }}
          >
            <DialogTitle style={{ backgroundColor:'#283d4a', color:'#eee'}}>ADD</DialogTitle>
        
            <DialogContent style={{ backgroundColor:'#283d4a'}}>
            <Grid  container md={12} lg={12} sm={12} spacing={1}>
              <Grid item>
                <Grid> 
              <TextField
                autoFocus
                style={{ height:'55px',backgroundColor:'white',fontSize:'4px', borderRadius:'6px' }}
                margin="dense"
                id="name"
                label="Business Code"
                name="business_code"
                value={data.business_code}
                onChange={(e) => handleChange(e)}
                variant="outlined"
              />
              </Grid>

              <Grid>
              <TextField
                autoFocus
                style={{ height:'55px',backgroundColor:'white',fontSize:'4px', borderRadius:'6px' }}
                margin="dense"
                id="name"
                label="Customer Number"
                name="cust_number"
                value={data.cust_number}
                onChange={(e) => handleChange(e)}
                variant="outlined"
              />
              </Grid>
            

              <Grid>
              <TextField
                autoFocus
                style={{ height:'55px',backgroundColor:'white',fontSize:'4px', borderRadius:'6px' }}
                margin="dense"
                id="name"
                label="Clear Date"
                name="clear_date"
                value={data.clear_date}
                onChange={(e) => handleChange(e)}
                type="date"
                variant="outlined"
              />
              </Grid>
            

              <Grid>
              <TextField
                autoFocus
                style={{ height:'55px',backgroundColor:'white',fontSize:'4px', borderRadius:'6px' }}
                margin="dense"
                id="name"
                label="Business Year"
                name="business_year"
                value={data.business_year}
                onChange={(e) => handleChange(e)}
                type="number"
                //fullWidth
                variant="outlined"
              />
              </Grid>
              </Grid>
            

              <Grid item>
              <Grid>
              <TextField
                autoFocus
                style={{ height:'55px',backgroundColor:'white',fontSize:'4px', borderRadius:'6px' }}
                margin="dense"
                id="name"
                label="Document ID"
                name="doc_id"
                value={data.doc_id}
                onChange={(e) => handleChange(e)}
                variant="outlined"
              />
              </Grid>

              <Grid>
              <TextField
                autoFocus
                style={{ height:'55px',backgroundColor:'white',fontSize:'4px', borderRadius:'6px' }}
                margin="dense"
                id="name"
                label="Posting Date"
                name="posting_date"
                value={data.posting_date}
                onChange={(e) => handleChange(e)}
                type="date"
                
                variant="outlined"
              />
              </Grid>

              <Grid>
              <TextField
                autoFocus
                style={{ height:'55px',backgroundColor:'white',fontSize:'4px', borderRadius:'6px' }}
                margin="dense"
                id="name"
                label="Document Create Date"
                name="document_create_date"
                value={data.document_create_date}
                onChange={(e) => handleChange(e)}
                type="date"
                
                variant="outlined"
              />
              </Grid>

              <Grid>
              <TextField
                autoFocus
                style={{ height:'55px',backgroundColor:'white',fontSize:'4px', borderRadius:'6px' }}
                margin="dense"
                id="name"
                label="Due In Date"
                name="due_in_date"
                value={data.due_in_date}
                onChange={(e) => handleChange(e)}
                type="date"
                
                variant="outlined"
              />
              </Grid>
              </Grid>

              <Grid item>
              <Grid>
              <TextField
                autoFocus
                style={{ height:'55px',backgroundColor:'white',fontSize:'4px', borderRadius:'6px' }}
                margin="dense"
                id="name"
                label="Invoice Currency"
                name="invoice_currency"
                value={data.invoice_currency}
                onChange={(e) => handleChange(e)}
                
                variant="outlined"
              />
              </Grid>

              <Grid>
              <TextField
                autoFocus
                style={{ height:'55px',backgroundColor:'white',fontSize:'4px', borderRadius:'6px' }}
                margin="dense"
                id="name"
                label="Document Type"
                name="document_type"
                value={data.document_type}
                onChange={(e) => handleChange(e)}
                
                variant="outlined"
              />
              </Grid>

              <Grid>
              <TextField
                autoFocus
                style={{ height:'55px',backgroundColor:'white',fontSize:'4px', borderRadius:'6px' }}
                margin="dense"
                id="name"
                label="Posting ID"
                name="posting_id"
                value={data.posting_id}
                onChange={(e) => handleChange(e)}
                type="number"
                
                variant="outlined"
              />
              </Grid>
              <Grid>
              <TextField
                autoFocus
                style={{ height:'55px',backgroundColor:'white',fontSize:'4px', borderRadius:'6px' }}
                margin="dense"
                id="name"
                label="Total Open Amount"
                name="total_open_amount"
                value={data.total_open_amount}
                onChange={(e) => handleChange(e)}
                type="number"
                
                variant="outlined"
              />
              </Grid>
              
              </Grid>

              <Grid item>
              

              <Grid>
              <TextField
                autoFocus
                style={{ height:'55px',backgroundColor:'white',fontSize:'4px', borderRadius:'6px' }}
                margin="dense"
                id="name"
                label="Baseline Create Date"
                name="baseline_create_date"
                value={data.baseline_create_date}
                onChange={(e) => handleChange(e)}
                type="date"
                
                variant="outlined"
              />
              </Grid>

              <Grid>
              <TextField
                autoFocus
                style={{ height:'55px',backgroundColor:'white',fontSize:'4px', borderRadius:'6px' }}
                margin="dense"
                id="name"
                label="Customer Payment Terms"
                name="cust_payment_terms"
                value={data.cust_payment_terms}
                onChange={(e) => handleChange(e)}
                
                variant="outlined"
              />
              </Grid>

              <Grid>
              <TextField
                autoFocus
                style={{ height:'55px',backgroundColor:'white',fontSize:'4px', borderRadius:'6px' }}
                margin="dense"
                id="name"
                label="Invoice ID"
                name="invoice_id"
                value={data.invoice_id}
                onChange={(e) => handleChange(e)}
                //type="email"
                //fullWidth
                variant="outlined"
              />
              </Grid>
              </Grid>
              </Grid>
            </DialogContent>
            <DialogActions style={{ backgroundColor:'#283d4a'}}>
              <Button style={{ color:'#eee'}} onClick={handleClose}>Cancel</Button>
              <Button style={{ color:'#eee'}} onClick={handleSubmit}>Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}

export default Create