import React, { useState } from "react";
import { connect } from "react-redux";

import {
    Collapse, Navbar, NavbarToggler, Nav,
    UncontrolledDropdown, DropdownToggle,
    DropdownMenu, DropdownItem
} from 'reactstrap';
import { Link } from "react-router-dom";
import { ROUTE_REGISTER, ROUTE_LOGIN, ROUTE_HOME, ROUTE_WELCOME } from "../../helpers/constants";
import { util } from "../../helpers/helper";
import { sessionService } from "../../services/session.service";



class SideBar extends React.PureComponent {
    state = {}
    componentDidMount() {
        this.props.getSessionData();
    }

    render() {
        return <div>
            <HeaderTag {...this.props} />
        </div>
    }
}
export const HeaderTag = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const { sesUser } = props

    return (
        <div>
            <Navbar color="primary" dark expand="md">
                <Link className="navbar-brand" to={ROUTE_WELCOME}>TODO_LIST</Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {!sesUser.api_token && <>
                            <li className="nav-item"><Link to={ROUTE_LOGIN} className="nav-link">Login</Link></li>
                            <li className="nav-item"><Link to={ROUTE_REGISTER} className="nav-link">Sign Up</Link></li>
                        </>}
                        {sesUser.api_token && <>

                            <li className="nav-item">
                                <Link to={ROUTE_HOME} className="nav-link">
                                    Dashboard</Link>
                            </li>



                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    My Account
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Profil
                                    </DropdownItem>
                                    <DropdownItem onClick={
                                        sessionService.logOut
                                    }>
                                        Log Out
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown></>}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default connect(util.mapStateToProps("sesUser"), null)(SideBar);
