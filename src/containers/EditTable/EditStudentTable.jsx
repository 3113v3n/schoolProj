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
        <EdiStudents onSubmit={this.props.onEditProgress} />
      </div>
    );
  }
}
EditStudentTable.propTypes = {
  onEditProgress: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return {
    onEditProgress: data => {
      dispatch(actionCreators.editTable(actionTypes.EDIT_STUDENT_TABLE, data));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EditStudentTable);
