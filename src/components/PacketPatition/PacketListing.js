import React from "react";
import { Table, Tag } from "antd";
import { connect } from "react-redux";
import { listPacket } from "../../Action/Packet";
import {
  EditableFormRow,
  // EditableContext
} from "../Constant/EditableTable/EditableTable/EditableFormRow";
import EditableCell from "../Constant/EditableTable/EditableTable/EditableCell";
// import { antData } from "../data/antData";
// import { antColumns } from "./antColumns";
import {
  // plCleanData,
  cleanTheData,
  // raw
} from "../Constant/EditableTable/data/plCleanData";
// import { plColumns } from "./plColumns";
// import moment from "moment";
// console.log(antData);
// console.log(plCleanData);

class PacketListing extends React.Component {
  state = { data: [], editingKey: "" };
  columns = [
    ...this.props.column,
    {
      title: "Status",
      dataIndex: "packet_status",
      render: (packet_status) => {
        // console.log("this is a log in a packet Partition in a tags ->", packet_status);
        // return (
        //   <span>
        //     {(tag => {

        //     })}
        //   </span>
        // );
        let color = "blue";
        if (packet_status === "Sawing Issue") {
          color = "red";
        }
        if (packet_status === "Sawing Return") {
          color = "cyan";
        }
        if (packet_status === "Chapka Issue") {
          color = "volcano";
        }
        if (packet_status === "Chapka Return") {
          color = "green";
        }
        return (
          <Tag color={color} key={packet_status}>
            {packet_status.toUpperCase()}
          </Tag>
        );
      },
      width: "15%",
      editable: false,
    },
  ];

  isEditing = (record) => {
    return record.key === this.state.editingKey;
  };

  edit(key) {
    this.setState({ editingKey: key });
  }

  handelIssue = (key) => {
    console.log("TCL: PacketListing -> handelIssue -> key", key);
  };

  handelReturn = (key) => {
    console.log("TCL: PacketListing -> handelReturn -> key", key);
  };

  save(form, key) {
    form.validateFields((error, row) => {
      console.log("TCL: PacketListing -> save -> row", row);
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      console.log("TCL: PacketListing -> save -> newData", newData);
      const index = newData.findIndex((item) => key === item.key);
      console.log("TCL: PacketListing -> save -> index", index);
      if (index > -1) {
        // pick the proper record based on primary key
        const item = newData[index];
        console.log("TCL: PacketListing -> save -> item", item);
        // Bugfix: preprocess date,time,boolean values to render properly on save
        const distrtibute_date = row.distrtibute_date.format("DD.MM.YYYY");
        // const timeFormatted = row.time.format("HH:mm");
        // const booleanToString = row.freeclick.toString();
        // const campToEuro = `€ ${row.camp_cpc}`;
        row.distrtibute_date = distrtibute_date;
        // row.time = timeFormatted;
        // row.freeclick = booleanToString;
        // row.camp_cpc = campToEuro;

        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        console.log("TCL: PacketListing -> save -> newData =>", newData);
        this.setState({ data: newData, editingKey: "" }, () => {
          console.log(
            "TCL: PacketListing -> save -> newData =>",
            this.state.data
          );
        });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: "" });
      }
    });
  }

  cancel = () => {
    this.setState({ editingKey: "" });
  };

  componentDidMount = () => {
    // this.props.listCarats();
    this.setState({
      data: cleanTheData(this.props.data),
    });
    // this.props.listPacket().then(res => {
    //   this.setState(
    //     {
    //       data: cleanTheData(res)
    //     },
    //     () =>
    //       console.log("this is a log in a state :-> ", this.state.packetList)
    //   );
    // });
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.data !== this.props.data) {
      this.setState({
        data: cleanTheData(this.props.data),
      });
    }
  };

  render() {
    // console.log(
    //   "this is a log for props in a PacketListing : -> ",
    //   this.state.data
    // );
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => {
          const checkInput = (index) => {
            // console.log("TCL: render -> index", index);
            switch (index) {
              case "total_carat":
                return "number";
              case "manager_name":
                return "input";
              case "carat":
                return "number";
              case "distrtibute_date":
                return "date";
              case "Available":
                return "number";
              default:
                return "text";
            }
          };
          return {
            record,
            // inputType: col.dataIndex === "age" ? "number" : "text",
            inputType: checkInput(col.dataIndex),
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.isEditing(record),
          };
        },
      };
    });

    // console.log(this.state.data);
    return (
      <Table
        components={components}
        bordered
        dataSource={this.state.data}
        columns={columns}
        rowClassName="editable-row"
      />
    );
  }
}

const mapStateToProps = (state) => ({ ...state.Test });

export default connect(mapStateToProps, { listPacket })(PacketListing);
