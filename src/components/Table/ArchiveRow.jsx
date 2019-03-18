import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router";
import React from "react";
import PropTypes from "prop-types";

const styles = {
  center: {
    textAlign: "center"
  },
  tableUpgradeWrapper: {
    display: "block",
    width: "100%",
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
    MsOverflowStyle: "-ms-autohiding-scrollbar"
  }
};
class ArchiveTableRow extends React.Component {

  render() {
    const {
      adm,
      studentName,
      supervisor,
      projectCode,
      dateRegistered,
      classes,
      finishDate,
      key
    } = this.props;
    return (
      <tbody>
        <tr className={classes.center} key={key}>
          <td>{adm}</td>
          <td>{studentName}</td>
          <td>{supervisor}</td>
          <td>{projectCode}</td>
          <td>{dateRegistered}</td>
          <td>{finishDate}</td>
        </tr>
      </tbody>
    );
  }
}
ArchiveTableRow.propTypes = {
  adm: PropTypes.string,
  studentName: PropTypes.string.isRequired,
  supervisor: PropTypes.string.isRequired,
  projectCode: PropTypes.string.isRequired,
  dateRegistered: PropTypes.string,
  finishDate: PropTypes.string,
  classes: PropTypes.object.isRequired,
  key: PropTypes.string.isRequired,
};
export default withRouter(withStyles(styles)(ArchiveTableRow));
