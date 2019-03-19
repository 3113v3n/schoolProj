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
    const { addStudents, projects, uploadNewFile } = this.props;
    return (
      <div>
        <Students
          addStudents={addStudents}
          projects={projects}
          uploadNewFile={uploadNewFile}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return{
    projects: state.admin.projects
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchProjects: data => {
      dispatch(actionCreators.fetchProjects(data));
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
  uploadNewFile: PropTypes.func
};
