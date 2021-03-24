import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

// Components
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

// Utils
import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

// Styles
import './sign-in.styles.scss'

const SignIn = () => {
  let history = useHistory()
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const updateUser = e => {
    const { value, name } = e.target
    // have to spread first, then update
    setUser({ ...user, [name]: value })
  }

  const signIn = async e => {
    e.preventDefault()
    console.log('Signing in...')

    try {
      await auth.signInWithEmailAndPassword(user.email, user.password)
      history.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='sign-in'>
      <h2>I already have an account.</h2>
      <span>Sign in with your email and password!</span>

      <form onSubmit={signIn}>
        <FormInput
          name='email'
          type='email'
          value={user.email}
          handleChange={updateUser}
          label='Email'
          required
        />

        <FormInput
          name='password'
          type='password'
          value={user.password}
          handleChange={updateUser}
          label='Password'
          required
        />

        <div className='buttons'>
          <CustomButton type='submit'>Sign In</CustomButton>
          <CustomButton google onClick={signInWithGoogle} type='button'>
            Sign In With Google
          </CustomButton>
        </div>
      </form>
    </div>
  )
}

export default SignIn
