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
import Done from "@material-ui/icons/Done";
const columns = [
  {
    name: "project Code",
    options: {
      filter: true
    }
  },
  {
    name: "Trimesters",
    options: {
      filter: true
    }
  },
  {
    name: "Degree",
    options: {
      filter: true
    }
  },
  {
    name: "Diploma",
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

class ProjectMUItable extends React.Component {
  goToEdit = (code, number) => {
    const { history } = this.props;
    history.push({
      pathname: "/admin/editProjects",
      state: {
        code: code,
        trimesters: number
      }
    });
  };
  actions = (code, number) => {
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
          onClick={() => this.goToEdit(code, number)}
        >
          <Edit
            className={classes.tableActionButtonIcon + " " + classes.edit}
          />
        </IconButton>
      </Tooltip>
    );
  };
  degreeItem = val => {
    if (val === true) {
      const { classes } = this.props;
      return (
        <Tooltip
          id="tooltip-top"
          title="Degree"
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
  diplomaItem = val => {
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

    const projects =
      data !== null && data !== undefined && data.status !== "failed"
        ? data.map(item => [
            item.project_code,
            item.trimesters,
            this.degreeItem(item.degree),
            this.diplomaItem(item.diploma),
            this.actions(item.project_code, item.trimesters)
          ])
        : ["", "", "No Projects", "",""];
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Projects Table</h4>
              <p className={classes.cardCategoryWhite}>projects </p>
            </CardHeader>
            <CardBody>
              <MUIDataTable
                data={projects}
                columns={columns}
                options={options}
              />
            </CardBody>
          </Card>
          <NavLink to="/admin/AddProjects">
            <Button color="info" round>
              Add Project
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
ProjectMUItable.propTypes = {
  data: PropTypes.array,
  classes: PropTypes.object,
  history: PropTypes.object
};
export default withRouter(withStyles(styles)(ProjectMUItable));
