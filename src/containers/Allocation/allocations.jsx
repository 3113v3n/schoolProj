import React from "react";
import PropTypes from "prop-types";
// @material-ui/icons
import AllocationMUItable from "../../components/DataTable/AllocationMUItable";
import { connect } from "react-redux";
import * as actionCreators from "../../Redux/Actions";
class allocations extends React.Component {
  componentDidMount() {
    this.props.onRequest();
  }
  render() {
    const { classes } = this.props;
    const { isLoading, message, data } = this.props;
    if (!isLoading) {
      return <div> Loading...</div>;
    } else {
      return (
        <div>
          <AllocationMUItable classes={classes} data={data} message={message} />
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
  message: PropTypes.string
};
const mapStateToProps = state => {
  return {
    isLoading: state.admin.isLoading,
    error: state.error.error,
    data: state.admin.data,
    message: state.admin.message
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
