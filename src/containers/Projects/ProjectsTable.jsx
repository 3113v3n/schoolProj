import React from "react";
import PropTypes from "prop-types";
// @material-ui/icons
import ProjectMUItable from "../../components/DataTable/ProjectMUItable";
import { connect } from "react-redux";
import * as actionCreators from "../../Redux/Actions";
class ProjectsTable extends React.Component {
  componentDidMount() {
    this.props.onRequest();
  }
  render() {
    const { isLoading, data, error } = this.props;
    if (!isLoading) {
      return <div> Loading...</div>;
    } else {
      return (
        <div>
          <ProjectMUItable data={data} error={error} />
        </div>
      );
    }
  }
}
ProjectsTable.propTypes = {
  classes: PropTypes.object,
  isLoading: PropTypes.bool,
  data: PropTypes.array,
  error: PropTypes.bool,
  onRequest: PropTypes.func.isRequired
};
const mapStateToProps = state => {
  return {
    isLoading: state.admin.isLoading,
    error: state.error.error,
    data: state.admin.projects
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRequest: () => dispatch(actionCreators.fetchProjects())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsTable);
