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
        <EdiStudents />
      </div>
    );
  }
}
EditStudentTable.propTypes = {
  onEditProgress: PropTypes.func,
  goBack: PropTypes.bool
};
const mapStateToProps = state => {
  return {
    goBack: state.supervisor.goBack
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onEditProgress: data => {
      dispatch(actionCreators.setMyData(actionTypes.EDIT_PROGRESS, data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditStudentTable);
