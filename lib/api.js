import axios from "axios";

const api = axios.create({
	baseURL:
		"http://localhost:5001/careerfair-development/us-central1/app/api/v1",
});

const getStudent = async (student_id) => {
	try {
		const student_info = await api.get(`/student/${student_id}`);
		return student_info;
	} catch (error) {
		return error;
	}
};

module.exports = { api, getStudent };
