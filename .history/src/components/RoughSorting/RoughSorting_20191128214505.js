// import { Form, Icon, Input, Button, Col, Row, Select, Table, Popconfirm } from "antd";
// import React, { Component } from "react";
// import { addSorting,unusedRough } from "../../Action/Rough";
// import { connect } from "react-redux";

// // function hasErrors(fieldsError) {
// //   return Object.keys(fieldsError).some(field => fieldsError[field]);
// // }
// // const sortingData = [];

// const EditableContext = React.createContext();

// const EditableRow = ({ form, index, ...props }) => (
//   <EditableContext.Provider value={form}>
//     <tr {...props} />
//   </EditableContext.Provider>
// );

// const EditableFormRow = Form.create()(EditableRow);

// class EditableCell extends Component {
//   state = {
//     editing: false,
//   };

//   toggleEdit = () => {
//     const editing = !this.state.editing;
//     this.setState({ editing }, () => {
//       if (editing) {
//         this.input.focus();
//       }
//     });
//   };

//   save = e => {
//     const { record, handleSave } = this.props;
//     this.form.validateFields((error, values) => {
//       if (error && error[e.currentTarget.id]) {
//         return;
//       }
//       this.toggleEdit();
//       handleSave({ ...record, ...values });
//     });
//   };

//   renderCell = form => {
//     this.form = form;
//     const { children, dataIndex, record, title } = this.props;
//     const { editing } = this.state;
//     return editing ? (
//       <Form.Item style={{ margin: 0 }}>
//         {form.getFieldDecorator(dataIndex, {
//           rules: [
//             {
//               required: true,
//               message: `${title} is required.`,
//             },
//           ],
//           initialValue: record[dataIndex],
//         })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
//       </Form.Item>
//     ) : (
//       <div
//         className="editable-cell-value-wrap"
//         style={{ paddingRight: 24 }}
//         onClick={this.toggleEdit}
//       >
//         {children}
//       </div>
//     );
//   };

//   render() {
//     const {
//       editable,
//       dataIndex,
//       title,
//       record,
//       index,
//       handleSave,
//       children,
//       ...restProps
//     } = this.props;
//     return (
//       <td {...restProps}>
//         {editable ? (
//           <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
//         ) : (
//           children
//         )}
//       </td>
//     );
//   }
// }

// class EditableTable extends Component {
//   constructor(props) {
//     super(props);
//     this.columns = [
//       {
//         title: 'name',
//         dataIndex: 'name',
//         width: '30%',
//         editable: true,
//       },
//       {
//         title: 'age',
//         dataIndex: 'age',
//       },
//       {
//         title: 'address',
//         dataIndex: 'address',
//       },
//       {
//         title: 'operation',
//         dataIndex: 'operation',
//         render: (text, record) =>
//           this.state.dataSource.length >= 1 ? (
//             <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
//               <a>Delete</a>
//             </Popconfirm>
//           ) : null,
//       },
//     ];

//     this.state = {
//       dataSource: [],
//       count: 0,
//     };
//   }

//   handleDelete = key => {
//     const dataSource = [...this.state.dataSource];
//     this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
//   };

//   handleAdd = () => {
//     const { count, dataSource } = this.state;
//     const newData = {
//       key: count,
//       name: `Edward King ${count}`,
//       age: 32,
//       address: `London, Park Lane no. ${count}`,
//     };
//     this.setState({
//       dataSource: [...dataSource, newData],
//       count: count + 1,
//     });
//   };

//   componentDidMount(){
//     console.log("this.props.data ->,",this.props.data);
//     this.props.unusedRough(this.props.data.id);
//   }
//   handleSave = row => {
//     const newData = [...this.state.dataSource];
//     const index = newData.findIndex(item => row.key === item.key);
//     const item = newData[index];
//     newData.splice(index, 1, {
//       ...item,
//       ...row,
//     });
//     this.setState({ dataSource: newData });
//   };

