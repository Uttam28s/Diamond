import { Form, Icon, Input, Button, Col, Row, Select } from "antd";
import React, { Component } from "react";
import { addSorting,unusedRough } from "../../Action/Rough";
import { connect } from "react-redux";

// function hasErrors(fieldsError) {
//   return Object.keys(fieldsError).some(field => fieldsError[field]);
// }
// const sortingData = [];

class RoughSorting extends Component {
  constructor() {
    super();
    this.state = {
      sortingData : [],
      data:{},
      unused:''
    };
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps.unused != this.props.unused){
      this.setState({unused:this.props.unused})
    }
  }
    componentDidMount() {
      // To disabled submit button at the beginning.
      // this.props.form.validateFields();
      this.props.unusedRough(this.props.data.id)
    }

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
        this.state.sortingData.push(values);
        const roughTypes = values.roughType;
        const caret = roughTypes+"_"+"carat";
          const amount = roughTypes+"_"+"price";
        // const data ={
        //   [caret]:values.carat,
        //   [amount]: values.amount
        // }
        this.state.data[caret] = values.caret;
        this.state.data[amount]= values.amount
        console.log("if it is success then i will doing party on the night",this.state.data)


        this.props.form.setFields({
          roughType: {
            value: '',
          },
          caret: {
            value: '',
          },
          amount: {
            value:  '',
          }
        });

        // this.setState({
        //   data : {
        //     [caret]:values.caret,
        //     [amount]:values.amount
        //   }
        // },()=>{console.log("if it is success then i will doing party on the night",this.state.data)})
        // const sorting =this.state.sortingData;
        // const data = sorting.map
        // const datas = [];
        // this.state.sortingData.map((values,id) => {
        //   const roughTypes = sorting[id].roughType;
        //   const caret = roughTypes+"_"+"carat";
        //   const amount = roughTypes+"_"+"price";
        //   // console.log("TCL: caret", caret)
        //   const data = {
        //     [caret]: sorting[id].caret,
        //     [amount]:sorting[id].amount
        //   }
        //   datas.push(data);
        // })
        // console.log("TCL: data", datas)
      }
    });
  };

  handelNext = () => {
    const values = {
      ...this.state.data,
      _id : this.props.data.id
    }
    this.props.addSorting(values)
    console.log("TCL: handelNext -> values", values)
    this.props.closeBox();
  }

  // handelSortingData = (data) => {
    
  // }

  handleCancel = () => {
    this.props.closeBox();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { Option } = Select;
    const {data} = this.props;
    console.log("TCL: render -> data", this.props.data)
    return (
      <Row gutter={18}>
        <Form onSubmit={this.handleSubmit}>
          <Col span={6}>
            <Form.Item label="Rough Caret">
              {getFieldDecorator("roughCaret",{ initialValue: data.caret } ,{
                rules: [
                  { required: true, message: "Please Enter Rough Type !" }
                ]
              })(
                <Input disabled/>
              )}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Remaining">
              {getFieldDecorator("remaining",{ initialValue: this.state.unused })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="number"
                  disabled
                  placeholder=""
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Type Of Rough*">
              {getFieldDecorator("roughType", {
                rules: [
                  { required: true, message: "Please Enter Rough Type !" }
                ]
              })(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select Rough Type"
                  optionFilterProp="children"
                  // onChange={onChange}
                  // onFocus={onFocus}
                  // onBlur={onBlur}
                  // onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="chocki">Chocki</Option>
                  <Option value="gol">Gol</Option>
                  <Option value="markis">Markis</Option>
                  <Option value="crystal">Crystal</Option>
                  <Option value="out">Out</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Caret">
              {getFieldDecorator("caret", {
                rules: [{ required: true, message: "Enter The Caret!" }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="number"
                  min={0}
                  max={this.state.unused}
                  placeholder="Caret"
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Amount">
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
          <Col span={4} offset={0}>
            <Form.Item>
              <Button type="primary" onClick={this.handelNext}>
                Submit
              </Button>
            </Form.Item>
          </Col>
          <Col span={4} offset={11}>
            <Form.Item>
              <Button onClick={this.handleCancel}>Cancel</Button>
            </Form.Item>
          </Col>
          <Col span={4} offset={1}>
            <Form.Item>
              <Button type="primary" htmlType="submit" >
                Next
              </Button>
            </Form.Item>
          </Col>
        </Form>
      </Row>
    );
  }
}

const RoughSortings = Form.create({ name: "normal_login" })(RoughSorting);

const mapStateToProps = state => ({ ...state.Test });

// const mapDispatchToProps = dispatch => ({
//   addSorting:(data) =>{
//     dispatch(addSorting(data));
//   },
// });

export default connect(
	mapStateToProps,
	{addSorting , unusedRough}
)(RoughSortings);