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
import uuid from "uuid";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomMarkInput from "components/CustomInput/CustomMarkInput.jsx";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import AddAlert from "@material-ui/icons/AddAlert";
import Clear from "@material-ui/icons/Clear";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import CardFooter from "../../../components/Card/CardFooter";
import ProgressTable from "./ProgressTable";

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
    allocation_id: this.props.location.state.allocation_id,
    documents: "",
    comments: "",
    marks: 0,
    tr: false,
    tl: false
  };
  componentWillUnmount() {
    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }
  showNotification(place) {
    var x = [];
    x[place] = true;
    this.setState(x);
    this.alertTimeout = setTimeout(
      function() {
        x[place] = false;
        this.setState(x);
      }.bind(this),
      6000
    );
  }
  cancelProgress = () => {
    const { history } = this.props;
    history.push("/admin/studentTable");
  };
  handleInput = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  resetValues = () => {
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) inputs[i].value = "";
  };
  submitForm = () => {
    const data = {};
    const { documents, comments, marks, allocation_id } = this.state;
    data.progress_id = uuid();
    data.allocation_id = allocation_id;
    data.document = documents;
    data.comments = comments;
    data.marks = marks;
    if (documents.length === 0 || comments.length === 0 || marks.length === 0) {
      this.showNotification("tl");
    } else {
      this.props.onSubmit(data);

      const { history, error } = this.props;
      if (!error) {
        this.resetValues();
        this.showNotification("tr");
        history.push("/admin/studentTable");
      } else {
        this.showNotification("tl");
      }
    }
  };
  objectToCsv = data => {
    const csvRow = [];
    //get the headers
    const headers = Object.keys(data[0]);
    csvRow.push(headers.join(","));
    //loop over Rows
    for (const row of data) {
      const val = headers.map(header => {
        const newVal = ("" + row[header]).replace(/"/g, '\\"'); //turn values to string
        return `"${newVal}"`;
      });
      csvRow.push(val.join(","));
    }
    return csvRow.join("\n");
  };
  download = data => {
    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "progress.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  downloadTable = () => {
    const { data } = this.props;
    const Tabledata = data.map(item => ({
      date: "March 29th 2019",
      documents: item.document,
      comments: item.comments,
      marks: item.marks
    }));
    const csvData = this.objectToCsv(Tabledata);
    this.download(csvData);
  };
  render() {
    const { classes, data, error, message, errorMessage } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>
                  Add Student Progress
                </h4>
              </CardHeader>
              <CardBody>
                <Snackbar
                  place="tl"
                  color={"danger"}
                  icon={AddAlert}
                  message={error ? errorMessage : "ALL FIELDS ARE REQUIRED !!!"}
                  open={this.state.tr}
                  closeNotification={() => this.setState({ tr: false })}
                  close
                />
                <Snackbar
                  place="tr"
                  color={"danger"}
                  icon={AddAlert}
                  message={message}
                  open={this.state.tr}
                  closeNotification={() => this.setState({ tr: false })}
                  close
                />
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Document Submitted"
                      id="documents"
                      name="input"
                      inputProps={{
                        multiline: true,
                        rows: 3,
                        value: this.state.documents
                      }}
                      formControlProps={{
                        fullWidth: true,
                        onChange: this.handleInput,
                        value: this.state.documents
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Comments"
                      id="comments"
                      name="input"
                      inputProps={{
                        multiline: true,
                        rows: 5,
                        value: this.state.comments
                      }}
                      formControlProps={{
                        fullWidth: true,
                        onChange: this.handleInput,
                        value: this.state.comments
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomMarkInput
                      labelText="Marks"
                      id="marks"
                      name="input"
                      inputProps={{
                        value: this.state.marks
                      }}
                      formControlProps={{
                        fullWidth: true,
                        onChange: this.handleInput,
                        value: this.state.marks
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="success" round onClick={this.submitForm}>
                  Add New
                </Button>

                <Button color="danger" round onClick={this.cancelProgress}>
                  <Clear />
                  Cancel
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <ProgressTable downloadTable={this.downloadTable} data={data} />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
Progress.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object,
  location: PropTypes.object.isRequired,
  history: PropTypes.object,
  documents: PropTypes.string,
  comments: PropTypes.string,
  status: PropTypes.string,
  marks: PropTypes.string,
  data: PropTypes.array,
  error: PropTypes.bool,
  message: PropTypes.string,
  errorMessage: PropTypes.string
};

export default withRouter(connect()(withStyles(styles)(Progress)));
