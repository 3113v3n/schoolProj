import React from "react";
// @material-ui/core components
// core components
import AdminComponent from "../../views/Students/Components/AdminComponent.jsx";

import * as actionCreators from "../../Redux/Actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actionTypes from "../../Redux/Actions/action-types";
class AdminStudents extends React.Component {
  componentDidMount() {
    this.props.Loaded();
  }

  render() {
    const { isLoading, data, error } = this.props;
    console.log(this.props);
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
          {data.length ? (
            <AdminComponent data={data} onDelete={this.props.onDelete} />
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
AdminStudents.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  data: PropTypes.array,
  Loaded: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};
const mapStateToProps = state => {
  return {
    data: state.admin.students,
    isLoading: state.admin.isLoading,
    error: state.error.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    Loaded: () => {
      dispatch(actionCreators.adminStudents());
    },
    onDelete: data =>
      dispatch(actionCreators.setMyData(actionTypes.DELETE_STUDENT, data))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminStudents);
