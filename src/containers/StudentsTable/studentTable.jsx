import React from "react";
import SupervisorComponent from "../../views/Students/Components/SupervisorComponent.jsx";
import { Redirect } from "react-router-dom";
import * as actionCreators from "../../Redux/Actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class StudentTable extends React.Component {
  state = {
    toEditScreen: false
  };
  goToEdit = () => {
    this.setState({
      toEditScreen: true
    });
  };
  componentDidMount() {
    this.props.fetchData();
  }
  render() {
    if (this.state.toEditScreen === true) {
      return <Redirect to="/admin/progress" />;
    }

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
          <SupervisorComponent data={data} goToEdit={() => this.goToEdit()} />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    data: state.supervisor.myData,
    isLoading: state.supervisor.isLoading,
    error: state.supervisor.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(actionCreators.supervisorStudents())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentTable);

StudentTable.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  data: PropTypes.array,
  fetchData: PropTypes.func.isRequired
};
