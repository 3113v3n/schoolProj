import React from "react";
import SupervisorEdit from "../../views/Supervisor/Table/EditTable/SupervisorEdit";
import { connect } from "react-redux";
import * as actionCreators from "../../Redux/Actions";
import PropTypes from "prop-types";
class EditSupervisorsTable extends React.Component {
  render() {
    return (
      <div>
        <SupervisorEdit
          onSubmit={this.props.onEditProgress}
          error={this.props.error}
          status={this.props.status}
          message={this.props.message}
        />
      </div>
    );
  }
}
EditSupervisorsTable.propTypes = {
  onEditProgress: PropTypes.func,
  error: PropTypes.bool,
  status: PropTypes.string,
  message: PropTypes.string
};

const mapDispatchToProps = dispatch => {
  return {
    onEditProgress: data => {
      dispatch(actionCreators.editSupervisors(data));
    }
  };
};
const mapStateToProps = state => {
  return {
    error: state.error.error,
    status: state.edit.status,
    message: state.edit.message
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSupervisorsTable);
