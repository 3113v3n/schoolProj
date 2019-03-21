import React from "react";
// @material-ui/core components
// core components
import SuperTableComponent from "../../views/Supervisor/Table/superTableComponents.jsx";
import * as actionCreators from "../../Redux/Actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actionTypes from "../../Redux/Actions/action-types";
class supervisorTable extends React.Component {
  componentDidMount() {
    this.props.onLoaded();
  }

  render() {
    const { isLoading, data, error, onDelete } = this.props;
    if (error) {
      return (
        <div>
          Error:
          {error}
        </div>
      );
    } else if (!isLoading) {
      return <div> Loading...</div>;
    } else {
      return (
        <div>
          {data !== null ? (
            <SuperTableComponent data={data} onDelete={onDelete} />
          ) : (
            <div>
              <p>No registered supervisor yet</p>
            </div>
          )}
        </div>
      );
    }
  }
}
supervisorTable.propTypes = {
  onLoaded: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  data: PropTypes.array,
  error: PropTypes.bool
};
const mapStateToProps = state => {
  return {
    data: state.admin.supervisors,
    isLoading: state.admin.isLoading,
    error: state.error.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLoaded: () => {
      dispatch(actionCreators.fetchSupervisors());
    },
    onDelete: data => {
      dispatch(actionCreators.setMyData(actionTypes.DELETE_SUPERVISOR, data));
      // dispatch(actionCreators.deleteSupervisors(data))
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(supervisorTable);
