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
class AllocationTableRow extends React.Component {
  goToEdit = () => {
    const { history, projectCode, studentName, allocation_id } = this.props;
    history.push({
      pathname: "/admin/editAllocations",
      state: {
        projectCode: projectCode,
        studentName: studentName,
        allocation_id: allocation_id
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
      classes
    } = this.props;
    return (
      <tbody>
        <tr className={classes.center}>
          <td>{studentName}</td>
          <td>{supervisor}</td>
          <td>{projectCode}</td>
          <td>{dateRegistered}</td>
          <td>{dueDate}</td>
          <td className={classes.left}>
            <Tooltip
              id="tooltip-top"
              title="REALLOCATE STUDENT"
              placement="top"
              classes={{ tooltip: classes.tooltip }}
            >
              <IconButton
                aria-label="Edit"
                className={classes.tableActionButton}
                onClick={this.goToEdit}
              >
                <Edit
                  className={classes.tableActionButtonIcon + " " + classes.edit}
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

  history: PropTypes.object,
  allocation_id: PropTypes.string
};
export default withRouter(withStyles(styles)(AllocationTableRow));
