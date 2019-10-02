import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import "./Home.css";
import { Link } from "react-router-dom";
const { Sider } = Layout;
const { SubMenu } = Menu;

class Layouts extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
      keys: "1"
    };
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const selectKeys = key => {
      this.setState({
        keys: key.key
      });
      console.log("selected keys", key);
    };
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            onSelect={key => {
              selectKeys(key);
            }}
            selectedKeys={this.state.keys}
            mode="inline"
          >
            <Menu.Item key="1">
              <Link to="/home">
                <Icon type="pie-chart" />
                <span>Home</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/rough">
                <Icon type="pie-chart" />
                <span>Create Rough ( ર ફ )</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="desktop" />
              <span>Sorting ( પ્રકાર )</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="4">Tom</Menu.Item>
              <Menu.Item key="5">Bill</Menu.Item>
              <Menu.Item key="6">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Team</span>
                </span>
              }
            >
              <Menu.Item key="7">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    );
  }
}

export default Layouts;
