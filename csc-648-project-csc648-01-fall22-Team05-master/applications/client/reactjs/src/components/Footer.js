import React from 'react';
import { CDBFooter, CDBFooterLink, CDBBox, CDBBtn, CDBIcon } from 'cdbreact';
import {BrowserRouter as  Router, Route,Routes, Link, Redirect } from "react-router-dom";
import Aboutus from '../pages/aboutus';

class Footer extends React.Component {
    render(){
        return(
            <div className = 'footer'>
    <CDBFooter className="shadow">
      <CDBBox display="flex" flex="column" className="mx-auto py-2" style={{ width: '90%' }}>
        <CDBBox display="flex" justifyContent="between" className="flex-wrap">
          <CDBBox>
            {/* <a href="/" className="d-flex align-items-center p-3 text-dark">
              <span className="ml-3 h5 font-weight-bold">Our community</span>
            </a> */}
            <p className="my-1" style={{ width: '250px' }}>
              Feel free to follow us
            </p>
            <CDBBox display="flex" className="mt-2">
              <CDBBtn flat color="dark">
                <CDBIcon fab icon="facebook-f" />
              </CDBBtn>
              <CDBBtn flat color="dark" className="mx-3">
                <CDBIcon fab icon="twitter" />
              </CDBBtn>
              <CDBBtn flat color="dark" className="p-2">
                <CDBIcon fab icon="instagram" />
              </CDBBtn>
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-1" style={{ fontWeight: '600' }}>
              BabyBlackjack
            </p>
            <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0' }}>
              
              {/* <CDBFooterLink href="aboutus">About Us</CDBFooterLink> */}
              <Link to="/aboutus">About Us</Link>
              
              
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-1" style={{ fontWeight: '600' }}>
              Help
            </p>
            <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0' }}>
              <CDBFooterLink href="/">Support</CDBFooterLink>
              
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-1" style={{ fontWeight: '600' }}>
              Products
            </p>
            <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0' }}>
              <CDBFooterLink href="/">loading...</CDBFooterLink>
              
            </CDBBox>
          </CDBBox>
        </CDBBox>
        <small className="text-center mt-0">&copy; Team5, 2022. All rights reserved.</small>
      </CDBBox>
    </CDBFooter>
    </div>
 );
}
}
export default Footer;