class AuthService {
  async login(data) {
    const response = await fetch(process.env.REACT_APP_API_URL + "log-in", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (json.accessToken) {
      localStorage.setItem("user", JSON.stringify(json));
    }
    return json;
  }
  logout() {
    localStorage.removeItem("user");
  }
  register() {}
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
