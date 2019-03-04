import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
////////////////////////////
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomMarkInput from "components/CustomInput/CustomMarkInput.jsx";
import { Redirect } from "react-router-dom";
import Table from "components/Table/Table.jsx";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import GetApp from "@material-ui/icons/GetApp";
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
class Progress extends React.Component {
  state = {
    toEditScreen: false,
    AdmNo: "",
    documents: [],
    marks: ""
  };
  goToEdit = () => {
    this.setState({
      toEditScreen: true
    });
  };
  render() {
    if (this.state.toEditScreen === true) {
      this.props.history.push("/admin/studentTable");
      //return <Redirect to="/admin/studentTable" />;
    }
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Student form</h4>
              </CardHeader>
              <CardBody>
                <CustomInput
                  labelText="Adm Number"
                  id="regular"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    disabled: true
                  }}
                />
                <CustomInput
                  labelText="Document Submitted"
                  id="float"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 3
                  }}
                />
                <CustomInput
                  labelText="Comments"
                  id="float"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 5
                  }}
                />
                <CustomMarkInput
                  labelText="Marks"
                  id="regular"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </CardBody>
            </Card>
            <Button color="primary" round>
              Submit
            </Button>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>
                  Student Progress Table
                </h4>
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
                    <GetApp />
                  </IconButton>
                </Tooltip>
                <Table
                  tableHeaderColor="warning"
                  tableHead={[
                    "Date",
                    "Documents",
                    "Comments",
                    "Marks",
                    "Actions"
                  ]}
                  tableData={[
                    [
                      "23 - 02 -2019",
                      "Proposal",
                      "Work on your References",
                      "12",
                      <Tooltip
                        key="tool"
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
                            onClick={this.goToEdit}
                          />
                        </IconButton>
                      </Tooltip>
                    ]
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
export default withStyles(styles)(Progress);
