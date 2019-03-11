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
        <EditAllocation onSubmit={this.props.onEditProgress} />
      </div>
    );
  }
}
EditAllocations.propTypes = {
  onEditProgress: PropTypes.func

};

const mapDispatchToProps = dispatch => {
  return {
    onEditProgress: data => {
      dispatch(actionCreators.setMyData(actionTypes.EDIT_PROGRESS, data));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EditAllocations);
