import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { ROUTE_LOGIN, ROUTE_REGISTER } from '../../helpers/constants';
import { authService } from '../../services/auth.service';


class AccountRecovery extends Component {
    state = {
        activated: "form"
    }

    recoverAccount = e => {
        e.preventDefault()
        if (this.email.value.trim()) authService.recoverAcc({ email: this.email.value.trim() }).then(res => {
            if (res.data && res.data.status) {
                this.setState({ activated: true })
            } else if (res.data && !res.data.status) this.setState({ activated: false })
        })
    }
    render() {
        return <>
            <h1 className="text-center mt-5"> Account Recovery</h1>
            {this.state.activated === "form" && <div id="loginbox">
                <form onSubmit={this.recoverAccount}>
                    <div className="input-group pb-4">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                        <input type="text" className="form-control"
                            ref={x => this.email = x} required
                            name="login" defaultValue="" placeholder="Email" />
                        <span className="help errors"></span>
                    </div>
                    <div className="form-group mt-3">
                        {/* <!-- Button --> */}
                        <div className="col-sm-12 controls">
                            <button type="submit" className="btn btn-primary btn-block btn-md">Send</button>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-12 control">
                            <div >
                                Back to <Link to={ROUTE_LOGIN}>Log in </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>}
            {this.state.activated === true && <h4 className="text-center mt-4"> An email has been sent to {this.email.value}, it contains a link you can use only once to recover your account.
            </h4>}

            {!this.state.activated && <h4 className="text-center mt-4"> Sorry we didn't find {this.email.value} in our database, <br />
                You can <Link to={ROUTE_REGISTER}>Sign up</Link> with this email.
            </h4>}

        </>;
    }
}

export default AccountRecovery;