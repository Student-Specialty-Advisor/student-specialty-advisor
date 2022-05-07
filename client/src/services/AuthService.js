import alertify from "alertifyjs";

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
    localStorage.removeItem("userAchievements");
  }
  async register(data) {
    const response = await fetch(process.env.REACT_APP_API_URL + "sign-up", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json;
  }
  async verifyAccount(id) {
    const response = await fetch(
      process.env.REACT_APP_API_URL + "verify/" + id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    return json;
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  isLoggedIn() {
    var user = this.getCurrentUser();
    if (user && user.accessToken) {
      return true;
    }
    return false;
  }
  isAdmin() {
    var user = this.getCurrentUser();
    if (user && user.accessToken) {
      if (user.role === "Admin") {
        return true;
      }
      return false;
    }
    return false;
  }
  setCurrentUser(json) {
    if (json.accessToken) {
      localStorage.setItem("user", JSON.stringify(json));
    }
  }
  alertifyInvalidToken() {
    alertify.alert(
      "Your session expired. Please login again to continue!",
      () => {
        this.logout();
        window.location.href = "/login";
      }
    );
  }
}

export default new AuthService();
