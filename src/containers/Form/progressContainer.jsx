import React from "react";
import Progress from "../../views/Forms/Progress/Progress.jsx";
import { connect } from "react-redux";

class progressContainer extends React.Component {
  render() {
    return (
      <div>
        <Progress />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(progressContainer);
