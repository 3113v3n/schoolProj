import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
/////////////
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Delete from "@material-ui/icons/Delete";
import { NavLink } from "react-router-dom";

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
  }
};

function superTable(props) {
  const { classes } = props;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>SuperVisors Table</h4>
            <p className={classes.cardCategoryWhite}>SuperVisors </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={[
                "ID",
                "Name",
                "Email",
                "Degree",
                "Diploma",
                "Actions"
              ]}
              tableData={[
                [
                  "1",
                  "Dr. Salesio",
                  "salesio@gmail.com",
                  "degree",
                  " 0",
                  <TableCell className={classes.tableActions} key={Tooltip.id}>
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
                            classes.tableActionButtonIcon + " " + classes.edit
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
                        aria-label="Delete"
                        className={classes.tableActionButton}
                      >
                        <Delete
                          className={
                            classes.tableActionButtonIcon + " " + classes.delete
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                ],
                [
                  "2",
                  "Mr. Kariuki",
                  "dkariuki50@gmail.com",
                  " 0",
                  "diploma",
                  <TableCell className={classes.tableActions} key={Tooltip.id}>
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
                            classes.tableActionButtonIcon + " " + classes.edit
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
                        aria-label="Delete"
                        className={classes.tableActionButton}
                      >
                        <Delete
                          className={
                            classes.tableActionButtonIcon + " " + classes.delete
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                ]
              ]}
            />
          </CardBody>
        </Card>

        <NavLink to="/admin/supervisor">
          <Button type="button" color="primary" round>
            <PersonAdd /> Add Supervisor
          </Button>
        </NavLink>
      </GridItem>
    </GridContainer>
  );
}

export default withStyles(styles)(superTable);
