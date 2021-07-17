import React, { useContext, useEffect, createContext, useState } from "react";

import { db } from "./firebase";

const interviewContext = createContext();

export const useInterview = () => {
	return useContext(interviewContext);
};

function InterviewProvider({ children, session_id }) {
	const [completedInterviews, setCompletedInterviews] = useState([]);
	const [inQueueInterviews, setInQueueInterviews] = useState([]);
	const [walkinInterviews, setWalkinInterviews] = useState([]);

	function Refresh() {
		FETCH_INTERVIEWS();
	}

	async function FETCH_INTERVIEWS() {
		if (!session_id) return;

		console.count("Fetching Interview Data");
		const interviews = db.collection("interviews").where("session_id", "==", session_id);

		const completed = await interviews.where("isCompleted", "==", true).get();
		const completed_interview = [];
		completed.forEach((interview) => {
			completed_interview.push({
				id: interview.id,
				...interview.data(),
			});
		});
		setCompletedInterviews(completed_interview);

		const walkin = await interviews.where("isWakin", "==", true).get();
		const walkin_interview = [];
		walkin.forEach((interview) => {
			walkin_interview.push({
				id: interview.id,
				...interview.data(),
			});
		});
		setWalkinInterviews(walkin_interview);

		const inqueue = await interviews.where("isCompleted", "==", false).get();
		const inqueue_interview = [];
		inqueue.forEach((interview) => {
			inqueue_interview.push({
				id: interview.id,
				...interview.data(),
			});
		});
		setInQueueInterviews(inqueue_interview);
	}

	useEffect(() => {
		FETCH_INTERVIEWS();
	}, [session_id]);

	return (
		<interviewContext.Provider
			value={{ completedInterviews, walkinInterviews, inQueueInterviews, session_id, Refresh }}>
			{children}
		</interviewContext.Provider>
	);
}

export default React.memo(InterviewProvider);
