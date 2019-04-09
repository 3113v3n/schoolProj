import React from "react";
import EditProjectTable from "../../views/Projects/EditProject/EditProjectTable";
import { connect } from "react-redux";
import * as actionCreators from "../../Redux/Actions";
import PropTypes from "prop-types";
class EditAllocations extends React.Component {
  render() {
    return (
      <div>
        <EditProjectTable
          onSubmit={this.props.onEditProgress}
          error={this.props.error}
          status={this.props.status}
          errorMessage={this.props.errorMessage}
          message={this.props.message}
        />
      </div>
    );
  }
}
EditAllocations.propTypes = {
  onEditProgress: PropTypes.func,
  SupervisorsFetch: PropTypes.func,
  error: PropTypes.bool,
  status: PropTypes.string,
  errorMessage: PropTypes.string,
  message: PropTypes.string
};
const mapStateToProps = state => {
  return {
    error: state.error.error,
    status: state.edit.status,
    errorMessage: state.error.errorMessage,
    message: state.edit.message
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onEditProgress: data => {
      dispatch(actionCreators.editProjects(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAllocations);
