import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router";
import React from "react";
import PropTypes from "prop-types";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import Delete from "@material-ui/icons/Delete";
import AddAlert from "@material-ui/core/SvgIcon/SvgIcon";
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
class SupervisorTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tl: false
    };
  }
  goToEdit = () => {
    const { history, f_name, l_name, emp_no } = this.props;
    history.push({
      pathname: "/admin/editSupervisorTable",
      state: {
        firstName: f_name,
        lastName: l_name,
        emp_no: emp_no
      }
    });
  };
  refreshPage = () => {
    window.location.reload();
  };
  deleteItem = id => {
    const supervisor_id = parseInt(id);
    this.props.onDelete(supervisor_id);
    if (this.props.status !== "success" && this.props.status === "") {
      alert("FRESH TOKEN REQUIRED FOR DELETE , PLEASE LOGIN AGAIN");
    } else {
      this.refreshPage();
    }
  };
  render() {
    const {
      f_name,
      l_name,
      course,
      classes,
      key,
      count,
      emp_no,
      diploma
    } = this.props;
    return (
      <tbody>
        <tr className={classes.center} key={key}>
          <td>{f_name}</td>
          <td>{l_name}</td>
          <td>{course}</td>
          <td>{diploma}</td>
          <td>{count}</td>
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
              id="tooltip-top-start"
              title="Remove"
              placement="top"
              classes={{ tooltip: classes.tooltip }}
            >
              <IconButton
                aria-label="Close"
                className={classes.tableActionButton}
                style={{ color: "red" }}
                onClick={() =>
                  window.confirm("Are you sure you wish to delete this row?") &&
                  this.deleteItem(emp_no)
                }
              >
                <Delete
                  className={
                    classes.tableActionButtonIcon + " " + classes.close
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
SupervisorTableRow.propTypes = {
  key: PropTypes.string.isRequired,
  course: PropTypes.func,
  f_name: PropTypes.string,
  l_name: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  emp_no: PropTypes.number,
  diploma: PropTypes.func,
  count: PropTypes.number,
  status: PropTypes.string,
  message: PropTypes.string
};
export default withRouter(withStyles(styles)(SupervisorTableRow));
