import React from "react";
import Students from "../../views/Forms/Students/Students.jsx";
import * as actionCreators from "../../Redux/Actions/";
import { connect } from "react-redux";
import PropTypes from "prop-types";
class studentsContainer extends React.Component {
  render() {
    return (
      <div>
        <Students addStudents={this.props.addStudents} />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addStudents: studentDetails => {
      dispatch(actionCreators.addStudents(studentDetails));
    }
  };
};
export default connect(
  null,
  mapDispatchToProps
)(studentsContainer);

studentsContainer.propTypes = {
  addStudents: PropTypes.func.isRequired
};
