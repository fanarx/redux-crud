import React, { Component, PropTypes } from 'react';
import UserListElement from './UserListElement';
import UserDelete from './UserDelete';
import { Table, Pagination, ProgressBar } from 'react-bootstrap';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.changePage = this.changePage.bind(this);
    }

    componentWillMount() {
        if (this.props.users.length === 0) {
            this.props.dispatch({
                type: 'usersFetch'
            });
        }
    }

    changePage(page) {
        this.props.dispatch(push('/?page=' + page));
    }

    render() {
        const {users} = this.props;
        const perPage = 10;
        const pages = Math.ceil(this.props.users.length / perPage);
        const currentPage = this.props.page;
        const startOffset = (currentPage - 1) * perPage;
        let startCount = 0;


        return (
            users.length ? (<div>
                <Table bordered hover responsive striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Job</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => {
                            if (idx >= startOffset && startCount < perPage) {
                                startCount++;
                                return (
                                    <UserListElement key={user.id} user={user} />
                                );
                            }
                            
                        })}
                    </tbody>
                </Table> 

                <Pagination className="users-pagination pull-right"
                            bsSize="medium"
                            maxButtons={10} first last next prev boundaryLinks
                            items={pages} activePage={currentPage}
                            onSelect={this.changePage}    
                 />
                <UserDelete />
            </div>) :
            (
                <ProgressBar active now={100} />
            )
        );
    }
}

function mapStateToProps(state) {
    const defaultArray = [];
    return {
        users: state.users.list || defaultArray,
        page: Number(state.routing.locationBeforeTransitions.query.page) || 1
    }
}

export default connect(mapStateToProps)(UserList);