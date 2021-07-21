import axios from "axios";

const api = axios.create({
	baseURL: "https://us-central1-careerfair-development.cloudfunctions.net/api/v1",
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
		const response = await api.put(`/student/updateprioritylist/${uuid}`, body);
		return response;
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

const updateStudentDetails = async (id, body) => {
	try {
		const response = await api.put(`/student/${id}`, body);
		return response;
	} catch (error) {
		return error;
	}
};

const getPanel = async (panel_id) => {
	try {
		const panel = await api.get(`/panels/${panel_id}`);
		return panel;
	} catch (error) {
		return error;
	}
};

const getAssignedSessions = async (student_id) => {
	try {
		const assignedSessions = await api.get(`/student/sessions/${student_id}`);
		return assignedSessions;
	} catch (error) {
		return error;
	}
};

const updateStudentCV = async (student_id, url) => {
	try {
		const student_info = await api.put(`/student/updatecv/${student_id}`, {
			cvUrl: url,
		});
		return student_info;
	} catch (error) {
		return error;
	}
};

const updatePanelAvailability = async (id, body) => {
	try {
		const response = await api.post(`/company/panel/updateavalabilty/${id}`, body);
		return response;
	} catch (error) {
		return error;
	}
};

const getAllPanels = async (company_id) => {
	try {
		const panels = await api.get(`/company/panels/${company_id}`);
		return panels;
	} catch (error) {
		return error;
	}
};

const getPanelSessions = async (panel_id) => {
	try {
		const sessions = await api.get(`/company/panels/sessions/${panel_id}`);
		return sessions;
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
	updateStudentCV,
	updateStudentPriorityList,
	getAssignedSessions,
	getWalkinInterviews,
	getPanel,
	getAllPanels,
	updatePanelAvailability,
	getPanelSessions,
};
