import React from "react";
import SupervisorEdit from "../../views/Supervisor/Table/EditTable/SupervisorEdit";
import { connect } from "react-redux";
import * as actionCreators from "../../Redux/Actions";
import * as actionTypes from "../../Redux/Actions/action-types";
import PropTypes from "prop-types";
class EditSupervisorsTable extends React.Component {
  render() {
    return (
      <div>
        <SupervisorEdit onSubmit={this.props.onEditProgress} />
      </div>
    );
  }
}
EditSupervisorsTable.propTypes = {
  onEditProgress: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return {
    onEditProgress: data => {
      dispatch(
        actionCreators.editTable(actionTypes.EDIT_SUPERVISOR_TABLE, data)
        // actionCreators.editSupervisors(data)
      );
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EditSupervisorsTable);
