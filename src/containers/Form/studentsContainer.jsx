import React from "react";
import Students from "../../views/Forms/Students/Students.jsx";
import * as actionCreators from "../../Redux/Actions/";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actionTypes from "../../Redux/Actions/action-types";
class studentsContainer extends React.Component {
  componentDidMount() {
    this.props.fetchProjects();
  }

  render() {
    const { addStudents, projects, uploadNewFile, error, status } = this.props;
    return (
      <div>
        <Students
          addStudents={addStudents}
          projects={projects}
          uploadNewFile={uploadNewFile}
          status={status}
          error={error}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return{
    projects: state.admin.projects,
    error: state.error.error,
    status: state.admin.status
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchProjects: () => {
      dispatch(actionCreators.fetchProjects());
    },
    addStudents: data => {
      // dispatch(actionCreators.setMyData(actionTypes.ADD_STUDENTS, data));
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
  status: PropTypes.string
};
