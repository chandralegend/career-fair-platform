import axios from "axios";

const api = axios.create({
 baseURL: "http://localhost:5001/careerfair-development/us-central1/api/v1",
});

const getStudent = async (student_id) => {
 try {
  const student_info = await api.get(`/student/${student_id}`);
  return student_info;
 } catch (error) {
  return error;
 }
};

const getCompany = async (company_id) => {
 try {
  const company_info = await api.get(`/company/${company_id}`);
  return company_info;
 } catch (error) {
  return error;
 }
};

const getWalkinInterviews = async () => {
 try {
  const walkinInterviews = await api.get("/interview/getwalkininterviews");
  return walkinInterviews;
 } catch (error) {
  return error;
 }
};

const createStudent = async (body) => {
 try {
  const response = await api.post("/student", body);
  return response;
 } catch (error) {
  return error.response;
 }
};

const getAllCompanies = async () => {
 try {
  const response = await api.get("/getAllCompanies");
  return response;
 } catch (error) {
  return error.response;
 }
};

const updateStudentPriorityList = async (body) => {
 try {
  const response = await api.post("/student/updateStudentPriorityList", body);
  return response;
 } catch (error) {
  return error.response;
 }
};

const updateStudentDetails = async (body) => {
 console.log(body);
 try {
  const response = await api.post("/student/updateStudentDetails", body);
  return response;
 } catch (error) {
  return error.response;
 }
};

module.exports = {
 api,
 getStudent,
 getCompany,
 getAllCompanies,
 createStudent,
 updateStudentDetails,
 updateStudentPriorityList,
};
