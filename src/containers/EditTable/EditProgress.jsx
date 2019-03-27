import React from "react";
import EditProgressComponent from "../../views/Forms/Progress/EditProgressComponent";
import { connect } from "react-redux";
import * as actionCreators from "../../Redux/Actions";
import PropTypes from "prop-types";
class EditProgress extends React.Component {
  render() {
    const { editProgress, error, message } = this.props;
    return (
      <div>
        <EditProgressComponent
          onEditProgress={editProgress}
          error={error}
          message={message}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.error.error,
    status: state.supervisor.status,
    message: state.supervisor.message
  };
};
const mapDispatchToProps = dispatch => {
  return {
    editProgress: data => dispatch(actionCreators.editProgress(data))
  };
};
EditProgress.propTypes = {
  editProgress: PropTypes.func,
  error: PropTypes.bool,
  message: PropTypes.string
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProgress);
