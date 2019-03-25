import React from "react";
import PropTypes from "prop-types";
// @material-ui/icons

import ProjectsComponent from "../../views/Projects/ProjectsComponent";
import { connect } from "react-redux";
import * as actionCreators from "../../Redux/Actions";
class ProjectsTable extends React.Component {
  componentDidMount() {
    this.props.onRequest();
  }
  render() {
    const { classes } = this.props;
    const { isLoading, data } = this.props;
    if (!isLoading) {
      return <div> Loading...</div>;
    } else {
      return (
        <div>
          <ProjectsComponent classes={classes} data={data} />
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
