import React, { useContext, useEffect, createContext, useState } from "react";
import { db } from "./firebase";

const interviewContext = createContext();

export const useInterview = () => {
	return useContext(interviewContext);
};

function InterviewProvider({ children, session_id, panel_id }) {
	const [completedInterviews, setCompletedInterviews] = useState([]);
	const [inQueueInterviews, setInQueueInterviews] = useState([]);
	const [walkinInterviews, setWalkinInterviews] = useState([]);

	function Refresh() {
		FETCH_INTERVIEWS();
	}

	function NextInterview() {
		if (inQueueInterviews.length) {
			const temp_inQueueInterviews = [...inQueueInterviews];
			const temp_completedInterviews = [...completedInterviews];
			const prev_interview = temp_inQueueInterviews.shift();
			temp_completedInterviews.push(prev_interview);

			setCompletedInterviews(temp_completedInterviews);
			setInQueueInterviews(temp_inQueueInterviews);
			db.collection("interviews").doc(prev_interview.id).update({ isCompleted: true });
		}
	}

	function UpdateCheckin(checkinstatus) {
		db.collection("sessions").doc(session_id).update({ isCheckinEnabled: checkinstatus });
	}
	function UpdateWalkin(walkinstatus) {
		db.collection("panels").doc(panel_id).update({ isWalkinEnabled: walkinstatus });
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

		const walkin = await interviews.where("isWalkin", "==", true).get();
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
	}, [session_id, panel_id]);

	return (
		<interviewContext.Provider
			value={{
				completedInterviews,
				walkinInterviews,
				inQueueInterviews,
				session_id,
				panel_id,
				Refresh,
				NextInterview,
				UpdateCheckin,
				UpdateWalkin,
			}}>
			{children}
		</interviewContext.Provider>
	);
}

export default React.memo(InterviewProvider);
