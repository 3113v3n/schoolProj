import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router";
import React from "react";
import PropTypes from "prop-types";
import Delete from "@material-ui/icons/Delete";
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
  goToEdit = () => {
    const { history, name, email, degree, diploma } = this.props;
    history.push({
      pathname: "/admin/editSupervisorTable",
      state: {
        supervisor: name,
        email: email,
        degree: degree,
        diploma: diploma
      }
    });
  };
  render() {
    const { name, email, degree, diploma, classes, key, onDelete } = this.props;
    return (
      <tbody>
        <tr className={classes.center} key={key}>
          <td>{name}</td>
          <td>{email}</td>
          <td>{degree}</td>
          <td>{diploma}</td>
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
              >
                <Delete
                  className={
                    classes.tableActionButtonIcon + " " + classes.close
                  }
                  onClick={key =>
                    window.confirm(
                      "Are you sure you wish to delete this row?"
                    ) && onDelete(key)
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
  name: PropTypes.string,
  email: PropTypes.string,
  degree: PropTypes.string,
  diploma: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};
export default withRouter(withStyles(styles)(SupervisorTableRow));
