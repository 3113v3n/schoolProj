import React from "react";
import Projects from "../../views/Forms/Projects/Projects.jsx";
import * as actionCreators from "../../Redux/Actions/";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class projectContainer extends React.Component {
  render() {
    return (
      <div>
        <Projects addProject={this.props.addProject} />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return{
    addProject: projectDetails => {
      dispatch(actionCreators.addProject(projectDetails));
    }
  };
};
projectContainer.propTypes = {
  addProject: PropTypes.func.isRequired
}
export default connect(
  null,
  mapDispatchToProps
)(projectContainer);
