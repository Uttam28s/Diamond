import { Form, Icon, Input, Button, Col, Row, DatePicker  } from "antd";
import React, { Component } from "react";

// function hasErrors(fieldsError) {
//   return Object.keys(fieldsError).some(field => fieldsError[field]);
// }

class CreateRough extends Component {
  constructor() {
    super();
    this.state = {};
  }
  //   componentDidMount() {
  //     To disabled submit button at the beginning.
  //     this.props.form.validateFields();
  //   }

  //   handleSubmit = e => {
  //     e.preventDefault();
  //     this.props.form.validateFields((err, values) => {
  //       if (!err) {
  //         console.log("Received values of form: ", values);
  //       }
  //     });
  //   };

  //   render() {
  //     const {
  //       getFieldDecorator,
  //       getFieldsError,
  //       getFieldError,
  //       isFieldTouched
  //     } = this.props.form;

  //     Only show error after a field is touched.
  //     const usernameError =
  //       isFieldTouched("username") && getFieldError("username");
  //     const passwordError =
  //       isFieldTouched("password") && getFieldError("password");
  //     return (
  //       <Form layout="inline" onSubmit={this.handleSubmit}>
  //         <Form.Item
  //           validateStatus={usernameError ? "error" : ""}
  //           help={usernameError || ""}
  //         >
  //           {getFieldDecorator("username", {
  //             rules: [{ required: true, message: "Please input your username!" }]
  //           })(
  //             <Input
  //               prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
  //               placeholder="Username"
  //             />
  //           )}
  //         </Form.Item>
  //         <Form.Item
  //           validateStatus={passwordError ? "error" : ""}
  //           help={passwordError || ""}
  //         >
  //           {getFieldDecorator("password", {
  //             rules: [{ required: true, message: "Please input your Password!" }]
  //           })(
  //             <Input
  //               prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
  //               type="password"
  //               placeholder="Password"
  //             />
  //           )}
  //         </Form.Item>
  //         <Form.Item>
  //           <Button
  //             type="primary"
  //             htmlType="submit"
  //             disabled={hasErrors(getFieldsError())}
  //           >
  //             Log in
  //           </Button>
  //         </Form.Item>
  //       </Form>
  //     );
  //   }
  // }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.addRough(values);
        this.props.closeBox();
      }
    });
  };

  handleCancel = () => {
    this.props.closeBox();
  };

  onChange = (date, dateString) => {
    console.log(date, dateString);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row gutter={18}>
        <Form onSubmit={this.handleSubmit}>
          <Col span={24}>
            <Form.Item label="Seller Name *">
              {getFieldDecorator("sellername", {
                rules: [
                  { required: true, message: "Please input Seller Name!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Seller Name"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Caret *">
              {getFieldDecorator("caret", {
                rules: [{ required: true, message: "Enter The Caret!" }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="number"
                  placeholder="Caret"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Amount *">
              {getFieldDecorator("amount", {
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
              })(
                <DatePicker  onChange={this.onChange} />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
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
          </Col>
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

const CreateRoughs = Form.create({ name: "normal_login" })(CreateRough);

export default CreateRoughs;
