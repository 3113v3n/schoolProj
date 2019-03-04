import React from "react";
import PropTypes from "prop-types";
// @material-ui/icons

import AllocationComponent from "../../views/Allocation/AllocationComponent";
import { connect } from "react-redux";
import * as actionCreators from "../../Redux/Actions";

class allocations extends React.Component {
  componentDidMount() {
    this.props.onRequest();
  }

  render() {
    const { classes } = this.props;
    const { isLoading, data, error } = this.props;
    if (error) {
      return (
        <div>
          Error:
          {error.message}
        </div>
      );
    } else if (!isLoading) {
      return <div> Loading...</div>;
    } else {
      return (
        <div>
          <AllocationComponent classes={classes} data={data} />
        </div>
      );
    }
  }
}
allocations.propTypes = {
  classes: PropTypes.object
};
const mapStateToProps = state => {
  return {
    isLoading: state.admin.isLoading,
    error: state.admin.error,
    data: state.admin.data
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRequest: () => dispatch(actionCreators.fetchData())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(allocations);
