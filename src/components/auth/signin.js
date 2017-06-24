import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import { signUpUser } from '../../actions'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <fieldset className="form-group">
    <label>{label}</label>
    <div>
      <input {...input} className="form-control" placeholder={label} type={type}/>
      {touched && error && <span className="error">{error}</span>}
    </div>
  </fieldset>
)

class SignUpForm extends Component {
  handleFormSubmit({ email, password }) {
    // Call action creator to sign up the user
    this.props.signUpUser({ email, password })
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          name="email"
          label="Email"
          type="text"
          component={renderField}
        />
        <Field
          name="password"
          label="Password"
          type="password"
          component={renderField}
        />
        <Field
          name="passwordConfirm"
          label="Confirm password"
          type="password"
          component={renderField}
        />
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    )
  }
}

function validate(formProps) {
  const errors = {}

  if (!formProps.email) {
    errors.email = 'Please enter an email'
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password'
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation'
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match'
  }

  return errors
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

SignUpForm = reduxForm({
  form: 'signUp',
  validate
})(SignUpForm)

export default SignUpForm = connect(mapStateToProps, { signUpUser })(SignUpForm)
