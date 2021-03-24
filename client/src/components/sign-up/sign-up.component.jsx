import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

// Components
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

// Utils
import { auth, createUser } from '../../firebase/firebase.utils'

// Styles
import './sign-up.styles.scss'

const SignUp = () => {
  const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const [form, setForm] = useState(initialState)
  let history = useHistory()

  const updateForm = e => {
    const { value, name } = e.target
    // have to spread first, then update
    setForm({ ...form, [name]: value })
  }

  const signUp = async e => {
    e.preventDefault()
    console.log('Signing up...')
    const { displayName, email, password, confirmPassword } = form
    if (password !== confirmPassword) {
      return alert('Passwords do not match!')
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      )
      await createUser(user, { displayName })
      history.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='sign-up'>
      <h2>I do not have an account.</h2>
      <span>Sign up with an email & password!</span>

      <form onSubmit={signUp}>
        <FormInput
          name='displayName'
          type='text'
          value={form.displayName}
          handleChange={updateForm}
          label='Name'
          required
        />

        <FormInput
          name='email'
          type='email'
          value={form.email}
          handleChange={updateForm}
          label='Email'
          required
        />

        <FormInput
          name='password'
          type='password'
          value={form.password}
          handleChange={updateForm}
          label='Password'
          required
        />

        <FormInput
          name='confirmPassword'
          type='password'
          value={form.confirmPassword}
          handleChange={updateForm}
          label='Confirm Password'
          required
        />

        <CustomButton type='submit'>Sign Up</CustomButton>
      </form>
    </div>
  )
}

export default SignUp
