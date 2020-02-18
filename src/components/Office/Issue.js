import {
  Form,
  Icon,
  Input,
  Button,
  Col,
  Row,
  DatePicker,
  Radio,
  Select,
  message
} from "antd";
import {
  loadManagers,
  loadCarats,
  addPacket,
  listsrno,
  listCaratPck,
  setPacketIssueOffice,
  returnSawingPacket,
  sawingIssueSrno,
  chapkaIssueSrno,
  setChapkaIssueOffice,
  returnChapkaPacket
} from "../../Action/Packet";
import { unusedRough } from "../../Action/Rough";
import { connect } from "react-redux";
import moment from "moment";
import "./Office.css";
import React, { Component } from "react";

const { Option } = Select;

class IssueCarat extends Component {
  constructor() {
    super();
    this.state = {
      mname: [],
      carat: [],
      id: "",
      pckCarat: [],
      singleSrno: [],
      unusedRough: "",
      srno: 0,
      roughId: "",
      value: "sawing",
      type: "",
      sawingSrno: []
    };
  }
  componentDidMount = async () => {
    await this.props.loadManagers().then(res => {
      // console.log(
      //   "this is a responce in a componentdidMount of a Packet :->",
      //   res
      // );
      this.setState({
        mname: res
      });
    });
    this.props.form.setFieldsValue({
      date: moment()
    });

    // this.props.sawingIssueSrno().then(res => {
    //   console.log("this is a log in a srno list :->", res);
    //   this.setState({
    //     sawingSrno: res
    //   });
    // });

    await this.props.loadCarats().then(res => {
      // console.log(
      //   "this is a Carat in a componentdidMount of a Packet :->",
      //   res
      // );
      this.setState({
        carat: res
      });
    });
  };

  handleCancel = () => {
    this.props.closeBox();
  };

  onChange = async (date, dateString) => {
    console.log(date, dateString);
    // await this.props.unusedRough(dateString.key).then(res => {
    //   // console.log("TCL: onChange -> res", res);
    //   this.setState(
    //     {
    //       unusedRough: res.office_unused_carat || res.unused_carat,
    //       id: dateString.key
    //     },
    //     () => {
    //       const { form } = this.props;
    //       form.setFieldsValue({
    //         available: this.state.unusedRough
    //       });
    //     }
    //   );
    // });
    await this.props.listCaratPck(date).then(res => {
      console.log("TCL: onChange -> res", res);
      this.setState(
        {
          pckCarat: res
        },
        () => {
          const srnoData = [];
          this.state.pckCarat.find(item => {
            const singleSrno = item.srno;
            const jointData = { srno: singleSrno };
            srnoData.push(jointData);
          });
          this.setState({
            singleSrno: srnoData
          });
          this.props.form.setFieldsValue({
            available: this.state.pckCarat[0].available_stock
          });
        }
      );
    });
    //   this.setState(
    //     {
    //       unusedRough: res.office_unused_carat || res.unused_carat,
    //       id: dateString.key
    //     },
    //     () => {
    //       const { form } = this.props;
    //       form.setFieldsValue({
    //         available: this.state.unusedRough
    //       });
    //     }
    //   );
    // });

    // await this.props.listsrno(date).then(res => {
    //   console.log("srno -> ", res);
    //   this.setState(
    //     {
    //       srno: res[0].srno + 1
    //     },
    //     () => console.log("this is a log in a list srno ->", this.state.srno)
    //   );
    // });
  };

  handelIssue = (values, id, date) => {
    if (this.state.value === "sawing") {
      const data = {
        caratId: id,
        manager_name: values.mname,
        pcs: values.pcs,
        distrtibute_date: date,
        srno: this.state.srno,
        carat: values.pcarat,
        return: 0,
        type: values.lose,
        packetType: values.type
      };
      this.props.setPacketIssueOffice(data).then(res => this.props.closeBox());
      console.log("Received values of form: ", values, data);
    } else {
      const data = {
        caratId: id,
        chapka_manager_name: values.mname,
        chapka_pcs: values.pcs,
        chapka_distrtibute_date: date,
        srno: this.state.srno,
        chapka_carat: values.pcarat,
        chapkaReturn: 0,
        type: values.lose,
        // packetType: values.type
      };
      this.props.setChapkaIssueOffice(data).then(res => this.props.closeBox());
      console.log("Received values of form: ", values, data);
    }
  };

  handelReturn = values => {
    if (this.state.value === "sawing") {
      const sawingReturn = {
        caratId: values.id,
        srno: this.state.srno,
        return_carat: values.values.pcarat,
        return_pcs: values.values.pcs,
        return_date: values.date
      };
      this.props
        .returnSawingPacket(sawingReturn)
        .then(res => this.props.closeBox());
    } else {
      const chapkaReturn = {
        caratId: values.id,
        srno: this.state.srno,
        chapka_return_carat: values.values.pcarat,
        chapka_return_pcs: values.values.pcs,
        chapka_return_date: values.date
      };
      this.props
        .returnChapkaPacket(chapkaReturn)
        .then(res => this.props.closeBox());
      // message.success("Packet return Successfully")}
    }
  };

