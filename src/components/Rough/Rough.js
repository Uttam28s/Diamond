import React, { Component } from "react";
import Layouts from "../Home/Layout";
import Header from "../Home/Header";
import { Empty, Button } from "antd";

export default class Rough extends Component {
  render() {
    return (
      <div style={{ display: "flex" }}>
        <Layouts />
        <div style={{ width: "100%" }}>
          <Header />
          <Empty
            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
            imageStyle={{
              height: 60
            }}
            description={
              <span>
                Customize <a href="#API">Description</a>
              </span>
            }
          >
            <Button type="primary">Create Now</Button>
          </Empty>
        </div>
      </div>
    );
  }
}
