import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import 'chart.js/auto';
import Axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Grid } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Analytics View',
    },
    maintainAspectRatio: false
  },
};






function AnalyticsChart(props) {
  const plot = {
    labels: props.graphdata.name,
    datasets: [
      {
        label: 'Total Customer',
        data: props.graphdata.total_customer,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Total Amount',
        data: props.graphdata.total_amount,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  
  console.log(plot);
  
  
  return (
        <Dialog open={props.open} onClose={props.close} fullScreen>
            <DialogTitle>Analytics View</DialogTitle>
        
            <DialogContent>
            <Bar options={options} data={plot} />
            </DialogContent>
            <DialogActions>
              <Button onClick={props.close}>Cancel</Button>
            </DialogActions>
            </Dialog>
    )
}




export default function Analytics() {

    const [open, setOpen] = React.useState(false);
    const [aopen, setAOpen] = React.useState(false);
    const [data, setData] = React.useState({
        clear_date_from: "",
        clear_date_to: "",
        baseline_create_date_from: "",
        baseline_create_date_to: "",
        due_in_date_from: "",
        due_in_date_to: "",
    })
    const [graphdata, setGraphData] = React.useState({
      code: [],
      name: [],
      total_amount: [],
      total_customer: [],
      invoice_currency: []
    })


    function handleChange(e) {
        const newdata = {...data}
        newdata[e.target.name]= e.target.value
        setData(newdata)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        let response = await Axios.post("http://localhost:8081/HighRadius/Analytics", {},
        {
            headers: { 'Content-Type': 'application/json' },
            params: data,
        })
        setGraphData(response.data);
        console.log(graphdata);
        setAOpen(true);        
    }

    return (
      <div>
        <AnalyticsChart open={aopen} close={() => setAOpen(false)} graphdata={graphdata} />
        <Button
            variant="outlined"
            color="primary"
            style={{ color:'#eee', width:"155px"}}
            onClick={handleClickOpen}>
            ANALYTICS VIEW
        </Button>
        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle style={{ backgroundColor:'#283d4a', color:'#eee'}}>Analytics View</DialogTitle>
            <DialogContent style={{ backgroundColor:'#283d4a'}}>
              <Grid container md={12} lg={12} spacing={3}>
                <Grid item>
                  <p style={{ color:'#eee'}}>Clear Date</p>
                  <Grid fullWidth>
                    <TextField
                      autoFocus
                      style={{ height:'55px',backgroundColor:'white',fontSize:'4px', borderRadius:'6px' }}
                      margin="dense"
                      label="from"
                      name="clear_date_from"
                      value={data.clear_date_from}
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
                      label="to"
                      name="clear_date_to"
                      value={data.clear_date_to}
                      onChange={(e) => handleChange(e)}
                      type="date"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>

                <Grid item>
                <p style={{ color:'#eee'}}>Baseline Create Date</p>
                  <Grid>
                    <TextField
                      autoFocus
                      style={{ height:'55px',backgroundColor:'white',fontSize:'4px', borderRadius:'6px' }}
                      margin="dense"
                      label="from"
                      name="baseline_create_date_from"
                      value={data.baseline_create_date_from}
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
                      label="to"
                      name="baseline_create_date_to"
                      value={data.baseline_create_date_to}
                      onChange={(e) => handleChange(e)}
                      type="date"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>

            <Grid item>
            <p style={{ color:'#eee'}}>Due In Date</p>
              <Grid>
                <TextField
                  autoFocus
                  style={{ height:'55px',backgroundColor:'white',fontSize:'4px', borderRadius:'6px' }}
                  margin="dense"
                  label="from"
                  name="due_in_date_from"
                  value={data.due_in_date_from}
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
                  label="to"
                  name="due_in_date_to"
                  value={data.due_in_date_to}
                  onChange={(e) => handleChange(e)}
                  type="date"
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Grid item>
            <p style={{ color:'#eee'}}>Invoive Currency</p>
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
          </Grid>
            


            </DialogContent>
            <DialogActions style={{ backgroundColor:'#283d4a'}}>
              <Button style={{ color:'#eee'}} onClick={handleClose}>Cancel</Button>
              <Button style={{ color:'#eee'}} onClick={(e) => handleSubmit(e)}>Show Graph</Button>
            </DialogActions>
        </Dialog>
      </div>
  )
}
