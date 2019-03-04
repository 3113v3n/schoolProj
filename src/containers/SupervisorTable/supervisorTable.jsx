import React from "react";
// @material-ui/core components
// core components
import SuperTableComponent from "../../views/Supervisor/Table/superTableComponents.jsx";
import * as actionCreators from "../../Redux/Actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
class supervisorTable extends React.Component {
  componentDidMount() {
    this.props.onLoaded();
  }

  render() {
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
          <SuperTableComponent data={data} />
        </div>
      );
    }
  }
}
supervisorTable.propTypes = {
  onLoaded: PropTypes.func,
  isLoading: PropTypes.bool,
  data: PropTypes.array,
  error: PropTypes.bool
};
const mapStateToProps = state => {
  return {
    data: state.admin.data,
    isLoading: state.admin.isLoading,
    error: state.admin.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLoaded: () => {
      dispatch(actionCreators.fetchSupervisors());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(supervisorTable);
