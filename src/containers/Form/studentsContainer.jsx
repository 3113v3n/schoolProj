import React from "react";
import Students from "../../views/Forms/Students/Students.jsx";
import * as actionCreators from "../../Redux/Actions/";
import { connect } from "react-redux";
import PropTypes from "prop-types";
class studentsContainer extends React.Component {
  componentDidMount() {
    this.props.fetchProjects();
  }

  render() {
    const {
      addStudents,
      projects,
      uploadNewFile,
      error,
      message,
      errorMessage
    } = this.props;
    return (
      <div>
        <Students
          addStudents={addStudents}
          projects={projects}
          uploadNewFile={uploadNewFile}
          error={error}
          errorMessage={errorMessage}
          message={message}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    projects: state.admin.projects,
    error: state.error.error,
    errorMessage: state.error.errorMessage,
    message: state.admin.message
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchProjects: () => {
      dispatch(actionCreators.fetchProjects());
    },
    addStudents: data => {
      dispatch(actionCreators.addStudents(data));
    },
    uploadNewFile: data => {
      dispatch(actionCreators.uploadFile(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(studentsContainer);

studentsContainer.propTypes = {
  addStudents: PropTypes.func.isRequired,
  projects: PropTypes.array,
  fetchProjects: PropTypes.func.isRequired,
  uploadNewFile: PropTypes.func,
  error: PropTypes.bool,
  message: PropTypes.string,
  errorMessage: PropTypes.string
};
