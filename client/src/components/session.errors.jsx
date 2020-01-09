import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Card, CardText, CardBody, Col
} from 'reactstrap';
import { closeError } from "../session/actions";
import { util } from "../helpers/helper";


class sessioClass extends Component {
    state = {}

    UNSAFE_componentWillReceiveProps() {
        this.props.closeError()
    }
    render() {
        return <>
            {this.props.new_error && this.props.new_error.msg &&
                <Col sm="6" className={"floating-alert " + this.props.new_error.type}>
                    <Card>
                        <CardBody>
                            <CardText>{this.props.new_error.msg}</CardText>

                        </CardBody>
                    </Card>
                </Col>}
        </>;
    }
}




const SessionErrors = connect(util.mapStateToProps("new_error"), { closeError })(sessioClass);

export default SessionErrors;
