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
          status={this.props.status}
        />
      </div>
    );
  }
}
EditStudentTable.propTypes = {
  onEditProgress: PropTypes.func,
  error: PropTypes.bool,
  status: PropTypes.string
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
    status: state.admin.status
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditStudentTable);
