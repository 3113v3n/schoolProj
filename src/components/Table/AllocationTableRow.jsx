import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
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
class AllocationTableRow extends React.Component {
  goToEdit = () => {
    const { history, projectCode, supervisor, studentName } = this.props;
    history.push({
      pathname: "/admin/editAllocations",
      state: {
        supervisor: supervisor,
        projectCode: projectCode,
        studentName: studentName
      }
    });
  };
  render() {
    const {
      studentName,
      supervisor,
      projectCode,
      dateRegistered,
      dueDate,
      classes,
      key
    } = this.props;
    return (
      <tbody>
        <tr className={classes.center} key={key}>
          <td>{studentName}</td>
          <td>{supervisor}</td>
          <td>{projectCode}</td>
          <td>{dateRegistered}</td>
          <td>{dueDate}</td>
          <td className={classes.left}>
            <Tooltip
              id="tooltip-top"
              title="Edit Row"
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
            <Tooltip
              id="tooltip-top-start"
              title="Delete Row"
              placement="top"
              classes={{ tooltip: classes.tooltip }}
            >
              <IconButton
                aria-label="Close"
                className={classes.tableActionButton}
              >
                <Delete
                  className={
                    classes.tableActionButtonIcon + " " + classes.close
                  }
                  onClick={() => {
                    window.confirm(
                      "Are you sure you wish to delete this row?"
                    ) && this.props.onDelete(studentName);
                  }}
                />
              </IconButton>
            </Tooltip>
          </td>
        </tr>
      </tbody>
    );
  }
}
AllocationTableRow.propTypes = {
  studentName: PropTypes.string.isRequired,
  supervisor: PropTypes.string.isRequired,
  projectCode: PropTypes.string.isRequired,
  dateRegistered: PropTypes.string.isRequired,
  dueDate: PropTypes.string,
  classes: PropTypes.object.isRequired,
  key: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  history: PropTypes.object
};
export default withRouter(withStyles(styles)(AllocationTableRow));
