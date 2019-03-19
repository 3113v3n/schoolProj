import React from "react";
import { connect } from "react-redux";
import AdminNavbarLinks from "../../components/Navbars/AdminNavbarLinks";
import * as actionCreators from "../../Redux/Actions";
import PropTypes from "prop-types";

class AdminNavBar extends React.Component {
  render() {
    return (
      <div>
        <AdminNavbarLinks onLogout={this.props.onLogout} />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => {
      dispatch(actionCreators.logMeout());
    }
  };
};

AdminNavBar.propTypes = {
  onLogout: PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(AdminNavBar);