  handleSubmit = e => {
    console.log("TCL: e", e);
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const date = moment(values.date).format("YYYY-MM-DD");
        const id = this.state.roughId;
        console.log("TCL: id", id);

        if (this.props.type === "return") {
          const data = {
            id,
            date,
            values
          };
          this.handelReturn(data);
        } else {
          this.handelIssue(values, id, date);
        }
      }
    });
  };

  onChangeSrno = (date, dateString) => {
    console.log("TCL: onChangeSrno -> date, dateString", date, dateString);
    const singlePacketDetails = this.state.pckCarat.find(
      item => item.srno === date
    );
    this.props.form.setFieldsValue({
      available: this.state.pckCarat[0].available_stock,
      pcarat: singlePacketDetails.carat,
      pcs: singlePacketDetails.pcs
    });
    this.setState({
      roughId: singlePacketDetails.rough_id,
      srno: date
    });
    console.log(
      "TCL: onChangeSrno -> singlePacketDetails",
      singlePacketDetails
    );
  };

  onChangeSawing = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value
    });
    if (e.target.value === "sawing") {
      this.props.sawingIssueSrno().then(res => {
        this.setState({
          sawingSrno: res
        });
      });
    } else {
      this.props.chapkaIssueSrno().then(res => {
        console.log("this is a log in a chapka issue srno ->", res);
        this.setState({
          sawingSrno: res
        });
      });
    }
  };

  onChangeSawingType = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value
    });
  };

  onChanges = value => {
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const { type } = this.props;
    return (
      <Row gutter={18}>
        <Form onSubmit={this.handleSubmit}>
          <h3 className="form-title">
            {this.props.type === "return" ? "Rough Return" : "Rough Issue"}
          </h3>
          <Col span={12}>
            <Form.Item label="Type *">
              {getFieldDecorator("type", {
                rules: [{ required: true }]
              })(
                <Radio.Group
                  defaultValue="sawing"
                  onChange={this.onChangeSawing}
                  value={this.state.value}
                >
                  <Radio value="sawing">Sawing</Radio>
                  <Radio value="chapka">Chapka</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Col>
          {this.props.type === "return" ? (
            " "
          ) : (
            <Col span={12}>
              <Form.Item label="Lose/Plate *">
                {getFieldDecorator("lose")(
                  <Radio.Group
                    onChange={this.onChangeSawingType}
                    value={this.state.type}
                  >
                    <Radio value="lose">Lose</Radio>
                    <Radio value="plate">Plate</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
          )}
          <Col span={6}>
            <Form.Item label="Caret Id*">
              {getFieldDecorator("caret", {
                rules: [{ required: true, message: "Enter The Caret!" }]
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
          <Col span={6}>
            <Form.Item label="Sr No. *">
              {getFieldDecorator("srno", {
                rules: [{ required: true }]
              })(
                <Select
                  showSearch
                  placeholder="Packet No."
                  optionFilterProp="children"
                  onSearch={this.onSearch}
                  onChange={this.onChangeSrno}
                  filterOption={true}
                >
                  {type === "return"
                    ? this.state.sawingSrno.map((value, id) => {
                        return (
                          <Option value={value.srno} key={value.srno}>
                            {value.srno}
                          </Option>
                        );
                      })
                    : this.state.singleSrno.map((value, id) => {
                        return (
                          <Option value={value.srno} key={value.srno}>
                            {value.srno}
                          </Option>
                        );
                      })}
                </Select>
              )}
            </Form.Item>
          </Col>
          {this.props.type === "return" ? (
            " "
          ) : (
            <Col span={12}>
              <Form.Item label="Manager Name *">
                {getFieldDecorator("mname", {
                  rules: [
                    { required: true, message: "Please input Manager Name!" }
                  ]
                })(
                  <Select
                    showSearch
                    placeholder="Manager Name"
                    optionFilterProp="children"
                    // onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onSearch={this.onSearch}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {this.state.mname.map((value, id) => {
                      // // console.log("TCL: render -> value", value);
                      return (
                        <Option
                          value={value.manager_name}
                          key={value.manager_id}
                        >
                          {value.manager_name}
                        </Option>
                      );
                    })}
                  </Select>
                )}
              </Form.Item>
            </Col>
          )}
          <Col span={12}>
            <Form.Item label="Available *">
              {getFieldDecorator("available", {
                rules: [{ required: true }]
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
                rules: [{ required: true }]
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
                rules: [{ required: true, message: "Enter The Amount!" }]
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
            <Form.Item label="Purchase Date *">
              {getFieldDecorator("date", {
                rules: [{ required: true, message: "Enter The Amount!" }]
              })(<DatePicker onChange={this.onChange} />)}
            </Form.Item>
          </Col>
          {/* <Col span={12}>
              <Form.Item label="Payment Days *">
                {getFieldDecorator("days", {
                  rules: [{ required: true, message: "Enter The Amount!" }]
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
            </Col> */}
          {/* <Col span={24}>
              <Form.Item label="Total Price">
                {getFieldDecorator("totalPrice", {})(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    disabled={true}
                    placeholder="Total Price"
                  />
                )}
              </Form.Item>
            </Col> */}
          <Col className="cancel-button-class" span={4} offset={15}>
            <Form.Item>
              <Button onClick={this.handleCancel}>Cancel</Button>
            </Form.Item>
          </Col>
          <Col className="submit-button-class" span={4} offset={1}>
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

const IssueCarats = Form.create({ name: "normal_login" })(IssueCarat);

const mapStateToProps = state => ({ ...state.Packet });

export default connect(mapStateToProps, {
  listCaratPck,
  loadManagers,
  loadCarats,
  unusedRough,
  addPacket,
  returnSawingPacket,
  listsrno,
  setPacketIssueOffice,
  chapkaIssueSrno,
  sawingIssueSrno,
  setChapkaIssueOffice,
  returnChapkaPacket
})(IssueCarats);