//   render() {
//     const { dataSource } = this.state;
//     const components = {
//       body: {
//         row: EditableFormRow,
//         cell: EditableCell,
//       },
//     };
//     const columns = this.columns.map(col => {
//       if (!col.editable) {
//         return col;
//       }
//       return {
//         ...col,
//         onCell: record => ({
//           record,
//           editable: col.editable,
//           dataIndex: col.dataIndex,
//           title: col.title,
//           handleSave: this.handleSave,
//         }),
//       };
//     });
//     return (
//       <div>
//         <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
//           Add a row
//         </Button>
//         <Input type="number" value="23" disabled></Input>
//         <Table
//           components={components}
//           rowClassName={() => 'editable-row'}
//           bordered
//           dataSource={dataSource}
//           columns={columns}
//         />
//       </div>
//     );
//   }
// }


// const RoughSortings = Form.create({ name: "normal_login" })(EditableTable);

// const mapStateToProps = state => ({ ...state.Test });

// // const mapDispatchToProps = dispatch => ({
// //   addSorting:(data) =>{
// //     dispatch(addSorting(data));
// //   },
// // });

// export default connect(
// 	mapStateToProps,
// 	{addSorting , unusedRough}
// )(RoughSortings);


import { Form, Icon, Input, InputNumber, Button, Col, Row, Select, Table, Popconfirm, DatePicker, TimePicker, Checkbox, Radio } from "antd";
import React, { Component } from "react";
import { addSorting,unusedRough } from "../../Action/Rough";
import { connect } from "react-redux";
import { EditableFormRow, EditableContext } from "./EditableFormRow";
// import EditableCell from "./EditableCell";
import { antData } from "../../Data/antData";
import { antColumns } from "./antColumns";
import { plCleanData, cleanTheData, raw } from "../../Data/plCleanData";
import { plColumns } from "./plColumns";
import rawData from "../../Data/plRawData.json";
import moment from "moment";
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
const sortingData = [];


const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);


class EditableCell extends Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if(editing){
      this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  // renderCell = form => {
  //   this.form = form;
  //   const { children, dataIndex, record, title } = this.props;
  //   const { editing } = this.state;
  //   return editing ? (
  //     <Form.Item style={{ margin: 0 }}>
  //       {form.getFieldDecorator(dataIndex, {
  //         rules: [
  //           {
  //             required: true,
  //             message: `${title} is required.`,
  //           },
  //         ],
  //         initialValue: record[dataIndex],
  //       })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
  //     </Form.Item>
  //   ) : (
  //     <div
  //       className="editable-cell-value-wrap"
  //       style={{ paddingRight: 24 }}
  //       onClick={this.toggleEdit}
  //     >
  //       {children}
  //     </div>
  //   );
  // };

