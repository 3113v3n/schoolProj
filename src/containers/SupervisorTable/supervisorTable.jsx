import React from "react";
// @material-ui/core components
// core components
import SuperTableComponent from "../../views/Supervisor/Table/superTableComponents.jsx";
import * as actionCreators from "../../Redux/Actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
class supervisorTable extends React.Component {
  componentDidMount() {
    const { onLoaded } = this.props;
    onLoaded();
  }

  render() {
    const { isLoading, data, onDelete, status } = this.props;
    if (!isLoading) {
      return <div> Loading...</div>;
    } else {
      return (
        <div>
          <SuperTableComponent
            data={data}
            onDelete={onDelete}
            status={status}
          />
        </div>
      );
    }
  }
}
supervisorTable.propTypes = {
  onLoaded: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  data: PropTypes.array,
  status: PropTypes.string,
  message: PropTypes.string
};
const mapStateToProps = state => {
  return {
    data: state.admin.supervisors,
    isLoading: state.admin.isLoading,
    user: state.user.user,
    status: state.admin.status,
    message: state.admin.message
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
