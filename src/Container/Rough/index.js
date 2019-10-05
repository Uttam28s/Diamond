import React from "react";
import { connect } from "react-redux";
import RoughListing from "../../components/Rough/index";
// import Quizzes from "../../Components/Quiz/index";
import { loadRough, addRough } from "../../Action/Rough";


const roughContainer = props => {
	return (
		<RoughListing
			{...props}
		/>
	);
};

const mapStateToProps = state => ({
	test: state.Test,
});

const mapDispatchToProps = dispatch => ({
  loadRoughs:()=>{
    dispatch(loadRough());
  },
  addRoughs:(data) =>{
  console.log("TCL: data", data)
    dispatch(addRough(data));
  }
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(roughContainer);
