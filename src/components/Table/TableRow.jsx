import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import CheckCircle from "@material-ui/icons/CheckCircle";
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
    const { history } = this.props;
    history.push({
      pathname: "/admin/progress",
      state: {
        documents: "",
        date: "",
        comments: "",
        marks: ""
      }
    });
  };
  render() {
    const {
      studentName,
      projectCode,
      dateRegistered,
      classes,
      dueDate,
      key
    } = this.props;
    return (
      <tbody>
        <tr className={classes.center} key={key}>
          <td>{studentName}</td>
          <td>{projectCode}</td>
          <td>{dateRegistered}</td>
          <td>{dueDate}</td>
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
            <Tooltip
              id="tooltip-top"
              title="Mark Project Complete"
              placement="top"
              classes={{ tooltip: classes.tooltip }}
            >
              <IconButton
                aria-label="Edit"
                className={classes.tableActionButton}
              >
                <CheckCircle
                  className={classes.tableActionButtonIcon + " " + classes.edit}
                  onClick={() =>
                    window.confirm("Mark this Project as Complete?")
                  }
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
  history: PropTypes.object,
  dueDate: PropTypes.string
};
export default withRouter(withStyles(styles)(TableRow));
