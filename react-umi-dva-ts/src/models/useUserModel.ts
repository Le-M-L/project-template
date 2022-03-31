import { useState, useCallback } from 'react'

export default function useUserModel() {
  const [user, setUser] = useState({d:123})

  const signin = useCallback((account, password) => {
    // signin implementation
    // setUser(user from signin API)
  }, [])

  const signout = useCallback(() => {
    // signout implementation
    // setUser(null)
  }, [])

  return {
    user,
    signin,
    signout
  }
}