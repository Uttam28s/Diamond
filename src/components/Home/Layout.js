import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import routes from "../../js/Routes";
import "./Home.css";
import { Link, withRouter } from "react-router-dom";
const { Sider } = Layout;
const { SubMenu } = Menu;

class Layouts extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: false
    };
  }

  onCollapse = collapsed => {
    // console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
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
            selectedKeys={[this.props.location.pathname]}
            mode="inline"
          >
            <Menu.Item key={routes.home}>
              <Link to={routes.home}>
                <Icon type="pie-chart" />
                <span>Home</span>
              </Link>
            </Menu.Item>
            <Menu.Item key={routes.rough}>
              <Link to={routes.rough}>
                <Icon type="pie-chart" />
                <span>Create Rough ( ર ફ )</span>
              </Link>
            </Menu.Item>
            <Menu.Item key={routes.officepacket}>
              <Link to={routes.officepacket}>
                <Icon type="desktop" />
                <span>Sorting ( પ્રકાર )</span>
              </Link>
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

export default withRouter(Layouts);
