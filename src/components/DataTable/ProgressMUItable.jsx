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
import moment from "moment";
const columns = [
  {
    name: "Date",
    options: {
      filter: true
    }
  },
  {
    name: "Documents",
    options: {
      filter: true
    }
  },

  {
    name: "Comments",
    options: {
      filter: true
    }
  },

  {
    name: "Marks",
    options: {
      filter: true
    }
  },
  {
    name: "Edit",
    options: {
      filter: false
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

class ProgressMUItable extends React.Component {
  goToEdit = (allocation_id, date, documents, comments, marks, progress_id) => {
    const { history } = this.props;
    history.push({
      pathname: "/admin/editProgress",
      state: {
        Date: date,
        documents: documents,
        comments: comments,
        marks: marks,
        allocation_id: allocation_id,
        progress_id: progress_id
      }
    });
  };

  actions = (id, date, doc, com, marks, prog) => {
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
          onClick={() => this.goToEdit(id, date, doc, com, marks, prog)}
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
    const emptySet = [["", "", "No Progress", ""]];
    const students =
      data !== null && data !== undefined && data.status !== "failed"
        ? data.map(item => [
            moment(item.date).format("Do MMMM YYYY"),
            item.document,
            item.comments,
            item.marks,
            this.actions(
              item.allocation_id,
              moment(item.date).format("Do MMMM YYYY"),
              item.document,
              item.comments,
              item.marks,
              item.progress_id
            )
          ])
        : emptySet;

    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
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
ProgressMUItable.propTypes = {
  data: PropTypes.array,
  classes: PropTypes.object,
  history: PropTypes.object,
  markAsCompleted: PropTypes.func
};
export default withRouter(withStyles(styles)(ProgressMUItable));
