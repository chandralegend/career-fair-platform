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

	function EnableCheckin(panel_id) {
		//TODO: Implement Enabling Checking Functionality @Janith
		console.log("Clicked Enable Checkin", panel_id);
	}
	function EnableWalkin(panel_id) {
		//TODO: Implement Enabling Walkin Functionality @Janith
		console.log("Clicked Enable Walkin", panel_id);
	}

	async function FETCH_INTERVIEWS() {
		if (!session_id) return;

		// console.count("Fetching Interview Data");
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
			value={{
				completedInterviews,
				walkinInterviews,
				inQueueInterviews,
				session_id,
				Refresh,
				NextInterview,
				EnableCheckin,
				EnableWalkin,
			}}>
			{children}
		</interviewContext.Provider>
	);
}

export default React.memo(InterviewProvider);
