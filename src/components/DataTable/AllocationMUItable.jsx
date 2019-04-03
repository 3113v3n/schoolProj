import React from "react";
import MUIDataTable from "mui-datatables";
import moment from "moment";
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
const columns = [
  {
    name: "Student Name",
    options: {
      filter: true
    }
  },
  {
    name: "Supervisor",
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
    name: "Date Registered",
    options: {
      filter: true
    }
  },
  {
    name: "Due date",
    options: {
      filter: true
    }
  },
  {
    name: "actions",
    options: {
      filter: false
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

class AllocationMUItable extends React.Component {
  goToEdit = (code, name, id) => {
    const { history } = this.props;
    history.push({
      pathname: "/admin/editAllocations",
      state: {
        projectCode: code,
        studentName: name,
        allocation_id: id
      }
    });
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
  render() {
    const { data, classes } = this.props;
    const emptySet = [["", "", "No DATA Available", ""]];
    const allocation =
      data !== null && data !== undefined && data.status !== "failed"
        ? data.map(item => [
            item.student_name,
            item.supervisor_name,
            item.project_code,
            moment(item.date_registered).format("Do MMMM YYYY"),
            item.due_date,
            this.actions(
              item.project_code,
              item.student_name,
              item.allocation_id
            )
          ])
        : emptySet;

    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Allocations Table</h4>
              <p className={classes.cardCategoryWhite}>allocations </p>
            </CardHeader>
            <CardBody>
              <MUIDataTable
                data={allocation}
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
AllocationMUItable.propTypes = {
  data: PropTypes.array,
  classes: PropTypes.object,
  history: PropTypes.object
};
export default withRouter(withStyles(styles)(AllocationMUItable));
