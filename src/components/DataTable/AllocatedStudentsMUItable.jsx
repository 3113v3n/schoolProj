import React from "react";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AddCircle from "@material-ui/icons/AddCircle";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CheckCircle from "@material-ui/icons/CheckCircle";
import moment from "moment";
import uuid from "uuid";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import AddAlert from "@material-ui/core/SvgIcon/SvgIcon";

const columns = [
  {
    name: "Student Name",
    options: {
      filter: true
    }
  },
  {
    name: "Project Code",
    options: {
      filter: true
    }
  },

  {
    name: "Registration Date",
    options: {
      filter: true
    }
  },

  {
    name: "Due Date",
    options: {
      filter: true
    }
  },
  {
    name: "Add Progress",
    options: {
      filter: false,
      download: false
    }
  },
  {
    name: "Mark Complete",
    options: {
      filter: false,
      download: false
    }
  }
];

const options = {
  //filter: true,
  filterType: "dropdown",
  selectableRows: false,
  responsive: "stacked",
  rowsPerPage: 8
};

class AllocatedStudentsMUItable extends React.Component {
  state = {
    tr: false
  };
  componentWillUnmount() {
    let id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }
  showNotification(place) {
    let x = [];
    x[place] = true;
    this.setState(x);
    this.alertTimeout = setTimeout(
      function() {
        x[place] = false;
        this.setState(x);
      }.bind(this),
      6000
    );
  }
  goToAddProgress = allocation_id => {
    const { history } = this.props;
    history.push({
      pathname: "/admin/progress",
      state: {
        allocation_id: allocation_id
      }
    });
  };
  refreshPage = () => {
    window.location.reload();
  };
  setCompleted = id => {
    const data = {};
    const { markAsCompleted, completed } = this.props;
    data.allocation_id = id;
    data.archive_id = uuid();
    markAsCompleted(data);
    if (completed) {
      this.showNotification("tr");
      this.refreshPage();
    }
  };

  actions = id => {
    const { classes } = this.props;
    return (
      <Tooltip
        id="tooltip-top"
        title="ADD PROGRESS"
        placement="top"
        classes={{ tooltip: classes.tooltip }}
      >
        <IconButton
          aria-label="Edit"
          className={classes.tableActionButton}
          onClick={() => this.goToAddProgress(id)}
        >
          <AddCircle
            className={classes.tableActionButtonIcon + " " + classes.edit}
          />
        </IconButton>
      </Tooltip>
    );
  };
  complete = id => {
    const { classes } = this.props;
    return (
      <Tooltip
        id="tooltip-top"
        title="MARK PROJECT COMPLETE"
        placement="top"
        classes={{ tooltip: classes.tooltip }}
      >
        <IconButton
          aria-label="COMPLETE"
          style={{ color: "green" }}
          className={classes.tableActionButton}
          onClick={() =>
            window.confirm("Mark this Project as Complete?") &&
            this.setCompleted(id)
          }
        >
          <CheckCircle
            className={classes.tableActionButtonIcon + " " + classes.edit}
          />
        </IconButton>
      </Tooltip>
    );
  };
  render() {
    const { data, classes, error, status, message, errorMessage } = this.props;
    const emptySet = [["", "", "No DATA Available", ""]];
    const students =
      !error && data !== null && data !== undefined && status !== "failed"
        ? data.map(item => [
            item.student_name,
            item.project_code,
            moment(item.date_registered).format("Do MMMM YYYY"),
            item.due_date,
            this.actions(item.allocation_id),
            this.complete(item.allocation_id)
          ])
        : emptySet;

    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Students Table</h4>
              <p className={classes.cardCategoryWhite}>students </p>
            </CardHeader>
            <CardBody>
              <MUIDataTable
                data={students}
                columns={columns}
                options={options}
              />
            </CardBody>
            <Snackbar
              place={"tr"}
              color={status !== "failed" && !error ? "success" : "danger"}
              icon={AddAlert}
              message={!error ? message : errorMessage}
              open={this.state.tr}
              closeNotification={() => this.setState({ tr: false })}
              close
            />
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}
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
  },
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
  }
};
AllocatedStudentsMUItable.propTypes = {
  data: PropTypes.array,
  classes: PropTypes.object,
  history: PropTypes.object,
  markAsCompleted: PropTypes.func,
  error: PropTypes.bool,
  status: PropTypes.string,
  errorMessage: PropTypes.string,
  message: PropTypes.string,
  completed: PropTypes.bool
};
export default withRouter(withStyles(styles)(AllocatedStudentsMUItable));
