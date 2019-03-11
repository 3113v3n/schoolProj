import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
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
class TableRow extends React.Component {
  goToEdit = () => {
    const {
      history,
      dateRegistered,
      projectCode,
      supervisor,
      studentName
    } = this.props;
    history.push({
      pathname: "/admin/progress",
      state: {
        documents: supervisor,
        date: dateRegistered,
        comments: projectCode,
        marks: studentName
      }
    });
  };
  render() {
    const {
      studentName,
      supervisor,
      projectCode,
      dateRegistered,
      classes,
      key
    } = this.props;
    return (
      <tbody>
        <tr className={classes.center} key={key}>
          <td>{studentName}</td>
          <td>{supervisor}</td>
          <td>{projectCode}</td>
          <td>Proposal</td>
          <td>{dateRegistered}</td>
          <td className={classes.left}>
            <Tooltip
              id="tooltip-top"
              title="Edit Task"
              placement="top"
              classes={{ tooltip: classes.tooltip }}
            >
              <IconButton
                aria-label="Edit"
                className={classes.tableActionButton}
              >
                <Edit
                  className={classes.tableActionButtonIcon + " " + classes.edit}
                  onClick={this.goToEdit}
                />
              </IconButton>
            </Tooltip>
          </td>
        </tr>
      </tbody>
    );
  }
}
TableRow.propTypes = {
  studentName: PropTypes.string.isRequired,
  supervisor: PropTypes.string.isRequired,
  projectCode: PropTypes.string.isRequired,
  dateRegistered: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  key: PropTypes.string.isRequired,
  history: PropTypes.object
};
export default withRouter(withStyles(styles)(TableRow));
