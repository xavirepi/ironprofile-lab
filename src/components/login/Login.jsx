import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { login } from '../../services/AuthService';
import { setAccessToken } from '../../store/AccessTokenStore';

// eslint-disable-next-line no-useless-escape
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const validators = {
  email: value => {
    let message

    if (!value) {
      message = 'Email is required'
    } else if (!EMAIL_PATTERN.test(value)) {
      message = 'Email is invalid'
    }

    return message
  },
  password: value => {
    let message

    if (!value) {
      message = 'Password is required'
    } else if (value && value.length < 8) {
      message = 'Password must have 8 character or more'
    }

    return message
  }
}

const Login = ({ doLogin }) => {
  const { push } = useHistory()

  const [state, setState] = useState({
    fields: {
      email: '',
      password: ''
    },
    errors: {
      email: validators.email(),
      password: validators.password()
    }
  })

  const [touched, setTouched] = useState({})

  const isValid = () => {
    const { errors } = state;
    return !Object.keys(errors).some(error => errors[error]);
  }

  const onSubmit = (e) => {
    const { fields } = state
    e.preventDefault()

    if (isValid()) {
      login(fields)
        .then(response => {
          setAccessToken(response.access_token)
          doLogin()
            .then(() => push('/'))
        })
    }
  }

  const onChange = (e) => {
    const { name, value } = e.target

    setState((prevState) => ({
      fields: {
        ...prevState.fields,
        [name]: value
      },
      errors: {
        ...prevState.errors,
        [name]: validators[name] && validators[name](value)
      }
    }))
  }

  const onBlur = (e) => {
    const { name } = e.target

    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true
    }))
  }

  const onFocus = (e) => {
    const { name } = e.target

    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: false
    }))
  }

  const { email, password } = state.fields
  const { errors } = state

  return (
	  <div className="Login mt-4 container d-flex justify-content-center">
		<h1>Log in</h1>
			<form onSubmit={onSubmit} style={{ maxWidth: 500 }}>

				<div className="mb-3">
				<label htmlFor="email" className="form-label">Email address</label>
				<input
					className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
					type="email" id="email" name="email" autoComplete="off"
					value={email} onChange={onChange} onBlur={onBlur} onFocus={onFocus}
				/>
				<div className="invalid-feedback">{errors.email}</div>
				</div>

				<div className="mb-3">
				<label htmlFor="password" className="form-label">Password</label>
				<input
					className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
					type="password" id="password" name="password"
					value={password} onChange={onChange} onBlur={onBlur} onFocus={onFocus}
				/>
				<div className="invalid-feedback">{errors.password}</div>
				</div>

				<button type="submit" className="btn btn-outline-primary" disabled={!isValid()}>
				Submit
				</button>
			</form>
    </div>
  );
};

export default Login;