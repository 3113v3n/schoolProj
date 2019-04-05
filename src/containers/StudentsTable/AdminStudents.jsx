import React from "react";
// @material-ui/core components
import StudentMUItable from "../../components/DataTable/StudentMUItable.jsx";
import * as actionCreators from "../../Redux/Actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
class AdminStudents extends React.Component {
  componentDidMount() {
    this.props.Loaded();
  }

  render() {
    const { isLoading, data } = this.props;
    if (!isLoading) {
      return <div> Loading...</div>;
    } else {
      return (
        <div>
          <StudentMUItable
            data={data}
            onDelete={this.props.onDelete}
            status={this.props.status}
          />
        </div>
      );
    }
  }
}
AdminStudents.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.array,
  Loaded: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  status: PropTypes.string
};
const mapStateToProps = state => {
  return {
    data: state.admin.students,
    status: state.admin.status,
    isLoading: state.admin.isLoading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    Loaded: () => {
      dispatch(actionCreators.adminStudents());
    },
    onDelete: data => {
      dispatch(actionCreators.deleteStudents(data));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminStudents);
