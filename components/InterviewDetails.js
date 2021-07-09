import React, { useContext, useEffect, createContext, useState } from "react";
import { db } from "../lib/firebase";
const interviewContext = createContext();

function InterviewsProvider({ children, sessionID }) {
	const [interviews, setInterviews] = useState({
		completedList: [],
		inqueueList: [],
		walinkList: [],
	});

	useEffect(() => {
		//TODO: Order  interviews
		if (sessionID) {
			db.collection("interview")
				.where("session_id", "==", sessionID.trim())
				.onSnapshot((snapshot) => {
					const newWalkingInterviewList = [];
					const newCompletedList = [];
					const newInQueueList = [];

					snapshot.docs.forEach((doc) => {
						if (doc.data().is_walkin) {
							newWalkingInterviewList.push({
								studentID: doc.data().student_id,
								meetLink: doc.data().meet_link,
								interviewID: doc.id,
							});
						}
						if (doc.data().status == "incomplete") {
							newInQueueList.push({
								studentID: doc.data().student_id,
								meetLink: doc.data().meet_link,
								interviewID: doc.id,
							});
						} else if (doc.data().status == "completed") {
							newCompletedList.push({
								studentID: doc.data().student_id,
								meetLink: doc.data().meet_link,
							});
						} else {
							//TODO:Handle ERRORs
						}
					});
					setInterviews({
						completedList: newCompletedList,
						inqueueList: newInQueueList,
						walinkList: newWalkingInterviewList,
					});
				});
		}
	}, [sessionID]);
	return (
		<interviewContext.Provider value={interviews}>
			{children}
		</interviewContext.Provider>
	);
}

export default InterviewsProvider;
export const useInterview = () => {
	return useContext(interviewContext);
};
