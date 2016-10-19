import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

class UserDelete extends Component {

    constructor(props) {
        super(props);
        this.modalDeleteHide = this.modalDeleteHide.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    modalDeleteHide(e) {
        this.props.dispatch({
            type: 'users.modalDeleteHide',
        })
    }

    deleteUser(e) {

        this.props.dispatch({
            type: 'usersDelete',
            id: values.id
        });

        this.props.dispatch({
            type: 'users.delete',
            id: this.props.modalDelete.id
        })

        this.modalDeleteHide();
    }

    render() {
        return (
            <Modal show={this.props.modalDelete.show}>
                <Modal.Header>
                    <Modal.Title>
                        Are you sure you want to delete &nbsp; <strong>{this.props.modalDelete.username}</strong> ?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button onClick={this.modalDeleteHide}>No</Button>
                    <Button onClick={this.deleteUser} bsStyle="primary">Yes</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    let modalDelete;
    if (state.users.modal && state.users.modal.listDelete) {
        modalDelete = state.users.modal.listDelete;
    } else {
        modalDelete = {
            show: false,
            id: 0,
            username: ''
        }
    }

    return {
        modalDelete
    }
}

export default connect(mapStateToProps)(UserDelete);