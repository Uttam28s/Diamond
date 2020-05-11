import React, { Component } from "react";
import Layouts from "../Home/Layout";
import Header from "../Home/Header";
import { connect } from "react-redux";
import { listPacket, loadCarats } from "../../Action/Packet";
import { listCarats } from "../../Action/Rough";
import { Select, Button, Row, Col } from "antd";
import Models from "../../js/model";
import PacketListing from "./PacketListing";
import { columns } from "./TableData/Columns";
// import Rough from "../Rough/Rough";
// import IssueData from "./IssueData";
import "./Packet.css";
import { withRouter } from "react-router";

const { Option } = Select;

class PacketPartition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      packetList: [] || 0,
      caratList: [] || 0,
    };
  }

  handelCancel = () => {
    this.setState({
      type: "",
    });
  };

  showIssueModel = () => {
    this.setState({
      type: "IssueCarat",
    });
  };

  showReturnModel = () => {
    this.setState({
      type: "ReturnCarat",
    });
  };
  showModel = () => {
    this.setState({
      type: "AddPacket",
    });
  };

  onChange = (value) => {
    console.log(`selected ${value}`);
  };

  onSearch = (val) => {
    console.log("search:", val);
  };

  componentDidMount = () => {
    // this.props.listCarats();
    this.props.listPacket().then((res) => {
      this.setState(
        {
          packetList: res,
        },
        () => console.log("this is a log in a state :-> ", this.props)
      );
    });
    if (this.props.loadCarat.length > 0) {
      this.setState({
        caratList: this.props.loadCarat,
      });
    } else {
      this.props.loadCarats().then((res) => {
        // console.log(
        //   "this is a Carat in a componentdidMount of a Packet :->",
        //   res
        // );
        this.setState({
          caratList: res,
          // date: moment().format("YYYY-MM-DD"),
        });
      });
    }
  };

  handelAddPacket = () => {
    this.props.listPacket().then((res) => {
      this.setState(
        {
          packetList: res,
        },
        () =>
          console.log("this is a log in a state :-> ", this.state.packetList)
      );
    });
  };

  // componentDidUpdate = (prevProps) => {
  //   if (prevProps.listPacket !== this.props.listPacket) {
  //     console.log("this is a log from ", this.props.caretList);
  //     this.props.listPacket().then((res) => {
  //       this.setState(
  //         {
  //           packetList: res,
  //         },
  //         () =>
  //           console.log("this is a log in a state :-> ", this.state.packetList)
  //       );
  //     });
  //   }
  // };
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
              height: "100vh",
            }}
          >
            <Header title="Packet Listing" />
            <div
              style={{
                margin: "14px 0px",
                backgroundColor: "#F2F2F2",
                placeContent: "flex-end",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "100%",
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
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select carat"
                  optionFilterProp="children"
                  onChange={this.onChange}
                  onSearch={this.onSearch}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {this.state.caratList.map((val) => (
                    <Option value={val.id}>{val.carat}</Option>
                  ))}
                </Select>
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
              <Models
                type="AddPacket"
                handelAddPacket={this.handelAddPacket}
                onCancel={this.handelCancel}
              />
            ) : (
              ""
            )}
            <div>
              <Row className="row-wrapper" gutter={16}>
                <Col className="sorting-table-wrapper" span={24}>
                  {/* <h2 className="table-title">Packet List</h2> */}
                  <PacketListing
                    data={this.state.packetList}
                    column={columns}
                  />
                </Col>
                {/* <Col className="sorting-table-wrapper" span={10}>
                  <h2 className="table-title">Issue Packet</h2>
                  <IssueData />
                </Col> */}
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ ...state.Test, ...state.Packet });

export default withRouter(
  connect(mapStateToProps, { listCarats, listPacket, loadCarats })(
    PacketPartition
  )
);
