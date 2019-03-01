import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import PersonAdd from "@material-ui/icons/PersonAdd";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import Button from "components/CustomButtons/Button.jsx";

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

function AdminComponent(props) {
  const { classes, data } = props;
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Student Table</h4>
            <p className={classes.cardCategoryWhite}>students </p>
          </CardHeader>
          <CardBody>
            <div className={classes.tableUpgradeWrapper}>
              <table className={classes.table}>
                <thead>
                  <tr>
                    <th>Adm Number</th>
                    <th>Student Name</th>
                    <th>Project Code</th>
                    <th>Date Registered</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(Students => (
                    <tr className={classes.center} key={Students.admissionNo}>
                      <td>{Students.admissionNo}</td>
                      <td>{Students.studentName}</td>
                      <td>{Students.projectCode}</td>
                      <td>{Students.dateRegistered}</td>
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
                              className={
                                classes.tableActionButtonIcon +
                                " " +
                                classes.edit
                              }
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
                                classes.tableActionButtonIcon +
                                " " +
                                classes.close
                              }
                            />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>

        <NavLink to="/admin/students">
          <Button type="button" color="primary" round>
            <PersonAdd /> Add New Student
          </Button>
        </NavLink>
      </GridItem>
    </GridContainer>
  );
}
export default withStyles(styles)(AdminComponent);

AdminComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array
};
