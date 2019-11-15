import React, { Component } from "react";
import Layouts from "../Home/Layout";
import Header from "../Home/Header";
// import ReactTable from "react-table";
import ColumnPlaceholder from '../../helper/ColumnPlaceholder'
import { connect } from "react-redux";
import './Rough.css';
// import CreateRough from "../Rough/CreateRough";
import { listRough, addRough, listSorting, updateRoughData } from "../../Action/Rough";
import "react-table/react-table.css";
import { Button, DatePicker } from "antd";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Dropdown,
  Icon,
  Switch,
  Badge,
  Menu
} from "antd";
import Models from "../../js/model";
import RoughListing from "../RoughSorting/RoughListing";

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
    this.state = { editingKey: "", type: "", drawer : false, drawerShows:'', data:'', sortingData:"", sortingCarat:{}};
    this.columns = [
      {
        title: "",
        dataIndex: "name",
        width: "4%",
        render: (text, record) =>{
        return( this.props.listRough.length >= 1 ? (
          <Icon type="eye" onClick={() => this.handelSorting(text, record)}/>
        ) : null)}
      },
      {
        title: "Seller",
        dataIndex: "_id",
        width: "2%",
        editable: true,
        className:"display",
        render: text => <ColumnPlaceholder text={text} />
      },
      {
        title: "Seller Name",
        dataIndex: "name",
        width: "25%",
        editable: true,
        render: text => <ColumnPlaceholder text={text} />
      },
      {
        title: "Caret",
        dataIndex: "carat",
        width: "15%",
        editable: true,
        render: text => <ColumnPlaceholder text={text} />
      },
      {
        title: "Amount",
        dataIndex: "price",
        width: "20%",
        editable: true,
        render: text => <ColumnPlaceholder text={text} />
      },
      {
        title: "Total Price",
        dataIndex: "rough_total",
        width: "20%",
        editable: true,
        render: text => <ColumnPlaceholder text={text} />
      },
      // {
      //   title: "Status",
      //   dataIndex: "completed",
      //   width: "20%",
      //   editable: true,
      //   render: (text, record) =>{
      //     return( this.props.listRough.length >= 1 ? (
      //       <Popconfirm
      //         title="Are you sure to complete the process?"
      //         onConfirm={this.confirm}
      //         okText="Yes"
      //         cancelText="No"
      //       >
      //         <Switch checkedChildren="Complete" unCheckedChildren="In-Processing" onChange={this.onChange} />
      //       </Popconfirm>
            
      //     ) : null)}
      // },
      {
        title: "Buy Date",
        dataIndex: "f_date",
        width: "15%",
        editable: true,
        render: text => <ColumnPlaceholder text={text} />
      },
      {
        title: "Last Date",
        dataIndex: "fp_date",
        width: "15%",
        editable: false,
        render: text => <ColumnPlaceholder text={text} />
      },
      {
        title: "Remaining Days",
        dataIndex: "remaining_days",
        width: "15%",
        editable: false,
        render: text => <ColumnPlaceholder text={text} />
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
                    onClick={() => this.save(form, record._id, record)}
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
                onClick={() => this.edit(record._id)}
              >
                Edit
              </a>
              <a
                style={{ marginLeft: "10%" }}
                disabled={editingKey !== ""}
                onClick={() => this.sortingModel(record)}
              >
                ADD
              </a>
            </div>
          );
        }
      }
    ];
  }

  isEditing = record => record._id === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: "" });
  };

  onDatepic = (date, dateString) => {
    console.log(date, dateString);
  } 

  onChange = (checked) => {
    console.log(`switch to ${checked}`);
  }

  save(form, key, record) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item._id);
      
      console.log("TCL: EditableTable -> save -> newData", newData)
      console.log("TCL: EditableTable -> save -> index", index)
      
      if (index > -1) {
        const item = newData[index];
        console.log("TCL: EditableTable -> item", item)
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        this.setState({ data: newData, editingKey: "" },()=>{
        const findData = this.state.data.find(item => item._id === key);
        const values ={
          "name" : findData.name,
	        "completed" : findData.completed,
	        "carat" : findData.carat,
	        "price" : findData.price
        }
        this.props.updateRoughData(findData._id,values);
        });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: "" },()=>{
          const findData = this.state.data.find(item => item._id === key);
          const values ={
            "name" : findData.name,
            "completed" : findData.completed,
            "carat" : findData.carat,
            "price" : findData.price
          }
          this.props.updateRoughData(findData._id,values);
          });
      }
    });
  }

  componentDidMount = () => {                                                                                                                                                            
    this.props.loadRoughs();
    console.log("this is a data from the listSorting on  a parent component",this.props.listSorting);
    // this.props.loadSorting();
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps.listRough != this.props.listRough){
      this.setState({
        data:this.props.listRough
      });  
    }
    if(prevProps.listSorting != this.props.listSorting){
      this.setState({
        sortingData:this.props.listSorting
      },()=> {console.log("TCL: EditableTable -> componentDidUpdate -> sortingData", this.state.sortingData)});  
    }
  }

  addrough = (datas) => {
    const data ={
      name:datas.sellername,
      carat:datas.caret,
      price:datas.amount,
    }
    this.props.addRoughs(data);
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  handelSorting = (text,record) => {
    console.log("TCL: EditableTable -> handelSorting -> record", record._id);
    this.props.loadSorting(record._id);
    this.setState({
      drawer: true,
    });
  }

  handelOk = () => {
    this.setState({
      drawer:false
    });
  }

  handelCancel = () => {
    this.setState({
      drawer:false
    });
  } 

  sortingModel = (record) => {
  console.log("TCL: EditableTable -> sortingModel -> record", record)
    this.setState({
      type: "AddSorting",
      sortingCarat:{
        id:record._id,
        caret:record.carat
      }
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
    // const data = this.props.listRough;
    // const arrayMap = data.map(({name,price,rough_total},id)=>{
    //   const data = {
    //       name, 
    //       price,
    //       rough_total,
    //     }     
    //     console.log("this is a pure map data",data);      
    // })
    // console.log("chmu chu mu y nake :->", data)
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
        onCell: record =>{ 
          return({
          record,
          inputType: col.dataIndex === "name" ? "text" : "number",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })}
      };
    });
    
    return (
      <div className="main-content-section">
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
								addRough={this.addrough}
							/>
						) : (
							""
						)}
						{this.state.type === "AddSorting" ? (
							<Models type="Sorting" title="ADD SORTING OF ROUGH" onCancel={this.onCancel} data={this.state.sortingCarat} />
						) : (
							""
						)}
            {this.state.drawer && <RoughListing drawer={this.state.drawer} data={this.state.sortingData} handelOk={this.handelOk} handelCancel={this.handelCancel}/>}
					</div>
					<EditableContext.Provider value={this.props.form}>
						<Table
            className='tableCustomize'
							components={components}
							bordered
							dataSource={this.state.data}
							columns={columns}
							rowClassName="editable-row"
							pagination={{
								onChange: this.cancel
							}}
						/>
					</EditableContext.Provider>
				</div>
			</div>
      </div>
		);
  }
}

const mapStateToProps = state => ({ ...state.Test });

const mapDispatchToProps = dispatch => ({
  loadRoughs:()=>{
    dispatch(listRough());
  },
  addRoughs:(data) =>{
    dispatch(addRough(data));
  },
  loadSorting:(id)=>{
    dispatch(listSorting(id));
  },
  updateRoughData:(id,value) => {
    dispatch(updateRoughData(id,value));
  }
});

const Rough = Form.create()(EditableTable);
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Rough);
