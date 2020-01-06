import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { RT_AC_RECOVER, ROUTE_HOME } from '../../helpers/constants';
import { authService } from '../../services/auth.service';
import { Spinner } from "reactstrap";
import { sessionService } from '../../services/session.service';


class AccountReset extends Component {
    state = {
        loading: "Loading",
        errors: {}
    }

    componentDidMount() {

        authService.getResetAccount({ token: this.props.match.params.token }).then(res => {
            if (res.data && res.data.status) {
                this.setState({ loading: true, name: res.data.name })
            } else this.setState({ loading: false })
        }).catch(er => this.setState({ loading: "Network error. reload page please!" }))
    }
    resetPassword = x => {
        x.preventDefault()
        var errors = {}
        if (this.password.value.length < 6) errors.password = "6 characters min!"
        if (this.password.value !== this.password_conf.value) errors.password_conf = "Password mismatch!"
        this.setState({ errors })
        if (Object.keys(errors).length > 0) return

        authService.resetPassword({ token: this.props.match.params.token, password: this.password.value }).then(res => {
            //console.log(res.data);
            if (res.data.status) {
                sessionService.setSessionUser(res.data.user)
                window.location = ROUTE_HOME;
            } else if (res.data.msg) this.setState({ error: res.data.msg })
        })
    }
    render() {
        return <>
            <h1 className="text-center mt-5"> Account Reset</h1>


            {!this.state.loading && <h4 className="text-center mt-4">No Account matches this link, Verify the link or <Link to={RT_AC_RECOVER}>Request another link</Link>!</h4>}
            {this.state.loading === "Loading" && <h4 className="text-center mt-4"><Spinner color="primary" /></h4>}
            {this.state.loading !== "Loading" && <h4 className="text-center mt-4">{this.state.loading}</h4>}



            {this.state.loading === true && <div id="loginbox">
                <form onSubmit={this.resetPassword}>
                    <h6 className="text-center pb-2">Hello {this.state.name}, enter your  new passwords below.</h6>
                    {this.state.error && <div id="signupalert" className="alert alert-st alert-danger">
                        <strong>Error : </strong> <br />
                        <span>{this.state.error}</span>
                    </div>}
                    <div className="input-group pb-4">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                        <input type="password" className="form-control"
                            ref={x => this.password = x} required
                            onFocus={this.hideErrors}
                            placeholder="New password" />
                        <span className="help errors">{this.state.errors.password}</span>
                    </div>
                    <div className="input-group pb-4">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                        <input type="password" className="form-control"
                            ref={x => this.password_conf = x} required
                            onFocus={this.hideErrors}
                            placeholder="Confirm password" />
                        <span className="help errors">{this.state.errors.password_conf}</span>
                    </div>
                    <div className="form-group mt-3">
                        {/* <!-- Button --> */}
                        <div className="col-sm-12 controls">
                            <button type="submit" className="btn btn-primary btn-block btn-md">Reset Password</button>
                        </div>
                    </div>

                </form>
            </div>}
        </>;
    }
}

export default AccountReset;