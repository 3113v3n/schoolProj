import React from "react";
import PropTypes from "prop-types";
// @material-ui/icons

import AllocationComponent from "../../views/Allocation/AllocationComponent";
import { connect } from "react-redux";
import * as actionCreators from "../../Redux/Actions";
import * as actionTypes from "../../Redux/Actions/action-types";
class allocations extends React.Component {
  componentDidMount() {
    this.props.onRequest();
  }
  render() {
    const { classes } = this.props;
    const { isLoading, data, error, errorMessage } = this.props;
    if (error) {
      return (
        <div>
          Error:
          {errorMessage}
        </div>
      );
    } else if (!isLoading) {
      return <div> Loading...</div>;
    } else {
      return (
        <div>
          {data !== null ? (
            <AllocationComponent
              classes={classes}
              data={data}
              onDelete={this.props.onDelete}
            />
          ) : (
            <div>
              <p> No allocations present</p>
            </div>
          )}
        </div>
      );
    }
  }
}
allocations.propTypes = {
  classes: PropTypes.object,
  isLoading: PropTypes.bool,
  data: PropTypes.array,
  error: PropTypes.bool,
  onRequest: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};
const mapStateToProps = state => {
  return {
    isLoading: state.admin.isLoading,
    error: state.error.error,
    data: state.admin.data,
    errorMessage: state.error.errorMessage
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRequest: () => dispatch(actionCreators.fetchData()),
    onDelete: data => {
      dispatch(actionCreators.setMyData(actionTypes.DELETE_ALLOCATION, data));
      // dispatch(actionCreators.deleteAllocation(data))
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(allocations);
