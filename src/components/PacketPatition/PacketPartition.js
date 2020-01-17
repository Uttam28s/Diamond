import React, { Component } from "react";
import Layouts from "../Home/Layout";
import Header from "../Home/Header";
import { connect } from "react-redux";
import { listPacket } from "../../Action/Packet";
import { listCarats } from "../../Action/Rough";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Select,
  Dropdown,
  Icon,
  Badge,
  Menu,
  Button,
  Row,
  Col
} from "antd";
import Models from "../../js/model";
import PacketListing from "./PacketListing";
import { columns } from "./TableData/Columns";
import Rough from "../Rough/Rough";
import IssueData from "./IssueData";
import "./Packet.css";

const { Option } = Select;

class PacketPartition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      packetList: [] || 0
    };
  }

  handelCancel = () => {
    this.setState({
      type: ""
    });
  };

  showIssueModel = () => {
    this.setState({
      type: "IssueCarat"
    });
  };

  showReturnModel = () => {
    this.setState({
      type: "ReturnCarat"
    });
  };
  showModel = () => {
    this.setState({
      type: "AddPacket"
    });
  };

  onChange = value => {
    console.log(`selected ${value}`);
  };

  onBlur = () => {
    console.log("blur");
  };

  onFocus = () => {
    console.log("focus");
  };

  onSearch = val => {
    console.log("search:", val);
  };

  // componentDidMount = () => {
  //   // this.props.listCarats();
  //   this.props.listPacket().then(res => {
  //     this.setState(
  //       {
  //         packetList: res
  //       },
  //       () =>
  //         console.log("this is a log in a state :-> ", this.state.packetList)
  //     );
  //   });
  // };

  componentDidUpdate = prevProps => {
    if (prevProps.caretList !== this.props.caretList) {
      console.log("this is a log from ", this.props.caretList);
    }
  };
  render() {
    return (
      <div className="main-content-section">
        <div style={{ display: "flex" }}>
          <Layouts />
          <div
            style={{
              width: "100%",
              overflow: "scroll",
              backgroundColor: "#F2F2F2",
              height: "100vh"
            }}
          >
            <Header />
            <div
              style={{
                margin: "14px 0px",
                backgroundColor: "#F2F2F2",
                placeContent: "flex-end"
              }}
            >
              {/* <Select
    				showSearch
    				style={{ width: 200 }}
    				placeholder="Select caret"
    				optionFilterProp="children"
    				onChange={this.onChange}
    				onFocus={this.onFocus}
    				onBlur={this.onBlur}
    				onSearch={this.onSearch}
    				filterOption={(input, option) =>
    				  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    				}
  				>
					{this.props.caretList.map((value,id)=>{
						console.log("this is a log for array values in a option",value);
						return(
						<Option value={value}>{value}</Option>)
					})}
    				{/* <Option value="lucy">Lucy</Option>
    				<Option value="jack">Jack</Option>
    				<Option value="tom">Tom</Option> *
  				</Select> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "50%"
                }}
              >
                <Button type="primary" onClick={this.showIssueModel}>
                  Issue
                </Button>
                <Button type="primary" onClick={this.showReturnModel}>
                  Return
                </Button>
                <Button type="primary" onClick={this.showModel}>
                  ADD Packet
                </Button>
              </div>
            </div>
            {this.state.type === "IssueCarat" ? (
              <Models type="IssueCarat" onCancel={this.handelCancel} />
            ) : (
              ""
            )}

            {this.state.type === "ReturnCarat" ? (
              <Models type="ReturnCarat" onCancel={this.handelCancel} />
            ) : (
              ""
            )}

            {this.state.type === "AddPacket" ? (
              <Models type="AddPacket" onCancel={this.handelCancel} />
            ) : (
              ""
            )}
            <div>
              <Row className="row-wrapper" gutter={16}>
                <Col className="sorting-table-wrapper" span={13}>
                  <h2 className="table-title">Packet List</h2>
                  <PacketListing
                    data={this.state.packetList}
                    column={columns}
                  />
                </Col>
                <Col className="sorting-table-wrapper" span={10}>
                  <h2 className="table-title">Issue Packet</h2>
                  <IssueData />
                </Col>
              </Row>
              {/* <PacketListing data={this.state.packetList} column={columns} /> */}
            </div>
            {/* <Table
            className='tableCustomize'
							bordered
							dataSource={this.state.data}
							columns={columns}
							rowClassName="editable-row"
							pagination={{
								onChange: this.cancel
							}}
						/> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.Test });

export default connect(mapStateToProps, { listCarats, listPacket })(
  PacketPartition
);
