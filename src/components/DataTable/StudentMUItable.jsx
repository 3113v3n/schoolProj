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
const columns = [
  {
    name: "Admission Number",
    options: {
      filter: true
    }
  },
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

class StudentMUItable extends React.Component {
  goToEdit = (code, name, id) => {
    const { history } = this.props;
    history.push({
      pathname: "/admin/editStudentTable",
      state: {
        name: name,
        admNo: id,
        projectCode: code
      }
    });
  };
  refreshPage = () => {
    window.location.reload();
  };
  deleteRow = id => {
    let student_adm = parseInt(id);
    this.props.onDelete(student_adm);
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
  render() {
    const { data, classes } = this.props;
    const emptySet = [["", "", "No DATA Available", ""]];
    const students =
      data !== null && data !== undefined && data.status !== "failed"
        ? data.map(item => [
            item.student_adm,
            item.name,
            item.project_code,
            this.actions(item.project_code, item.name, item.student_adm),
            this.delete(item.student_adm)
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
          </Card>
          <NavLink to="/admin/addAllocation">
            <Button color="info" round>
              New Allocation
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
StudentMUItable.propTypes = {
  data: PropTypes.array,
  classes: PropTypes.object,
  history: PropTypes.object,
  onDelete: PropTypes.func,
  status: PropTypes.string
};
export default withRouter(withStyles(styles)(StudentMUItable));
