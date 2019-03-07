import isEmpty from "lodash/isEmpty";
import Validator from "validator";
function validateInputs(data) {
  let errors = {};
  if (Validator.isNull(data.staff_id)) {
    errors.staff_id = "field is Required";
  }
  if (Validator.isNull(data.password)) {
    errors.password = "field is Required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}

export default validateInputs;
