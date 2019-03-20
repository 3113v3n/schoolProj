import React from "react";
import Progress from "../../views/Forms/Progress/Progress.jsx";
import { connect } from "react-redux";
import * as actionCreators from "../../Redux/Actions";
import * as actionTypes from "../../Redux/Actions/action-types";
import PropTypes from "prop-types";
class progressContainer extends React.Component {
  render() {
    return (
      <div>
        <Progress
          onSubmit={this.props.onEditProgress}
          goBack={this.props.goBack}
          error={this.props.error}
          status={this.props.status}
        />
      </div>
    );
  }
}
progressContainer.propTypes = {
  onEditProgress: PropTypes.func,
  goBack: PropTypes.bool,
  error: PropTypes.bool,
  status: PropTypes.string
};
const mapStateToProps = state => {
  return {
    goBack: state.supervisor.goBack,
    error: state.error.error,
    status: state.supervisor.status
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onEditProgress: data => {
      dispatch(actionCreators.setMyData(actionTypes.EDIT_PROGRESS, data));
      // dispatch(actionCreators.editProgress(data))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(progressContainer);
