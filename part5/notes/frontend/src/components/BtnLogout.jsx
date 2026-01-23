const BtnLogout = ({ setUser }) => {
  const logout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }
  return (
    <button onClick={logout}>Logout</button>
  )
}

export default BtnLogout
