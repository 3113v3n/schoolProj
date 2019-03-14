import React from "react";
import Projects from "../../views/Forms/Projects/Projects.jsx";
import * as actionCreators from "../../Redux/Actions/";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actionTypes from "../../Redux/Actions/action-types";
class projectContainer extends React.Component {
  render() {
    return (
      <div>
        <Projects addProject={this.props.addProject} error={this.props.error} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    error: state.error.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addProject: data => {
      dispatch(actionCreators.setMyData(actionTypes.ADD_PROJECT, data));
    }
  };
};
projectContainer.propTypes = {
  addProject: PropTypes.func.isRequired,
  error: PropTypes.bool
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(projectContainer);
