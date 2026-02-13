const BtnLogout = ({ setUser }) => {
  const logout = () => {
    window.sessionStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }
  return (
    <button onClick={logout}>Logout</button>
  )
}

export default BtnLogout
