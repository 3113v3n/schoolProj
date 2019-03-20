import React from "react";
import EditAllocation from "../../views/Allocation/EditTable/EditAllocation";
import { connect } from "react-redux";
import * as actionCreators from "../../Redux/Actions";
import * as actionTypes from "../../Redux/Actions/action-types";
import PropTypes from "prop-types";
class EditAllocations extends React.Component {
  render() {
    return (
      <div>
        <EditAllocation
          onSubmit={this.props.onEditProgress}
          error={this.props.error}
          status={this.props.status}
        />
      </div>
    );
  }
}
EditAllocations.propTypes = {
  onEditProgress: PropTypes.func,
  error: PropTypes.bool,
  status: PropTypes.string
};
const mapStateToProps = state => {
  return {
    error: state.error.error,
    status: state.admin.status
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onEditProgress: data => {
      dispatch(
        actionCreators.editTable(actionTypes.EDIT_ALLOCATION_TABLE, data)
        // actionCreators.editAllocations(data);
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAllocations);
