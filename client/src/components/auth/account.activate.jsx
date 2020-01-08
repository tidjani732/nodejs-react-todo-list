import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { ROUTE_LOGIN } from '../../helpers/constants';
import { authService } from '../../services/auth.service';
import { Spinner } from "reactstrap";


class AccountActivation extends Component {
    state = {
        activated: "Loading"
    }

    componentDidMount() {
        authService.actvateAccount(this.props.match.params.token).then(res => {
            console.log(res);
            if (res.data && res.data.success) {
                this.setState({ activated: true })
            } else this.setState({ activated: false })
        }).catch(er => {
            console.log(er);
            this.setState({ activated: "Network error. reload page please!" })
        })
    }
    render() {
        return <>
            <h1 className="text-center mt-5"> Account activation</h1>
            {this.state.activated === true && <><h4 className="text-center mt-4"> Your account has been activated succesfully.</h4>
                <h4 className="text-center mt-4"> Go to <Link to={ROUTE_LOGIN}>Log in</Link>.</h4></>}

            {!this.state.activated && <h4 className="text-center mt-4">No Account matches this link, Verify the link again please!</h4>}
            {this.state.activated === "Loading" && <h4 className="text-center mt-4"><Spinner color="primary" /></h4>}
            {this.state.activated !== "Loading" && <h4 className="text-center mt-4">{this.state.activated}</h4>}
        </>;
    }
}

export default AccountActivation;
