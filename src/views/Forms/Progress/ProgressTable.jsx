import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import PropTypes from "prop-types";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import moment from "moment";
////////////////////////////
import ProgressTableRow from "components/Table/ProgressTableRow";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import GetApp from "@material-ui/icons/GetApp";
import { connect } from "react-redux";
import { withRouter } from "react-router";
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  tableUpgradeWrapper: {
    display: "block",
    width: "100%",
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
    MsOverflowStyle: "-ms-autohiding-scrollbar"
  },
  table: {
    width: "100%",
    maxWidth: "100%",
    marginBottom: "1rem",
    backgroundColor: "transparent",
    borderCollapse: "collapse",
    display: "table",
    borderSpacing: "2px",
    borderColor: "grey",
    "& thdead tr th": {
      fontSize: "1.063rem",
      padding: "12px 8px",
      verticalAlign: "middle",
      fontWeight: "300",
      borderTopWidth: "0",
      borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
      textAlign: "inherit"
    },
    "& tbody tr td": {
      padding: "12px 8px",
      verticalAlign: "middle",
      borderTop: "1px solid rgba(0, 0, 0, 0.06)"
    },
    "& td, & th": {
      display: "table-cell"
    }
  },
  center: {
    textAlign: "center"
  },
  left: {
    flexDirection: "row"
  }
};
class ProgressTable extends React.Component {
  formatDate = date => {
    return moment(date).format("Do MMMM YYYY");
  };
  render() {
    const { classes, downloadTable, data } = this.props;
    return (
      <div>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Student Progress Table</h4>
          </CardHeader>
          <CardBody>
            <Tooltip
              id="tooltip-top"
              title="Export file"
              placement="right-end"
              classes={{ tooltip: classes.tooltip }}
            >
              <IconButton
                aria-label="Export"
                className={classes.tableActionButton}
              >
                <GetApp onClick={downloadTable} />
              </IconButton>
            </Tooltip>
            <table className={classes.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Documents</th>
                  <th>Comments</th>
                  <th>Marks</th>
                  <th>Action</th>
                </tr>
              </thead>
              {data !== undefined &&
              data !== null &&
              data.status !== "failed" ? (
                data.map(item => (
                  <ProgressTableRow
                    Date={this.formatDate(item.date)}
                    documents={item.document}
                    comments={item.comments}
                    marks={item.marks}
                    progress_id={item.progress_id}
                    allocation_id={item.allocation_id}
                    key={item.progress_id}
                  />
                ))
              ) : (
                <tr className={classes.center}>
                  <td />
                  <td>No Progress Made</td>
                  <td />
                  <td />
                </tr>
              )}
            </table>
          </CardBody>
        </Card>
      </div>
    );
  }
}
ProgressTable.propTypes = {
  classes: PropTypes.object,
  downloadTable: PropTypes.func,
  data: PropTypes.array
};

export default withRouter(connect()(withStyles(styles)(ProgressTable)));
