import React from "react";
import EdiStudents from "../../views/Students/EditTable/EditStudents";
import { connect } from "react-redux";
import * as actionCreators from "../../Redux/Actions";
import * as actionTypes from "../../Redux/Actions/action-types";
import PropTypes from "prop-types";
class EditStudentTable extends React.Component {
  render() {
    return (
      <div>
        <EdiStudents
          onSubmit={this.props.onEditProgress}
          error={this.props.error}
          errorMessage={this.props.errorMessage}
          message={this.props.message}
        />
      </div>
    );
  }
}
EditStudentTable.propTypes = {
  onEditProgress: PropTypes.func,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  message: PropTypes.string

};

const mapDispatchToProps = dispatch => {
  return {
    onEditProgress: data => {
      dispatch(actionCreators.editTable(actionTypes.EDIT_STUDENT_TABLE, data));
      // dispatch(actionCreators.editStudents(data))
    }
  };
};
const mapStateToProps = state => {
  return {
    error: state.error.error,
    errorMessage: state.error.errorMessage,
    message: state.admin.message
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditStudentTable);
