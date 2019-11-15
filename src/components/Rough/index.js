import React, { Component } from "react";
import Rough from './Rough';
import { connect } from "react-redux";
// import RoughListing from "../../components/Rough/index";
// import Quizzes from "../../Components/Quiz/index";
import { listRough, addRough } from "../../Action/Rough";

class RoughListing extends Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	editId: "",
		// 	questionId: "",
		// 	sectionId: "",
		// 	isLoading: false,
		// 	data: {},
		// 	visibleForm: false, 
		// 	editable: false,
		// 	visibleCandidate: false
		// };
		this.addrough = this.addrough.bind(this);
	}

  addrough = (data) => {
	this.props.addRoughs(data);
}

componentDidMount = () => {
	this.props.loadRoughs();
}

	render() {
		const data = this.props.listRough;
		console.log("this :->",this.props);
		console.log("this is a data from the reducer",data)
		return (
			<div className="main-content-section">
      <Rough addrough={this.addrough}/>
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
  }
});
// export default RoughListing;
export default connect(mapStateToProps,mapDispatchToProps)(RoughListing);
