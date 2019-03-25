import React from "react";
// @material-ui/core components
// core components
import SuperTableComponent from "../../views/Supervisor/Table/superTableComponents.jsx";
import * as actionCreators from "../../Redux/Actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
class supervisorTable extends React.Component {
  componentDidMount() {
    this.props.onLoaded();
  }

  render() {
    const { isLoading, data, onDelete } = this.props;
    if (!isLoading) {
      return <div> Loading...</div>;
    } else {
      return (
        <div>
          <SuperTableComponent data={data} onDelete={onDelete} />
        </div>
      );
    }
  }
}
supervisorTable.propTypes = {
  onLoaded: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  data: PropTypes.array

};
const mapStateToProps = state => {
  return {
    data: state.admin.supervisors,
    isLoading: state.admin.isLoading,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLoaded: () => {
      dispatch(actionCreators.fetchSupervisors());
    },
    onDelete: data => {
      dispatch(actionCreators.deleteSupervisors(data));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(supervisorTable);
