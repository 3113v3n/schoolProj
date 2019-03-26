import React from "react";
import Progress from "../../views/Forms/Progress/Progress.jsx";
import { connect } from "react-redux";
import * as actionCreators from "../../Redux/Actions";
import * as actionTypes from "../../Redux/Actions/action-types";
import PropTypes from "prop-types";
class progressContainer extends React.Component {
  componentDidMount() {
    const { fetchMyProgress, location } = this.props;
    const allocation_id = location.state.allocation_id;
    fetchMyProgress(allocation_id);
  }

  render() {
    const { location, onEditProgress, error, status, data } = this.props;
    const allocation_id = location.state.allocation_id;

    return (
      <div>
        <Progress
          onSubmit={onEditProgress}
          error={error}
          status={status}
          data={data}
          allocation_id={allocation_id}
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
  fetchMyProgress: PropTypes.func,
  location: PropTypes.object
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
