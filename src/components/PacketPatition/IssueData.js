import React, { Component } from "react";
import { connect } from "react-redux";
import { Table } from "antd";
import { getIssuePackets, loadCarats } from "../../Action/Packet";
import moment from "moment";

const columns = [
  {
    title: "Total Carat",
    dataIndex: "total_carat"
  },
  {
    title: "Manager",
    dataIndex: "manager_name"
  },
  {
    title: "Carat",
    dataIndex: "carat"
  },
  {
    title: "Pieces",
    dataIndex: "pcs"
  },
  {
    title: "Date",
    dataIndex: "distrtibute_date"
  }
];

class IssueData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.props.getIssuePackets().then(res => {
      console.log("TCL: IssueData -> componentDidMount -> res", res);
      res.map(value => {
        value.distrtibute_date = moment(value.distrtibute_date).format(
          "DD-MM-YYYY"
        );
      });
      this.setState(
        {
          data: res
        },
        () => console.log("this is a log in a state :-> ", this.state.data)
      );
    });
  }
  render() {
    return (
      <div>
        <Table columns={columns} dataSource={this.state.data} size="middle" />
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.Packet });

export default connect(mapStateToProps, { getIssuePackets, loadCarats })(
  IssueData
);
