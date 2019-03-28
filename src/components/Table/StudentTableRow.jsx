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
class StudentTableRow extends React.Component {
  goToEdit = () => {
    const { history, projectCode, name, admNo } = this.props;
    history.push({
      pathname: "/admin/editStudentTable",
      state: {
        name: name,
        admNo: admNo,
        projectCode: projectCode
      }
    });
  };
  refreshPage = () => {
    window.location.reload();
  };
  deleteRow = id => {
    let student_adm = parseInt(id);
    this.props.onDelete(student_adm);
    this.refreshPage();
  };
  render() {
    const { admNo, name, projectCode, classes, key } = this.props;
    return (
      <tbody>
        <tr className={classes.center} key={key}>
          <td>{admNo}</td>
          <td>{name}</td>
          <td>{projectCode}</td>
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
              title="Edit Task"
              placement="top"
              classes={{ tooltip: classes.tooltip }}
            >
              <IconButton
                aria-label="Edit"
                className={classes.tableActionButton}
              >
                <Delete
                  className={classes.tableActionButtonIcon + " " + classes.edit}
                  onClick={() =>
                    window.confirm(
                      "Are you sure you wish to delete Student row?"
                    ) && this.deleteRow(admNo)
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
StudentTableRow.propTypes = {
  name: PropTypes.string.isRequired,
  admNo: PropTypes.string.isRequired,
  projectCode: PropTypes.string.isRequired,
  dateRegistered: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  key: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  onDelete: PropTypes.func
};
export default withRouter(withStyles(styles)(StudentTableRow));
