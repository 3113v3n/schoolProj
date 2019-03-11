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
import { withRouter } from "react-router";
import Button from "components/CustomButtons/Button.jsx";
import PropTypes from "prop-types";
import AllocationTableRow from "../../components/Table/AllocationTableRow";
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

//function UpgradeToPro(props)
class AllocationComponent extends React.Component {
  render() {
    const { classes, data } = this.props;

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
                      <th>StudentName</th>
                      <th>Supervisor</th>
                      <th>ProjCode</th>
                      <th>Date-Registered</th>
                      <th>allocations</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {data.map(Allocations => (
                    <AllocationTableRow
                      studentName={Allocations.studentName}
                      supervisor={Allocations.supervisor}
                      dateRegistered={Allocations.dateRegistered}
                      key={Allocations.studentName}
                      projectCode={Allocations.projectCode}
                    />
                  ))}
                </table>
              </div>
            </CardBody>
          </Card>
          <Button color="info" round>
            New Allocation
          </Button>
        </GridItem>
      </GridContainer>
    );
  }
}
AllocationComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array
}
export default withRouter(withStyles(styles)(AllocationComponent));
