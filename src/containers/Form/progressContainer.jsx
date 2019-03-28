import React from "react";
import Progress from "../../views/Forms/Progress/Progress.jsx";
import { connect } from "react-redux";
import * as actionCreators from "../../Redux/Actions";
import PropTypes from "prop-types";
class progressContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allocation: this.props.location.state.allocation_id
    };
  }
  componentDidMount() {
    const { fetchMyProgress } = this.props;
    const { allocation } = this.state;
    fetchMyProgress(allocation);
  }

  render() {
    const {
      addProgress,
      error,
      status,
      data,
      message,
      errorMessage
    } = this.props;
    const { allocation_id } = this.state;
    return (
      <div>
        <Progress
          onSubmit={addProgress}
          error={error}
          status={status}
          data={data}
          allocation_id={allocation_id}
          message={message}
          errorMessage={errorMessage}
        />
      </div>
    );
  }
}
progressContainer.propTypes = {
  addProgress: PropTypes.func,
  error: PropTypes.bool,
  status: PropTypes.string,
  data: PropTypes.array,
  fetchMyProgress: PropTypes.func,
  location: PropTypes.object,
  message: PropTypes.string,
  errorMessage: PropTypes.string
};
const mapStateToProps = state => {
  return {
    error: state.error.error,
    status: state.supervisor.status,
    data: state.supervisor.Progress, //TODO: issue here and sort out onrefresh student table
    message: state.supervisor.message,
    errorMessage: state.error.errorMessage
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addProgress: data => {
      dispatch(actionCreators.addProgress(data));
    },
    fetchMyProgress: data => {
      dispatch(actionCreators.fetchProgress(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(progressContainer);
