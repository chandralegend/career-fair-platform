import axios from "axios";

const api = axios.create({
	baseURL:
		"https://us-central1-careerfair-development.cloudfunctions.net/api/v1",
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

const createStudent = async (body) => {
	try {
		const response = await api.post("/student", body);
		return response;
	} catch (error) {
		return error;
	}
};

const getAllCompanies = async () => {
	try {
		const response = await api.get("/company");
		return response;
	} catch (error) {
		return error;
	}
};

const updateStudentPriorityList = async (uuid, company_list) => {
	console.log(uuid, company_list);
	const body = {
		company_list,
	};

	try {
		const response = await api.put(
			`/student/updateprioritylist/${uuid}`,
			body
		);
		return response;
	} catch (error) {
		return error;
	}
};

const getWalkinInterviews = async () => {
	try {
		const walkinInterviews = await api.get(
			"/interview/getwalkininterviews"
		);
		return walkinInterviews;
	} catch (error) {
		return error;
	}
};

const updateStudentDetails = async (id, body) => {
	try {
		const response = await api.put(`/student/${id}`, body);
		return response;
	} catch (error) {
		return error;
	}
};

const getAssignedSessions = async (student_id) => {
	try {
		const assignedSessions = await api.get(`/sessions/${student_id}`);
		return assignedSessions;
	} catch (error) {
		return error;
	}
};

const getAllPanelKeys = async (company_id) => {
	try {
		const allPanelKeys = await api.get(`/company/panel/keys/${company_id}`);
		return allPanelKeys;
	} catch (error) {
		return error;
	}
};

const getPanel = async (panel_id) => {
	try {
		const panel = await api.get(`/company/panel/getpanel/${panel_id}`);
		return panel;
	} catch (error) {
		return error;
	}
};

const getAssignedInterviews = async (session_id) => {
	try {
		const assigned_students = await api.get(
			`/company/interviews/getassignedInterviews/${session_id}`
		);
		return assigned_students;
	} catch (error) {
		return error;
	}
};
const changePanelAvailability = async (id, body) => {
	try {
		const response = await api.post(
			`/company/panel/changepanelavailability/${id}`,
			body
		);
		return response;
	} catch (error) {
		return error;
	}
};
const changeWalkingStatus = async (id, body) => {
	try {
		const response = await api.post(
			`/company/panel/changewalkingstatus/${id}`,
			body
		);
		return response;
	} catch (error) {
		return error;
	}
};
const changeInterviewStatus = async (interviewID) => {
	try {
		const changeStatus = await api.get(
			`/company/interviews/changeinterviewstatus/${interviewID}`
		);
		return changeStatus;
	} catch (error) {
		return error;
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
	getAssignedSessions,
	getWalkinInterviews,
	getAllPanelKeys,
	getPanel,
	getAssignedInterviews,
	changePanelAvailability,
	changeWalkingStatus,
	changeInterviewStatus,
};
