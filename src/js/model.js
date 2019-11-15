import { Modal } from "antd";
import React, { Component } from "react";
import CreateRoughs from "../components/Rough/CreateRough";
import RoughSortings from "../components/RoughSorting/RoughSorting";
class Models extends Component {
  state = { visible: true };

  handleOk = e => {
    console.log("sdadsadasd",e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.props.onCancel();
    console.log(e);
    this.setState({
      visible: false
    });
  };

  render() {
    return (
			<div>
				<Modal
					title={this.props.title}
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					footer={false}
					maskClosable={false}
				>
					{this.props.type === "AddRough" ? (
						<CreateRoughs addRough={this.props.addRough} closeBox={this.handleCancel} />
					) : (
						""
					)}
					{this.props.type === "Sorting" ? <RoughSortings data={this.props.data} closeBox={this.handleCancel} /> : ""}
				</Modal>
			</div>
		);
  }
}

export default Models;
