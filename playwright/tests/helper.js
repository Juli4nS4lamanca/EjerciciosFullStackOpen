const loginWith = async (page, username, password) => {
  await page.getByRole("button", { name: "Log In" }).click();
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "Login" }).click();
};

const createBlog = async (page, title, url, author) => {
  await page.getByTestId("title").fill(title);
  await page.getByTestId("url").fill(url);
  await page.getByTestId("author").fill(author);
  await page.getByRole("button", { name: "Create" }).click();
  await page.getByText(`${title} - ${author}`).waitFor();
  /* La razón de agregar esta ultima linea es para que el test espere la
  respuesta del servidor, ya que si no se hace empieza a crear el siguiente
  blog aunque el anterior no este rendedirizado y pude haber problemas en 
  el test */
};

export { loginWith, createBlog };
