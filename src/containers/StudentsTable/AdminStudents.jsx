import React from "react";
// @material-ui/core components
// core components
import AdminComponent from "../../views/Students/Components/AdminComponent.jsx";

import * as actionCreators from "../../Redux/Actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
class AdminStudents extends React.Component {
  componentDidMount() {
    this.props.Loaded();
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
          <AdminComponent data={data} />
        </div>
      );
    }
  }
}
AdminStudents.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  data: PropTypes.array,
  Loaded: PropTypes.func
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
    Loaded: () => {
      dispatch(actionCreators.adminStudents());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminStudents);
