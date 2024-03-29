import React from "react";
import EdiStudents from "../../views/Students/EditTable/EditStudents";
import { connect } from "react-redux";
import * as actionCreators from "../../Redux/Actions";
import PropTypes from "prop-types";
class EditStudentTable extends React.Component {
  componentDidMount() {
    this.props.fetchProjects();
  }

  render() {
    return (
      <div>
        <EdiStudents
          onSubmit={this.props.onEditProgress}
          error={this.props.error}
          errorMessage={this.props.errorMessage}
          message={this.props.message}
          projects={this.props.projects}
          status={this.props.status}
        />
      </div>
    );
  }
}
EditStudentTable.propTypes = {
  onEditProgress: PropTypes.func,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  message: PropTypes.string,
  projects: PropTypes.array,
  fetchProjects: PropTypes.func.isRequired,
  status: PropTypes.string
};

const mapDispatchToProps = dispatch => {
  return {
    onEditProgress: data => {
      dispatch(actionCreators.editStudents(data));
    },
    fetchProjects: () => {
      dispatch(actionCreators.fetchProjects());
    }
  };
};
const mapStateToProps = state => {
  return {
    error: state.error.error,
    errorMessage: state.error.errorMessage,
    projects: state.admin.projects,
    message: state.edit.message,
    status: state.edit.status
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditStudentTable);
