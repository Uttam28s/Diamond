import React, { Component } from 'react';
import Layouts from '../Home/Layout';
import Header from '../Home/Header';
import { connect } from "react-redux";
import { listCarats } from "../../Action/Rough";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
	Form,
	Select,
  Dropdown,
  Icon,
  Badge,
  Menu,
  Button
} from "antd";
import Models from '../../js/model';

const { Option } = Select;

class PacketPartition extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type  : "AddPacket",
		}
	}

	handelCancel = () => {
		this.setState({
			type :'',
		})
	}

	onChange = (value) => {
		console.log(`selected ${value}`);
	}
	
	onBlur = () => {
		console.log('blur');
	}
	
	onFocus = () => {
		console.log('focus');
	}
	
	onSearch = (val) => {
		console.log('search:', val);
	}

	componentDidMount = () => {
		this.props.listCarats();
	}

	componentDidUpdate = (prevProps) => {
		if(prevProps.caretList != this.props.caretList){
			console.log("this is a log from ",this.props.caretList)
		}
	} 
  render() {
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
					 {/* <Select
    				showSearch
    				style={{ width: 200 }}
    				placeholder="Select caret"
    				optionFilterProp="children"
    				onChange={this.onChange}
    				onFocus={this.onFocus}
    				onBlur={this.onBlur}
    				onSearch={this.onSearch}
    				filterOption={(input, option) =>
    				  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    				}
  				>
					{this.props.caretList.map((value,id)=>{
						console.log("this is a log for array values in a option",value);
						return(
						<Option value={value}>{value}</Option>)
					})}
    				{/* <Option value="lucy">Lucy</Option>
    				<Option value="jack">Jack</Option>
    				<Option value="tom">Tom</Option> *
  				</Select> */}
          <Button>ADD Packet</Button>
						</div>
						{this.state.type === "AddPacket" ? <Models type="AddPacket" onCancel = {this.handelCancel}/> : ''}
						{/* <Table
            className='tableCustomize'
							bordered
							dataSource={this.state.data}
							columns={columns}
							rowClassName="editable-row"
							pagination={{
								onChange: this.cancel
							}}
						/> */}
				</div>
			</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({ ...state.Test });

export default connect(
	mapStateToProps,
	{ listCarats }
)(PacketPartition);