import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ROUTE_LOGIN, ROUTE_REGISTER, ROUTE_HOME } from "../helpers/constants";
import { connect } from "react-redux";
import { util } from "../helpers/helper";


class welcome extends Component {
    state = {}
    render() {
        var { sesUser } = this.props
        return <>
            <h1 className="text-center mt-5"> Welcome to my TODO App</h1>
            {!sesUser.api_token && <h4 className="text-center mt-4"><Link to={ROUTE_LOGIN}>Log in</Link> or <Link to={ROUTE_REGISTER}>Sign up</Link> to create and manage your TODOS.</h4>}
            {sesUser.api_token && <h4 className="text-center mt-4">
                <strong className="capitalize">{sesUser.name}</strong> take a look on your todos <Link to={ROUTE_HOME}>Here</Link>
            </h4>}
        </>;
    }
}

export default connect(util.mapStateToProps("sesUser"))(welcome);