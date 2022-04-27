import React from "react";
import axios from "axios";
import Axios from "axios";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


function Predict(props) {
    const [open, setOpen] = React.useState(false);

    async function handleClickOpen(e) {
        e.preventDefault();
        var final;
        const list = props.selectedRow.map((n) => parseInt(n.doc_id));
        const doc_id_list = {
          data: list
        };
        let response = await axios({
            url: "http://127.0.0.1:5000/get_prediction",
            method: 'post',
            data: doc_id_list
        });

        var j = 0;
        response.data = response.data.map((n) => ({
          doc_id: parseInt(n.doc_id),
          aging_bucket: n.aging_bucket
        }))
        while(j<Object.keys(response.data).length)
        {
          final = await Axios.post("http://localhost:8081/HighRadius/updateAgingBucket", {},
          {
            headers: { 'Content-Type': 'application/json' },
            params: response.data[j],
          })
          j++;
        }

        const retdoc = response.data.map((n) => parseInt(n.doc_id));
        const remaining = doc_id_list.data.filter((n) => (!retdoc.includes(n)));
        if(remaining.length !== 0)
        {
            const datall = props.selectedRow.filter((n) => remaining.includes(parseInt(n.doc_id)))
            .map((n) => ({
              business_code: n.business_code,
              cust_number: n.cust_number,
              name_customer: "HighRadius",
              clear_date: n.clear_date,
              buisness_year: n.business_year,
              doc_id: n.doc_id,
              posting_date: n.posting_date,
              due_in_date: n.due_in_date,
              baseline_create_date: n.baseline_create_date,
              cust_payment_terms: n.cust_payment_terms,
              converted_usd: n.invoice_currency==='CAD'? n.total_open_amount*27:n.total_open_amount,
            }));

            
            var i = 0;
            while(i<Object.keys(datall).length)
            {
                let response = await axios({
                url: "http://127.0.0.1:5000/",
                method: 'post',
                data: datall[i]
              });
              final = await Axios.post("http://localhost:8081/HighRadius/updateAgingBucket", {},
              {
                headers: { 'Content-Type': 'application/json' },
                params: response.data[0],
              })
              i++;
            }
          }
        
        final = await Axios.get("http://localhost:8081/HighRadius/Fetch");
    
        props.setData(final.data)
        if(final)
          setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
        <Button 
            variant='contained' 
            style={{ color:'#eee', width:"155px"}} 
            color='primary'
            onClick={handleClickOpen}
            disabled={props.selectedRow.length===0} >
                Predict
        </Button>
          
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle style={{backgroundColor:'#283d4a', color:"white"}} >Prediction</DialogTitle>
            <DialogContent style={{backgroundColor:'#283d4a', color:"white"}}>
              Prediction data updated successfully
            </DialogContent>
            <DialogActions style={{backgroundColor:'#283d4a', color:"white"}} >
              <Button style={{backgroundColor:'#283d4a', color:"white"}} onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}

export default Predict
