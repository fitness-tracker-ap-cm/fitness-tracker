//Register User
export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`http://localhost:3000/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    const result = await response.json();
    // As written below you can log your result
    // to check what data came back from the above code.
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};
