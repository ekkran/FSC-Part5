import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = event => {
    event.preventDefault()
    handleSubmit({
      username,
      password
    })
  }

  return(
    <form>
      <div>
        username
        <input type='text' value={username} name='Username' 
        onChange={({ target }) => setUsername(target.value)}
        data-testid='username'
        />
      </div>
      <div>
        password
        <input type='text' value={password} name='Password' 
        onChange={({ target }) => setPassword(target.value)}
        data-testid='password'
        />  
      </div>
      <button type='button' onClick={handleLogin}>login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm