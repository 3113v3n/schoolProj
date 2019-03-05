import React from "react";
import Progress from "../../views/Forms/Progress/Progress.jsx";
import { connect } from "react-redux";
import * as actionCreators from "../../Redux/Actions";
import PropTypes from "prop-types";
class progressContainer extends React.Component {
  render() {
    return (
      <div>
        <Progress
          onSubmit={this.props.onEditProgress}
          goBack={this.props.goBack}
        />
      </div>
    );
  }
}
progressContainer.propTypes = {
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
    onEditProgress: progressDetails => {
      dispatch(actionCreators.progressReport(progressDetails));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(progressContainer);
