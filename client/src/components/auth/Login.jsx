import React, { Component } from "react";
import { ROUTE_REGISTER, ROUTE_LOGIN, RT_AC_RECOVER, ROUTE_HOME } from "../../helpers/constants";
import { NavLink } from "react-router-dom";
import { util } from "../../helpers/helper";
import { authService } from "../../services/auth.service";
import { sessionService } from "../../services/session.service";
class Login extends Component {
    state = {
        errors: {},
        show_erros: false,
    }

    formSubmit = x => {
        x.preventDefault();
        // var errors = {}
        // if (!util.isEmail(this.login.value.trim())) errors.login = "Invalid Email !";
        // if (this.password.value.length < 4) errors.password = "Enter a valid password!";
        // if (Object.keys(errors).length > 0) { this.setState({ errors }); return }
        //TODO Submit 
        authService.login({ email: this.login.value.trim(), password: this.password.value })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    sessionService.setSessionUser(res.data)
                    window.location = ROUTE_HOME;
                } else if (res.status === 401) {
                    const msg = res.data.error ? res.data.error : "Bad Creditials!"
                    this.setState({ error: msg });
                }
                else if (res.status === 422) this.setState({ error: "You must fill the form correctly!" })
            }).catch(err => {
                console.log(err);

            })
    }
    hideErrors = () => {
        this.setState({ errors: {} })
    }
    render() {
        return <>
            <div id="loginbox">
                <div className="panel panel-info" >
                    <div className="panel-heading">
                        <div className="panel-title">
                            <NavLink className="active" to={ROUTE_LOGIN}>Log In</NavLink>
                            <NavLink to={ROUTE_REGISTER}>Sign Un</NavLink>
                        </div>
                    </div>

                    <div className="panel-body" >

                        {this.state.error && <div id="signupalert" className="alert alert-st alert-danger">
                            <strong>Error : </strong> <br />
                            <span>{this.state.error}</span>
                        </div>}

                        <h4 className="mb-3">Login</h4>

                        <form id="loginform" onSubmit={this.formSubmit} className="form-horizontal">

                            <div className="input-group pb-4">
                                <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                <input type="text" className="form-control"
                                    ref={x => this.login = x}
                                    onFocus={this.hideErrors}
                                    name="email" defaultValue="" placeholder="Email" />
                                <span className="help errors">{this.state.errors.login}</span>
                            </div>

                            <div className="input-group pb-3">
                                <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                                <input type="password" className="form-control" name="password"
                                    ref={x => this.password = x}
                                    onFocus={this.hideErrors}
                                    placeholder="Password" />
                                <span className="help errors">{this.state.errors.password}</span>
                            </div>

                            <div className="form-group mt-3">
                                {/* <!-- Button --> */}
                                <div className="col-sm-12 controls">
                                    <button type="submit" className="btn btn-primary btn-block btn-md">Login</button>
                                </div>
                            </div>


                            <div className="form-group">
                                <div className="col-md-12 control">
                                    <div >
                                        <NavLink to={RT_AC_RECOVER}> Forgot your password ? </NavLink>
                                    </div>
                                </div>
                            </div>
                        </form>



                    </div>
                </div>
            </div>
        </>;
    }
}

export default Login;
