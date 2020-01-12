import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { getSessionData } from "../../session/actions";
import {
    Collapse, Navbar, NavbarToggler, Nav,
    UncontrolledDropdown, DropdownToggle,
    DropdownMenu, DropdownItem
} from 'reactstrap';
import { ROUTE_REGISTER, ROUTE_LOGIN, ROUTE_HOME, ROUTE_WELCOME, ROUTE_PROFILE } from "../../helpers/constants";
import { util } from "../../helpers/helper";
import { sessionService } from "../../services/session.service";



class Header extends React.PureComponent {
    state = {}
    componentDidMount() {
        //this.props.getSessionData();
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
                <a className="navbar-brand" href={ROUTE_HOME}>TODO_LIST</a>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {sesUser && !sesUser.userId && <>
                            <li className="nav-item"><a href={ROUTE_LOGIN} className="nav-link">Login</a></li>
                            <li className="nav-item"><a href={ROUTE_REGISTER} className="nav-link">Sign Up</a></li>
                        </>}
                        {sesUser && sesUser.userId && <>
                            <li className="nav-item"><a href={ROUTE_HOME} className="nav-link">Dashboard</a></li>

                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    My Account
                            </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <a href={ROUTE_PROFILE}>Profile</a>
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

export default connect(util.mapStateToProps("sesUser"), {})(Header);
