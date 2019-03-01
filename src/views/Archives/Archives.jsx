import React from "react";
import ArchiveComponent from "./ArchiveComponent.jsx";

class Archives extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Sname: "Sidney Reezy",
      superv: " Mr. Gitau",
      code: " 200",
      date: "20-12-2018"
    };
  }
  render() {
    const{Sname,superv,code,date} = this.state;
    return (
      <div>
        <ArchiveComponent
          name={Sname}
          supervisor={superv}
          projCode={code}
          date={date}
        />
      </div>
    );
  }
}

export default Archives;
