const BtnLogout = ({ setUser }) => {
  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }
  return (
    <button onClick={logout}>Logout</button>
  )
}

export default BtnLogout
