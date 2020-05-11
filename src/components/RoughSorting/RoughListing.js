import React, { Component } from "react";
import {
  Drawer,
  Table,
  Form,
  Popconfirm,
  // Button,
  // Col,
  // Row,
  Input,
  // Select,
  // DatePicker,
  // Icon,
  // Card,
  // List,
} from "antd";
import { connect } from "react-redux";
// const { Option } = Select;

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

// let data;

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = (e) => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = (form) => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(
          <Input
            ref={(node) => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
          />
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

class RoughList extends Component {
  showDrawer = () => {
    // this.setState({
    //   visible: true,
    // });
    console.log("this is a handel oK");
    this.props.handelOk();
  };

  onClose = () => {
    // this.setState({
    //   visible: false,
    // });
    console.log("this is a handel oK");
    this.props.handelCancel();
  };

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Type",
        dataIndex: "type",
        width: "30%",
        editable: true,
      },
      {
        title: "Caret",
        dataIndex: "carat",
      },
      {
        title: "Price",
        dataIndex: "price",
      },
      {
        title: "Total",
        dataIndex: "total",
      },
      {
        title: "operation",
        dataIndex: "operation",
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <p>Delete</p>
            </Popconfirm>
          ) : null,
      },
    ];

    this.state = {
      dataSource: [],
      count: 2,
      visible: false,
    };
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count + 1,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  // componentDidMount = () => {
  //   console.log("this is a data from the props :->",this.props.data)
  //   this.setState({
  //     dataSource : this.props.data,
  //   },() => {console.log("this data is a dataSource in a rough Listings",this.state.dataSource)})
  // }

  componentDidUpdate = (prevProps) => {
    if (prevProps.data !== this.props.data) {
      // const arrayShift = this.props.data.shift();
      this.setState(
        {
          dataSource: this.props.data || "",
        },
        () => {
          console.log(
            "this data is a dataSource in a rough Listings",
            this.state.dataSource
          );
        }
      );
    }
  };

  render() {
    // const { getFieldDecorator } = this.props.form;
    const { dataSource } = this.state;
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
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Drawer
          title="Create a new account"
          width={720}
          onClose={this.onClose}
          visible={this.showDrawer}
        >
          <div>
            <Table
              components={components}
              rowClassName={() => "editable-row"}
              bordered
              dataSource={dataSource}
              columns={columns}
            />
          </div>
        </Drawer>
      </div>
    );
  }
}

const RoughListing = Form.create()(RoughList);

const mapStateToProps = (state) => ({ ...state.Test });

export default connect(mapStateToProps, null)(RoughListing);
