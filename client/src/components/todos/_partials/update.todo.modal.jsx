import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { editTodo, closeModal } from "../../../session/actions";
import { connect } from "react-redux";
import { util } from '../../../helpers/helper';

const TodoUpdateModal = ({ editTodo, ...props }) => {
    const {
        className, todo
    } = props;

    var checkam = todo.status;
    var titre = todo.title;

    return (
        <div>
            <Modal isOpen={props.modalOpen === "TodoUpdateModal"} toggle={props.closeModal} className={className}>
                <ModalHeader toggle={props.close}>Edit Todo</ModalHeader>
                <Form onSubmit={e => {
                    e.preventDefault()
                    editTodo({ title: titre, status: checkam, _id: todo._id })
                    props.closeModal()
                }}>
                    <ModalBody>

                        <FormGroup>
                            <Label for="exampleText">Text Area</Label>
                            <Input type="textarea" onChange={e => {
                                titre = e.target.value
                            }} defaultValue={titre} name="text" id="exampleText" />
                        </FormGroup>


                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" onChange={() => checkam = !checkam} defaultChecked={checkam} />
                                Mark as done
                                </Label>
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit">Save Changes</Button>{' '}
                        <Button color="secondary" onClick={props.closeModal}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    );
}

export default connect(util.mapStateToProps("todo", "modalOpen"), { editTodo, closeModal })(TodoUpdateModal);
