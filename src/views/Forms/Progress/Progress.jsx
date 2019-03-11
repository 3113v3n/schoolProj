import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import PropTypes from "prop-types";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
////////////////////////////
import * as actionTypes from "../../../Redux/Actions/action-types";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomMarkInput from "components/CustomInput/CustomMarkInput.jsx";
import * as actionCreators from "../../../Redux/Actions";
import Table from "components/Table/Table.jsx";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import GetApp from "@material-ui/icons/GetApp";
import uuid from "uuid";
import { connect } from "react-redux";
import { withRouter } from "react-router";
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
    goBack: false,
    AdmNo: `${this.props.location.state.marks}`,
    documents: "documents",
    comments: "comments",
    marks: "marks"
  };

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //
  // }

  handleInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  submitForm = () => {
    const data = {};
    const { documents, comments, marks } = this.state;
    data.admNo = uuid();
    data.documentSubmited = documents;
    data.comments = comments;
    data.marks = marks;
    this.props.onSubmit(data);
    const { history } = this.props;
    history.push("/admin/studentTable");
  };
  render() {
    const { classes, location } = this.props;
    const { date, comments, marks, documents } = location.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  Edit Student Progress
                </h4>
              </CardHeader>
              <CardBody>
                <CustomInput
                  labelText="Adm Number"
                  id="admNo"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    disabled: true,
                    value: this.state.AdmNo
                  }}
                />
                <CustomInput
                  labelText="Document Submitted"
                  id="documents"
                  formControlProps={{
                    fullWidth: true,
                    onChange: this.handleInput,
                    value: this.state.documents
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
                    fullWidth: true,
                    onChange: this.handleInput,
                    value: this.state.comments
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 5
                  }}
                />
                <CustomMarkInput
                  labelText="Marks"
                  id="marks"
                  formControlProps={{
                    fullWidth: true,
                    onChange: this.handleInput,
                    value: this.state.marks
                  }}
                />
              </CardBody>
            </Card>
            <Button color="primary" round onClick={this.submitForm}>
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
                  tableHead={["Date", "Documents", "Comments", "Marks"]}
                  tableData={[
                    [`${date}`, `${documents}`, `${comments}`, `${marks}`]
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
Progress.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object,
  goBack: PropTypes.bool,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  date: PropTypes.string,
  documents: PropTypes.string,
  comments: PropTypes.string,
  marks: PropTypes.string,
  onEdit: PropTypes.func.isRequired
};
const mapDispatchToProps = dispatch =>{
  return{
    onEdit: data =>
      dispatch(actionCreators.setMyData(actionTypes.EDIT_PROGRESS,data))
  };
}
export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(withStyles(styles)(Progress))
);
