import React, { useState } from "react";

function FetchRequests(props) {
  const { classes } = props;
  let [Isloading, setIsLoading] = useState(false);
  const [data, setData] = useState([]); //hooks
  return fetch("http://localhost:80/students.json")
    .then(res => res.json())
    .then(result => {
      setData(data, result.props);
      setIsLoading(Isloading, true);
    });
}

function DataRequest(option){
  if(!( this instanceOf; DataRequest)){
    return new DataRequest(option);
  }
}

DataRequest.prototype._fetchRequest = function(url, callback) {
  const self = this;
  return fetch(url)
    .then(res => res.json())
    .then(result => {
      return result;
    });
};
export DataRequest();
//export  FetchRequests;
