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
class ProjectTableRow extends React.Component {
  goToEdit = () => {
    const { history, projectCode } = this.props;
    history.push({
      pathname: "/admin/editProjects",
      state: {
        code: projectCode
      }
    });
  };
  render() {
    const {
      classes,
      projectCode,
      trimesters,
      degree,
      diploma,
      key
    } = this.props;
    return (
      <tbody>
        <tr className={classes.center} key={key}>
          <td>{projectCode}</td>
          <td>{trimesters}</td>
          <td>{degree}</td>
          <td>{diploma}</td>

          <td className={classes.left}>
            <Tooltip
              id="tooltip-top"
              title="EDIT PROJECT"
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
ProjectTableRow.propTypes = {
  classes: PropTypes.object.isRequired,
  key: PropTypes.string.isRequired,
  history: PropTypes.object,
  projectCode: PropTypes.string,
  trimesters: PropTypes.number
};
export default withRouter(withStyles(styles)(ProjectTableRow));
