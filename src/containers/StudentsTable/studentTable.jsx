import React from "react";
import SupervisorComponent from "../../views/Students/Components/SupervisorComponent.jsx";
import * as actionCreators from "../../Redux/Actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class StudentTable extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }
  render() {
    const { isLoading, data } = this.props;
    if (!isLoading) {
      return <div> Loading...</div>;
    } else {
      return (
        <div>
          <SupervisorComponent data={data} />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    data: state.supervisor.myData,
    isLoading: state.supervisor.isLoading,
    error: state.error.error
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
