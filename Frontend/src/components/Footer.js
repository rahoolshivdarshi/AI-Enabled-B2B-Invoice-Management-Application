import React from "react";
//import { Grid } from "@mui/material";

function Footer(props) {
    return (
        <div style={{display: "flex",
            justifyContent: "center",
            height: "8.36rem",
            padding: "1.5rem",
            backgroundColor:'#2d4250'}}>
           
            <a href="##" style={{ color: "blue" }}>
                Privacy Policy
            </a>
            &nbsp;
            <span style={{ color: "white" }}>
                | &#169; 2022 HighRadius Corporation. All rights reserved.
            </span>
            
        </div>
    );
}

export default Footer;
