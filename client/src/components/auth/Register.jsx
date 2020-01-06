import React, { Component } from "react";
import { ROUTE_LOGIN, ROUTE_REGISTER } from "../../helpers/constants";
import { NavLink } from "react-router-dom";
import { authService } from "../../services/auth.service";

class Register extends Component {
    state = {
        errors: {}
    }

    validate = x => {
        x.preventDefault()
        // var errors = {}
        // if (!this.name.value.trim()) errors.name = "Username is required!"
        // if (!util.isEmail(this.email.value.trim())) errors.email = "Incorrect email!"
        // // if (["M", "F"].indexOf(this.sex.value) < 0) errors.sex = "Choose a sex please!"
        // if (this.password.value.length < 4) errors.password = "6 characters min!"
        // if (this.password.value !== this.password_conf.value) errors.password_conf = "Password Mismatch!"
        // if (Object.keys(errors).length > 0) { this.setState({ errors }); return }

        this.sendData();
    }

    sendData() {
        this.setState({ errors: {} });
        var data = {
            name: this.name.value.trim(),
            surname: this.prenom.value.trim(),
            email: this.email.value.trim(),
            sex: this.sex.value,
            password: this.password.value,
            passwordConfirm: this.password_conf.value,
        }
        authService.register(data).then(res => {
            console.log(res);
            if (res.status === 422 && res.data) {
                var errors = {};
                const errs = res.data.errors;
                errors.name = this.wiggle('name', errs);
                errors.email = this.wiggle('email', errs);
                errors.password = this.wiggle('password', errs);
                errors.password_conf = this.wiggle('passwordConfirm', errs);
                this.setState({ errors });
            } else if (res.status === 200 && res.status === 201) {
                this.setState({ created: true });
            }
            // if (res.data && res.data.status) {
            //     
            // } else if (res.data && res.data.msg) this.setState({ error: res.data.msg })
        }).catch(er => console.log(er))
    }
    wiggle(key, errors) {
        var err = errors.find(x => x.param === key);
        if (err) return err.msg;
        else return "";
    }
    render() {
        return <>
            {!this.state.created && <div id="loginbox" className="register">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <div className="panel-title">
                            <NavLink to={ROUTE_LOGIN}>Log In</NavLink>
                            <NavLink className="active" to={ROUTE_REGISTER}>Sign Un</NavLink>

                        </div>
                    </div>
                    <div className="panel-body" >
                        <form id="signupform" onSubmit={this.validate} className="form-horizontal">

                            {this.state.error && <div id="signupalert" className="alert alert-st alert-danger">
                                <strong>Error : </strong> <br />
                                <span>{this.state.error}</span>
                            </div>}



                            <div className="form-group col-md-6">
                                <label htmlFor="email" className="col-md-12 control-label">Nom</label>
                                <div className="col-md-12">
                                    <input type="text" className="form-control"
                                        ref={x => this.name = x}
                                        name="name" placeholder="Nom" />
                                    <span className="help errors sin">{this.state.errors.name}</span>
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="email" className="col-md-12 control-label">Prenom</label>
                                <div className="col-md-12">
                                    <input type="text" className="form-control" name="prenom"
                                        ref={x => this.prenom = x} placeholder="Prenom" />
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="email" className="col-md-12 control-label">Email</label>
                                <div className="col-md-12">
                                    <input type="text" className="form-control"
                                        ref={x => this.email = x}
                                        name="email" placeholder="Email" />
                                    <span className="help errors sin">{this.state.errors.email}</span>
                                </div>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="firstname" className="col-md-12 control-label">Gender</label>
                                <div className="col-md-12">
                                    <select className="form-control" ref={x => this.sex = x} defaultValue="M" name="selectMulti">

                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                    </select>
                                    <span className="help errors sin">{this.state.errors.sex}</span>
                                </div>
                            </div>
                            <div className="form-group col-md-6 mt-2">
                                <label htmlFor="lastname" className="col-md-12 control-label">Password</label>
                                <div className="col-md-12">
                                    <input type="password" className="form-control"
                                        ref={x => this.password = x} autoComplete="off" />
                                    <span className="help errors sin">{this.state.errors.password}</span>
                                </div>

                            </div>
                            <div className="form-group col-md-6 mt-2">
                                <label htmlFor="password" className="col-md-12 control-label">Confirm Password</label>
                                <div className="col-md-12">
                                    <input type="password" className="form-control"
                                        ref={x => this.password_conf = x}
                                        autoComplete="off" />
                                    <span className="help errors sin">{this.state.errors.password_conf}</span>
                                </div>

                            </div>

                            <div className="form-group mt-4">
                                <div className="col-md-12">
                                    <button id="btn-fbsignup" type="submit" className="btn btn-primary btn-block btn-md "> Sign Up</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>}

            {this.state.created && <h4 className="text-center mt-4"> An email has been sent to {this.email.value}, it contains a link  to activate your account.
            </h4>}
        </>;
    }
}

export default Register;
