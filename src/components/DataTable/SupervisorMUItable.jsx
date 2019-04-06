import React from "react";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { NavLink } from "react-router-dom";
import Button from "components/CustomButtons/Button.jsx";
import Delete from "@material-ui/icons/Delete";
import Done from "@material-ui/icons/Done";
const columns = [
  {
    name: "First Name",
    options: {
      filter: true
    }
  },
  {
    name: "Last Name",
    options: {
      filter: true
    }
  },
  {
    name: "Degree",
    options: {
      filter: false,
      download: false
    }
  },
  {
    name: "Diploma",
    options: {
      filter: false,
      download: false
    }
  },
  {
    name: "Allocation Count",
    options: {
      filter: true
    }
  },
  {
    name: "Edit",
    options: {
      filter: false,
      download: false
    }
  },
  {
    name: "Delete",
    options: {
      filter: false,
      download: false
    }
  }
];

const options = {
  filter: true,
  filterType: "dropdown",
  selectableRows: false,
  responsive: "stacked",
  rowsPerPage: 8
};

class SupervisorMUItable extends React.Component {
  goToEdit = (f_name, l_name, supervisorId) => {
    const { history } = this.props;
    history.push({
      pathname: "/admin/editSupervisorTable",
      state: {
        firstName: f_name,
        lastName: l_name,
        emp_no: supervisorId
      }
    });
  };
  refreshPage = () => {
    window.location.reload();
  };
  deleteRow = id => {
    let supervisor_id = parseInt(id);
    this.props.onDelete(supervisor_id);
    if (this.props.status !== "success" && this.props.status === "") {
      alert("FRESH TOKEN REQUIRED FOR DELETE , PLEASE LOGIN AGAIN");
      this.refreshPage();
    } else {
      this.refreshPage();
    }
  };
  actions = (code, name, id) => {
    const { classes } = this.props;
    return (
      <Tooltip
        id="tooltip-top"
        title="REALLOCATE STUDENT"
        placement="top"
        classes={{ tooltip: classes.tooltip }}
      >
        <IconButton
          aria-label="Edit"
          className={classes.tableActionButton}
          onClick={() => this.goToEdit(code, name, id)}
        >
          <Edit
            className={classes.tableActionButtonIcon + " " + classes.edit}
          />
        </IconButton>
      </Tooltip>
    );
  };
  delete = id => {
    const { classes } = this.props;
    return (
      <Tooltip
        id="tooltip-top"
        title="DELETE STUDENT"
        placement="top"
        classes={{ tooltip: classes.tooltip }}
      >
        <IconButton
          aria-label="DELETE"
          style={{ color: "red" }}
          className={classes.tableActionButton}
          onClick={() =>
            window.confirm("Are you sure you wish to delete Student row?") &&
            this.deleteRow(id)
          }
        >
          <Delete
            className={classes.tableActionButtonIcon + " " + classes.edit}
          />
        </IconButton>
      </Tooltip>
    );
  };
  course = val => {
    if (val === true) {
      const { classes } = this.props;
      return (
        <Tooltip
          id="tooltip-top"
          title="Diploma"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton
            aria-label="Edit"
            className={classes.tableActionButton}
            style={{ color: "green" }}
          >
            <Done
              className={classes.tableActionButtonIcon + " " + classes.done}
            />
          </IconButton>
        </Tooltip>
      );
    } else {
      return <div style={{ color: "red" }}>N/A</div>;
    }
  };
  diplomaCourse = val => {
    if (val === true) {
      const { classes } = this.props;
      return (
        <Tooltip
          id="tooltip-top"
          title="Diploma"
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <IconButton
            aria-label="Edit"
            className={classes.tableActionButton}
            style={{ color: "green" }}
          >
            <Done
              className={classes.tableActionButtonIcon + " " + classes.done}
            />
          </IconButton>
        </Tooltip>
      );
    } else {
      return <div style={{ color: "red" }}>N/A</div>;
    }
  };
  render() {
    const { data, classes } = this.props;
    const emptySet = [["", "", "No DATA Available", ""]];
    const students =
      data !== null && data !== undefined && data.status !== "failed"
        ? data.map(item => [
            item.first_name,
            item.last_name,
            this.course(item.degree),
            this.diplomaCourse(item.diploma),
            item.allocations_count,
            this.actions(item.first_name, item.last_name, item.supervisor_id),
            this.delete(item.student_adm)
          ])
        : emptySet;

    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Supervisor Table</h4>
              <p className={classes.cardCategoryWhite}>supervisors </p>
            </CardHeader>
            <CardBody>
              <MUIDataTable
                data={students}
                columns={columns}
                options={options}
              />
            </CardBody>
          </Card>
          <NavLink to="/admin/supervisor">
            <Button color="info" round>
              Add Supervisor
            </Button>
          </NavLink>
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
SupervisorMUItable.propTypes = {
  data: PropTypes.array,
  classes: PropTypes.object,
  history: PropTypes.object,
  onDelete: PropTypes.func,
  status: PropTypes.string
};
export default withRouter(withStyles(styles)(SupervisorMUItable));
