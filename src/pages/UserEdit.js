import React, { Component } from 'react';
import { PageHeader, Form, FormGroup, FormControl, InputGroup, Glyphicon, Col, Button, HelpBlock } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';

class UserEdit extends Component {

    constructor(props) {
        super(props);
        this.formType = (props.initialValues.id > 0) ? 'edit' : 'add';
        this.formSubmit = this.formSubmit.bind(this);
    }
    static renderUsername(props) {
        return (
            <FormGroup validationState={!props.meta.touched ? null : (props.meta.error ? 'error' : 'success')}>
                <Col sm={2}>Username</Col>
                <Col sm={8}>
                    <FormControl {...props.input} 
                                 id="username"
                                 type="text"
                                 placeholder="Username"
                    />
                    <FormControl.Feedback />
                    <HelpBlock>
                        {
                            props.meta.touched && props.meta.error ?
                                props.meta.error : null
                        }
                    </HelpBlock>
                </Col>
            </FormGroup>
        );
    }

    static renderJob(props) {
        return (
            <FormGroup>
                <Col sm={2}>Job</Col>
                <Col sm={8}>
                    <InputGroup>
                        <FormControl {...props.input} 
                                    id="username"
                                    type="text"
                                    placeholder="Job"
                        />
                        <InputGroup.Addon>
                            <Glyphicon glyph="briefcase" />
                        </InputGroup.Addon>
                    </InputGroup>
                </Col>
            </FormGroup>
        );
    }

    formSubmit (values) {
        const formTypeUpperCase = this.formType.charAt(0).toUpperCase() + this.formType.slice(1);

        this.props.dispatch({
            type: 'users' + formTypeUpperCase,
            id: values.id,
            username: values.username,
            job: values.job
        });

        this.props.dispatch({
            type: 'users.' + this.formType,
            id: values.id,
            username: values.username,
            job: values.job
        });

        this.props.dispatch(goBack());
    }

    render() {
        return (
            <div>
                <PageHeader>{this.formType === 'edit' ? 'User edit' : 'User add'}</PageHeader>
                <Form horizontal onSubmit={this.props.handleSubmit(this.formSubmit)}>
                    <Field name="username" component={UserEdit.renderUsername} />
                    <Field name="job" component={UserEdit.renderJob} />
                    <FormGroup>
                        <Col smOffset={2} sm={8}>
                            <Button type="submit"
                                    disabled={this.props.invalid || this.props.submitting}
                            >Save User</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {

    let formData = state.users.list.filter(user => user.id === Number(ownProps.params.id))[0];

    if (!formData) {
        formData = {
            id: 0, 
            username: '',
            job: '',
        }
    }

    return {
        initialValues: formData
    }
}

UserEdit = reduxForm({
    form: 'userEdit',
    validate: function (values) {
        const errors = {};
        if (!values.username) {
            errors.username = 'Username is required';
        }
        return errors;
    }
})(UserEdit);

export default connect(mapStateToProps)(UserEdit);