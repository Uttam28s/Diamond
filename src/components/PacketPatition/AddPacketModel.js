import {
  Form,
  Icon,
  Input,
  Button,
  Col,
  Row,
  DatePicker,
  Select,
  message,
  // notification
} from "antd";
import {
  loadManagers,
  loadCarats,
  addPacket,
  listsrno,
} from "../../Action/Packet";
import { unusedRough } from "../../Action/Rough";
import { connect } from "react-redux";
import moment from "moment";
import React, { Component } from "react";

const { Option } = Select;

// function hasErrors(fieldsError) {
//   return Object.keys(fieldsError).some(field => fieldsError[field]);
// }

class AddPacket extends Component {
  constructor() {
    super();
    this.state = {
      mname: [],
      carat: [],
      id: "",
      unusedRough: "",
      date: "",
      srno: 0,
    };
  }
  componentDidMount = async () => {
    const { form } = this.props;
    await this.props.loadManagers().then((res) => {
      // console.log(
      //   "this is a responce in a componentdidMount of a Packet :->",
      //   res
      // );
      this.setState({
        mname: res,
      });
    });
    form.setFieldsValue({
      date: moment(),
    });
    await this.props.loadCarats().then((res) => {
      // console.log(
      //   "this is a Carat in a componentdidMount of a Packet :->",
      //   res
      // );
      this.setState({
        carat: res,
        date: moment().format("YYYY-MM-DD"),
      });
    });
  };

  handleCancel = () => {
    this.props.closeBox();
  };

  onChange = async (date, dateString) => {
    console.log(date, dateString);
    const { form } = this.props;
    await this.props.unusedRough(dateString.key).then((res) => {
      // console.log("TCL: onChange -> res", res);
      this.setState(
        {
          unusedRough: res === null ? date : res.office_unused_carat,
          id: dateString.key,
        },
        () => {
          form.setFieldsValue({
            available: this.state.unusedRough,
          });
        }
      );
    });

    await this.props.listsrno(date).then((res) => {
      console.log("srno -> ", res);
      if (res.length >= 1) {
        form.setFieldsValue({
          srno: res[0].srno + 1,
        });
        this.setState({
          srno: res[0].srno + 1,
        });
      } else {
        form.setFieldsValue({
          srno: 1,
        });
        this.setState({
          srno: 1,
        });
      }
    });
  };

  handleSubmit = (e) => {
    console.log("TCL: e", e);
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const date = moment(values.date).format("YYYY-MM-DD");
        const id = this.state.id;
        console.log("TCL: id", id);
        const data = {
          id: id,
          // name: values.mname,
          pcs: values.pcs,
          date: date,
          srno: this.state.srno,
          pcarat: values.pcarat,
        };
        console.log("Received values of form: ", values, data);
        this.props.addPacket(data).then((res) => {
          this.props.handelAddPacket();
          message.success("Packet added successfully");
        });
        // this.props.addRough(values);
        this.props.closeBox();
        console.log("TCL: data", data);
      }
    });
  };

  onChanges = (value) => {
    console.log(`selected ${value}`);
  };

  onBlur = () => {
    console.log("blur");
  };

  onFocus = () => {
    console.log("focus");
  };

  onSearch = (val) => {
    console.log("search:", val);
  };

  render() {
    const dateFormat = "YYYY/MM/DD";
    console.log(moment().format("YYYY-MM-DD"));
    const { getFieldDecorator } = this.props.form;
    return (
      <Row gutter={18}>
        <Form onSubmit={this.handleSubmit}>
          <Col span={12}>
            <Form.Item label="Caret Id*">
              {getFieldDecorator("caret", {
                rules: [{ required: true, message: "Enter The Caret!" }],
              })(
                <Select
                  showSearch
                  placeholder="Carat"
                  optionFilterProp="children"
                  onChange={this.onChange}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  onSearch={this.onSearch}
                  filterOption={true}
                >
                  {this.state.carat.map((value, id) => {
                    // // console.log("TCL: render -> value", value);
                    return (
                      <Option value={value.carat} key={value.id}>
                        {value.carat}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Sr No. *">
              {getFieldDecorator("srno", {
                rules: [{ required: true }],
                setFieldsValue: this.state.srno,
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  disabled
                  type="number"
                  // value={this.state.srno}
                  placeholder="Amount"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Available *">
              {getFieldDecorator("available", {
                // rules: [{ required: true }],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  disabled
                  type="number"
                  placeholder="Amount"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Packet Carat *">
              {getFieldDecorator("pcarat", {
                rules: [{ required: true }],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="number"
                  placeholder="Packet Carat"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Piece *">
              {getFieldDecorator("pcs", {
                rules: [{ required: true, message: "Enter The Amount!" }],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="number"
                  placeholder="Amount"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Create Date *">
              {getFieldDecorator("date", {
                rules: [{ required: true, message: "Enter The Date!" }],
                setFieldsValue: moment(),
              })(
                <DatePicker
                  onChange={this.onChange}
                  // value={moment()}
                  format={dateFormat}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={4} offset={15}>
            <Form.Item>
              <Button onClick={this.handleCancel}>Cancel</Button>
            </Form.Item>
          </Col>
          <Col span={4} offset={1}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Form>
      </Row>
    );
  }
}

const AddPackets = Form.create({ name: "normal_login" })(AddPacket);

const mapStateToProps = (state) => ({ ...state.Packet });

export default connect(mapStateToProps, {
  loadManagers,
  loadCarats,
  unusedRough,
  addPacket,
  listsrno,
})(AddPackets);
