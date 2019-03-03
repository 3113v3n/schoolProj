import { ADD_PROJECT } from "./action-types";
import { ADD_STUDENTS } from "./action-types";
import { ADD_SUPERVISOR } from "./action-types";

export function AddStudents(payload) {
  return { type: ADD_STUDENTS, payload };
}

export function AddSupervisor(payload) {
  return { type: ADD_SUPERVISOR, payload };
}

export function AddProject(payload) {
  return { type: ADD_PROJECT, payload };
}

