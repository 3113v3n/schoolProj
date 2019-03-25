import React from "react";
import Progress from "../../views/Forms/Progress/Progress.jsx";
import { connect } from "react-redux";
import * as actionCreators from "../../Redux/Actions";
import * as actionTypes from "../../Redux/Actions/action-types";
import PropTypes from "prop-types";
class progressContainer extends React.Component {
  componentDidMount() {
    this.props.fetchMyProgress();
  }

  render() {
    return (
      <div>
        <Progress
          onSubmit={this.props.onEditProgress}
          goBack={this.props.goBack}
          error={this.props.error}
          status={this.props.status}
          data={this.props.data}
        />
      </div>
    );
  }
}
progressContainer.propTypes = {
  onEditProgress: PropTypes.func,
  goBack: PropTypes.bool,
  error: PropTypes.bool,
  status: PropTypes.string,
  data: PropTypes.object,
  fetchMyProgress: PropTypes.func
};
const mapStateToProps = state => {
  return {
    goBack: state.supervisor.goBack,
    error: state.error.error,
    status: state.supervisor.status,
    data: state.supervisor.myData
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onEditProgress: data => {
      dispatch(actionCreators.setMyData(actionTypes.EDIT_PROGRESS, data));
    },
    fetchMyProgress: () => {
      dispatch(actionCreators.fetchProgress());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(progressContainer);
