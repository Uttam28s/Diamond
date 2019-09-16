import React, { Component } from "react";
import "./Login.css";
import logo from "../../assets/images/avtar1.png";
import { message, notification } from "antd";
import { connect } from "react-redux";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: ""
    };
    this.handelLogin = this.handelLogin.bind(this);
  }
  editUserName(e) {
    console.log("editUserName", e.target.value);
    const userName = e.target.value;
    this.setState({
      userName
    });
  }

  editPassword(e) {
    console.log("password", e.target.value);
    console.log("this is a  username", this.state.userName);
    const password = e.target.value;
    this.setState({
      password
    });
  }

  handelLogin() {
    console.log(this.state);
    // this.props.login(this.state);
    if (this.state.userName === "Vikas" && this.state.password === "123") {
      this.props.history.push("/home");
      console.log("Successfully Login");
      notification.success({ message: "Login Successfully" });
    } else {
      notification.error({ message: "check email and password" });
    }
  }

  render() {
    return (
      <div className="maindiv">
        <h2>Login Form</h2>

        <div className="formComponent">
          <div className="imgcontainer">
            <img src={logo} alt="Avatar" className="avatar" />
          </div>

          <div className="container">
            <label for="uname">
              <b>Username</b>
            </label>
            <input
              className="inputField"
              type="text"
              onChange={e => {
                this.editUserName(e);
              }}
              placeholder="Enter Username"
              required
            />

            <label for="psw">
              <b>Password</b>
            </label>
            <input
              className="inputField"
              type="password"
              onChange={e => {
                this.editPassword(e);
              }}
              placeholder="Enter Password"
              required
            />
            <button className="buttonStyle" onClick={this.handelLogin}>
              Login
            </button>
            <label>
              <input type="checkbox" checked="checked" name="remember" />{" "}
              Remember me
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Login);
