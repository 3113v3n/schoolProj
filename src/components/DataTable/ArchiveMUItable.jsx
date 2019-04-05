import React from "react";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import PropTypes from "prop-types";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
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
const columns = [
  {
    name: "Admission",
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
    name: "supervisor",
    options: {
      filter: true
    }
  },
  {
    name: "project Code",
    options: {
      filter: true
    }
  },
  {
    name: "date Registered",
    options: {
      filter: true
    }
  },
  {
    name: "Finish Date",
    options: {
      filter: true
    }
  }
];

const options = {
  filter: true,
  filterType: "dropdown",
  selectableRows: false
};

class Archives extends React.Component {
  render() {
    const { archives, classes } = this.props;
    const data =
      archives !== null &&
      archives !== undefined &&
      archives.status !== "failed"
        ? archives.map(item => [
            item.student_adm,
            item.student_name,
            item.supervisor_name,
            item.project_code,
            moment(item.date_registered).format("Do MMMM YYYY"),
            item.due_date
          ])
        : ["", "", "NO ARCHIVES", ""];
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Archives Table</h4>
              <p className={classes.cardCategoryWhite}>Archives </p>
            </CardHeader>
            <CardBody>
              <MUIDataTable data={data} columns={columns} options={options} />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}
Archives.propTypes = {
  archives: PropTypes.array,
  classes: PropTypes.object
};
export default withStyles(styles)(Archives);
