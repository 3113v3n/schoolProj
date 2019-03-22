import React from "react";
import Projects from "../../views/Forms/Projects/Projects.jsx";
import * as actionCreators from "../../Redux/Actions/";
import { connect } from "react-redux";
import PropTypes from "prop-types";
class projectContainer extends React.Component {
  render() {
    return (
      <div>
        <Projects
          addProject={this.props.addProject}
          error={this.props.error}
          errorMessage={this.props.errorMessage}
          message={this.props.message}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    error: state.error.error,
    errorMessage: state.error.errorMessage,
    message: state.admin.message
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addProject: data => dispatch(actionCreators.addProject(data))
  };
};
projectContainer.propTypes = {
  addProject: PropTypes.func.isRequired,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  message: PropTypes.string
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(projectContainer);
