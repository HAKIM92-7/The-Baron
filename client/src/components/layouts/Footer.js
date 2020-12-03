import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import {Link} from 'react-router-dom';



const Footer = () => {
  return (
    <MDBFooter color="grey" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="4"  >
            <img src='https://upload.wikimedia.org/wikipedia/commons/c/c7/B-logo-1.png' alt="" 
            style={{width:'100px',height:'100px',marginLeft:'20px'}}/>
            <h5 className="title">The Baron</h5>
            <p>
             The best choice to customize your brand.
            </p>
          </MDBCol>
          <MDBCol md="4">
            <h5 className="title">Links</h5>
            <ul>
              <li className="list-unstyled">
                <Link to="/">Home</Link>
              </li>
              
              <li className="list-unstyled">
              <Link to="/register">Register</Link>
              </li>
              <li className="list-unstyled">
              <Link to="/login">login</Link>
              </li>
              <li className="list-unstyled">
              <Link to="/loginSeller">Login as a seller</Link>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="4"  >
          <h5 className="title">How to Find Us</h5>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.1998823245244!2d9.868722315266503!3d37.27046224878622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e31e4d1c547efd%3A0x36b6a07b7258bcf6!2sAgence%20BAROUNI%20Adel%2C%20ZITOUNA%20TAKAFUL!5e1!3m2!1sfr!2stn!4v1607034080986!5m2!1sfr!2stn" 
          style={{width:"600", height:"450" , frameborder:"0" ,border:"0"}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="http://localhost:3000/"> TheBaron.com</a>
        </MDBContainer>
      </div>

    </MDBFooter>
  );
}

export default Footer;
