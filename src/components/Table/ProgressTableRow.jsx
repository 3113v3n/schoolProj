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
class ProgressTableRow extends React.Component {
  goToEdit = () => {
    const { history, Date, documents, comments, marks } = this.props;
    history.push({
      pathname: "/admin/editProgress",
      state: {
        Date: Date,
        documents: documents,
        comments: comments,
        marks: marks
      }
    });
  };
  render() {
    const { Date, documents, comments, marks, classes } = this.props;
    return (
      <tbody>
        <tr className={classes.center}>
          <td>{Date}</td>
          <td>{documents}</td>
          <td>{comments}</td>
          <td>{marks}</td>
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
ProgressTableRow.propTypes = {
  classes: PropTypes.object.isRequired,
  Date: PropTypes.string,
  documents: PropTypes.string,
  comments: PropTypes.string,
  marks: PropTypes.number,
  history: PropTypes.object,
  allocation_id: PropTypes.string
};
export default withRouter(withStyles(styles)(ProgressTableRow));
