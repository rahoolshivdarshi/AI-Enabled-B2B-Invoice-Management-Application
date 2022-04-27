// import React from 'react';
// import { Grid, makeStyles } from '@material-ui/core';
// import logoCompany from '../assets/logoCompany.svg';
// import logoHRC from '../assets/logoHRC.svg';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     background: '#2d4250',
//     flexGrow: 1,
//   },
//   companyImg: {
//     display: 'block',
//     maxWidth: '65%',
//     maxHeight: '65%',
//   },
//   hrcImg: {
//     display: 'block',
//     maxWidth: '56%',
//     maxHeight: '56%',
//   },
// }));


// function Header(){
//     const classes = useStyles();
//     return (
//         <div className={classes.root}>
//             <Grid container justify="flex-start" style={{height: '70px'}}>
//                 <Grid 
//                 item
//                 xs={3}
//                 sm={3}
//                 lg={3}
//                 justify="flex-start"
//                 alignItems="center"
//                 style={{
//                     display: 'flex',
//                     marginLeft: '1.563vw',
//                 }}>
//                     <img src={logoCompany} alt="companyLogo" className={classes.companyImg}/>
//                 </Grid>
//                 <Grid 
//                     item
//                     xs={3}
//                     sm={3}
//                     lg={3}
//                     direction="row"
//                     justify="center"
//                     alignItems="center"
//                     style={{
//                         display: 'flex', 
//                         marginLeft: '10.4vw'
//                     }}>
//                     <img src={logoHRC} alt="HighRadius Logo" className={classes.hrcImg}/>
//                 </Grid>
//             </Grid>       
//         </div>
//     );
// }

// export default Header;

import React from 'react'
import logoCompany from '../assets/logoCompany.svg';
import logoHRC from '../assets/logoHRC.svg';
//import img1 from '../images/abc_products.png';
//import img2 from '../images/hrc_logo.png';
//import './style.css'

export default function Header() {
  return (
    <div style={{  backgroundColor:'#2d4250', padding:"20px"}}>
      <img className="image1" src={logoCompany} alt={"image1"} />
      <img className="image2" style={{ marginLeft: "20rem" }} src={logoHRC} alt={"image2"} />
      <h2 style={{ color: "white", margin: "0px", paddingTop:"10px"}}>Invoice List</h2>
    </div>
  )
}