import React, { Component } from "react";
import './profile.css'
import { usrServ } from "../services/user.service";
import { Button } from "reactstrap";
import { generateBase64FromImage } from "../helpers/helper";
import { host } from "../helpers/constants";




class Profile extends Component {
    state = {
        user: {}
    }
    componentDidMount() {
        this.getUProfile()
    }
    getUProfile = async () => {
        try {
            const res = await usrServ.getSesUser();
            console.log(res);
            if (res.status === 200) {
                this.setState({ user: res.data });
            }
        } catch (err) {
            console.log(err);
        }
    }

    submitForm = e => {
        const forData = new FormData();
        forData.append('imago', "loreme")
        forData.append('image', e.target.files[0])
        usrServ.updateProfile(forData).then(res => {
            console.log(res);
        }).catch(er => {
            console.log(er);
        })
        generateBase64FromImage(e.target.files[0]).then(b64 => {
            this.setState({ imgPrev: b64 })
        })

    }

    render() {
        return (
            <>
                <div class="d-flex justify-content-center h-100">
                    <div class="image_outer_container">
                        <div class="image_inner_container">
                            <img src={this.state.imgPrev ? this.state.imgPrev : host + '/' + this.state.user.photo_url} />
                        </div>
                    </div>

                </div>
                <br />

                <input type="file" name="image" onChange={this.submitForm}
                    className="hidden" accept="image/png,image/jpeg" ref={x => this.file = x}></input>

                <div className="text-center">
                    <Button className="btn btn-primary"
                        onClick={() => {
                            this.file.click()
                        }}>Modify pic</Button>
                </div>
                <div className="text-center">
                    <h3>About You</h3>
                    <h5>Name : {this.state.user.name}</h5>
                    <h5>Email : {this.state.user.email}</h5>
                </div>
            </>
        )
    }
}

export default Profile;
