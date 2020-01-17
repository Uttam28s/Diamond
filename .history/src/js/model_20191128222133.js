import { Modal } from "antd";
import React, { Component } from "react";
import "../components/Rough/Rough.css";
import CreateRoughs from "../components/Rough/CreateRough";
import RoughSortings from "../components/RoughSorting/RoughSorting";
import EditableTable from "../components/RoughSorting/EditableTable";
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
					className={this.props.type === "Sorting" ? "addSorting" : ''}
				>
					{this.props.type === "AddRough" ? (
						<CreateRoughs addRough={this.props.addRough} closeBox={this.handleCancel} />
					) : (
						""
					)}
					{this.props.type === "Sorting" ? <RoughSortings data={this.props.data} closeBox={this.handleCancel} /> : ""}
					{this.props.type === "AddPacket" ? <AddPacketModel closeBox={this.handleCancel}}
				</Modal>
			</div>
		);
  }
}

export default Models;
