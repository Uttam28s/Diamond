import React, { Component } from "react";
import Layouts from "../Home/Layout";
import Header from "../Home/Header";
// import ReactTable from "react-table";
// import CreateRough from "../Rough/CreateRough";
import "react-table/react-table.css";
import { Button } from "antd";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Dropdown,
  Icon,
  Badge,
  Menu
} from "antd";
import Models from "../../js/model";

const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`
  });
}
const EditableContext = React.createContext();

class EditableCell extends Component {
  getInput = () => {
    if (this.props.inputType === "number") {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`
                }
              ],
              initialValue: record[dataIndex]
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    );
  }
}
class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data, editingKey: "", type: "" };
    this.columns = [
      {
        title: "Seller Name",
        dataIndex: "name",
        width: "25%",
        editable: true
      },
      {
        title: "Caret",
        dataIndex: "age",
        width: "15%",
        editable: true
      },
      {
        title: "Amount",
        dataIndex: "address",
        width: "20%",
        editable: true
      },
      {
        title: "Total Price",
        dataIndex: "address",
        width: "20%",
        editable: true
      },
      {
        title: "operation",
        dataIndex: "operation",
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm
                title="Sure to cancel?"
                onConfirm={() => this.cancel(record.key)}
              >
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <div>
              <a
                disabled={editingKey !== ""}
                onClick={() => this.edit(record.key)}
              >
                Edit
              </a>
              <a
                style={{ marginLeft: "10%" }}
                disabled={editingKey !== ""}
                onClick={this.sortingModel}
              >
                ADD
              </a>
            </div>
          );
        }
      }
    ];
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: "" });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        this.setState({ data: newData, editingKey: "" });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: "" });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  sortingModel = () => {
    this.setState({
      type: "AddSorting"
    });
  };

  showModal = () => {
    this.setState({
      type: "AddRough"
    });
  };

  onCancel = () => {
    this.setState({
      type: ""
    });
  };

  render() {
    const components = {
      body: {
        cell: EditableCell
      }
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === "age" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });
    const expandedRowRender = () => {
      const columns = [
        { title: "Date", dataIndex: "date", key: "date" },
        { title: "Name", dataIndex: "name", key: "name" },
        {
          title: "Status",
          key: "state",
          render: () => (
            <span>
              <Badge status="success" />
              Finished
            </span>
          )
        },
        { title: "Upgrade Status", dataIndex: "upgradeNum", key: "upgradeNum" },
        {
          title: "Action",
          dataIndex: "operation",
          key: "operation",
          render: () => (
            <span className="table-operation">
              <a>Pause</a>
              <a>Stop</a>
              <Dropdown overlay={menu}>
                <a>
                  More <Icon type="down" />
                </a>
              </Dropdown>
            </span>
          )
        }
      ];

      const data = [];
      for (let i = 0; i < 3; ++i) {
        data.push({
          key: i,
          date: "2014-12-24 23:12:00",
          name: "This is production name",
          upgradeNum: "Upgraded: 56"
        });
      }
      return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    return (
			<div style={{ display: "flex" }}>
				<Layouts />
				<div style={{ width: "100%" }}>
					<Header />
					<div
						style={{
							height: "7%",
							backgroundColor: "#F2F2F2",
							display: "flex",
							alignItems: "center",
							placeContent: "flex-end"
						}}
					>
						<Button style={{ right: "2%" }} type="primary" icon="plus" onClick={this.showModal}>
							ADD
						</Button>
						{this.state.type === "AddRough" ? (
							<Models
								type="AddRough"
								title="ADD ROUGH"
								onCancel={this.onCancel}
								addRough={this.props.addrough}
							/>
						) : (
							""
						)}
						{this.state.type === "AddSorting" ? (
							<Models type="Sorting" title="ADD SORTING OF ROUGH" onCancel={this.onCancel} />
						) : (
							""
						)}
					</div>
					<EditableContext.Provider value={this.props.form}>
						<Table
							components={components}
							bordered
							dataSource={this.state.data}
							columns={columns}
							rowClassName="editable-row"
							expandedRowRender={expandedRowRender}
							pagination={{
								onChange: this.cancel
							}}
						/>
					</EditableContext.Provider>
				</div>
			</div>
		);
  }
}

const Rough = Form.create()(EditableTable);

export default Rough;