  getInput = (record, dataIndex, title, getFieldDecorator) => {
    switch (this.props.inputType) {
      case "number":
        return (
          <FormItem style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`
                }
              ],
              initialValue: record[dataIndex]
            })(
              <InputNumber  ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save}  formatter={value => value} parser={value => value} />
            )}
          </FormItem>
        );
      case "date":
        return (
          <FormItem style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              initialValue: moment(record[dataIndex], this.dateFormat)
            })(<DatePicker  ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save}  format={this.dateFormat} />)}
          </FormItem>
        );
      case "time":
        return (
          <FormItem style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              initialValue: moment(record[dataIndex], this.timeFormat)
            })(<TimePicker  ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save}  format={this.timeFormat} />)}
          </FormItem>
        );
      case "checkbox":
        return (
          <FormItem style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              initialValue: record[dataIndex] === "true",
              valuePropName: "checked"
            })(<Checkbox  ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save}  />)}
          </FormItem>
        );

      case "radio":
        return (
          <FormItem style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              initialValue: record[dataIndex]
            })(
              <RadioGroup  ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} >
                <Radio value={"a"}>a</Radio>
                <Radio value={"b"}>b</Radio>
              </RadioGroup>
            )}
          </FormItem>
        );
      case "select":
        return (
          <FormItem style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              initialValue: record[dataIndex]
            })(
              <Select style={{ width: 150 }}  ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} >
                <Option value="gol" key="gol">Gol</Option>
                <Option key="markis">Markis</Option>
                <Option key="crystal">Crystal</Option>
                <Option key="chocki">Chocki</Option>
                <Option key="out">Out</Option>
              </Select>
            )}
          </FormItem>
        );

      default:
        return (
          <FormItem style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`
                }
              ],
              initialValue: record[dataIndex]
            })(<Input />)}
          </FormItem>
        );
    }
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
    const { editing } = this.state;
    console.log(handleSave);
    return (
      // <td {...restProps}>
      //   {editable ? (
      //     <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
      //   ) : (
      //     children
      //   )}
      // </td>
      <EditableContext.Consumer>
        {form => {
           this.form = form;
          const { getFieldDecorator } = form;
          
          const data = record && record[dataIndex] ? record[dataIndex] : null
          if(!data){
          return <td {...restProps}> {children}</td>;
          }
          return (
            <td {...restProps}>
              {
                !editing ? 
                <div onClick={this.toggleEdit} >
                {data}
                </div> : this.getInput(record, dataIndex, title, getFieldDecorator)
              }
              {/* {editable
                ? // <FormItem style={{ margin: 0 }}>
                  //   {getFieldDecorator(dataIndex, {
                  //     rules: [
                  //       {
                  //         required: true,
                  //         message: `Please Input ${title}!`
                  //       }
                  //     ]
                  //     // initialValue: record[dataIndex]
                  //   })(this.getInput())}
                  // </FormItem>
                  this.getInput(record, dataIndex, title, getFieldDecorator)
                : restProps.children} */}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class EditableTable extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      ...plColumns,
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];

    this.state = {
      dataSource: rawData,
      data: {},
      editingKey: "",
      count: 0,
    };
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      type: "Gol",
      carat:1,
      price:1
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  componentDidMount(){
    console.log("this.props.data ->,",this.props.data);
    this.props.unusedRough(this.props.data.id);
  }

  handelSubmit = async() => {
    this.state.dataSource.map((value,id) => {
      console.log("this is a log in ahandel submit :->",value);
        const roughTypes = value.type;
        const caret = roughTypes+"_"+"carat";
          const amount = roughTypes+"_"+"price";
        // const data ={
        //   [caret]:values.carat,
        //   [amount]: values.amount
        // }
        this.state.data[caret] = value.carat;
        this.state.data[amount]= value.price
    });
    this.state.data["_id"] = this.props.unused.rough_id || 0;
    console.log("if it is success then i will doing party on the night",this.state.data);
    await this.props.addSorting(this.state.data).then(res => {
      this.props.closeBox();
    })
  }

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
    // console.log("this js a new data : >//",newData)
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => {
          const checkInput = index => {
            switch (index) {
              case "carat":
                return "number";
              case "price":
                return "number";
              case "type":
                return "select";
              case "freeclick":
                return "checkbox";
              case "network":
                return "radio";
              case "PlistaProduct":
                return "select";
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
            editable: col.editable,
            handleSave: this.handleSave,
          };
        }
      };
    });
    return (
      <div>
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add a row
        </Button>
        <Row gutter={24}>
          <Col span={3}>
            <label>Caret</label>
          </Col>
          <Col span={6}>
            <Input type="number" value={this.props.unused.carat || 0} disabled/>
          </Col>
          <Col span={4} offset={4}>
            <label>Remaining</label>
          </Col>
          <Col span={6}>
            <Input type="number" value={this.props.unused.unused_carat || 0} disabled/>
          </Col>
        </Row>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          style={{marginTop:'20px'}}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
        <div style={{textAlign:'-webkit-right'}}>
          <Button onClick={this.handelSubmit} type="primary" style={{ marginTop: 16 }}>
            Submit
          </Button>
        </div>
      </div>
    );
  }
}


const RoughSortings = Form.create({ name: "normal_login" })(EditableTable);

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