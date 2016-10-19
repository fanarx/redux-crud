import React, { Component, PropTypes } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class UserListElement extends Component {

    constructor(props) {
        super(props);
        this.modalDeleteShow = this.modalDeleteShow.bind(this);
    }

    modalDeleteShow(e) {
        const userId = Number(e.target.dataset.id);
        const username = e.target.dataset.username;
        this.props.dispatch({
            type: 'users.modalDeleteShow',
            id: userId,
            username
        })
    }

    render() {
        //debugger;
        const {user} = this.props;
        return (
            <tr key={user.id}>
                <td># {user.id}</td>
                <td>{user.username}</td>
                <td>{user.job}</td>
                <td>
                    <Link to={'/user-edit/' + user.id}>
                        <Button bsSize="xsmall">
                            Edit  <Glyphicon glyph="edit" />
                        </Button>
                    </Link>
                </td>
                <td>
                    <Button bsSize="xsmall" data-id={user.id} data-username={user.username} onClick={this.modalDeleteShow}>
                        Delete <Glyphicon glyph="remove-circle" />
                    </Button>
                </td>
            </tr>   
        );
    }
}

UserListElement.propTypes = {
    user: PropTypes.object.isRequired
}


export default connect()(UserListElement);