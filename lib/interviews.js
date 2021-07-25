import React, { useContext, useEffect, createContext, useState } from "react";
import { useAuth } from "./auth";
import { db, firebase } from "./firebase";

const interviewContext = createContext();

export const useInterview = () => {
	return useContext(interviewContext);
};

function InterviewProvider({ children, session_id, panel_id }) {
	const { user } = useAuth();
	const [completedInterviews, setCompletedInterviews] = useState([]);
	const [inQueueInterviews, setInQueueInterviews] = useState([]);
	const [walkinInterviews, setWalkinInterviews] = useState([]);

	function NextInterview() {
		if (inQueueInterviews.length) {
			const temp_inQueueInterviews = [...inQueueInterviews];
			const prev_interview = temp_inQueueInterviews.shift();

			db.collection("interviews").doc(prev_interview.id).update({ isCompleted: true });
			db.collection("students")
				.doc(prev_interview.student_id)
				.update({ checkedin: "", completed_companies: firebase.firestore.FieldValue.arrayUnion(user.uuid) });
		}
	}

	function UpdateCheckin(checkinstatus) {
		db.collection("sessions").doc(session_id).update({ isCheckinEnabled: checkinstatus });
	}
	function UpdateWalkin(walkinstatus) {
		db.collection("panels").doc(panel_id).update({ isWalkinEnabled: walkinstatus });
	}

	function FETCH_INTERVIEWS() {
		// console.count("Fetching Interview Data");
		const interviews = db.collection("interviews").where("session_id", "==", session_id).orderBy("created_at");

		const completed_unsubscriber = interviews.where("isCompleted", "==", true).onSnapshot((snapshot) => {
			const completed_interviews = [];
			snapshot.docs.forEach((interview) => {
				completed_interviews.push({
					id: interview.id,
					...interview.data(),
				});
			});
			setCompletedInterviews(completed_interviews);
		});

		const walkin_unsubscriber = interviews.where("isWalkin", "==", true).onSnapshot((snapshot) => {
			const walkin_interviews = [];
			snapshot.docs.forEach((interview) => {
				walkin_interviews.push({
					id: interview.id,
					...interview.data(),
				});
			});
			setWalkinInterviews(walkin_interviews);
		});

		const inqueue_unsubscriber = interviews.where("isCompleted", "==", false).onSnapshot((snapshot) => {
			const inqueue_interviews = [];
			snapshot.docs.forEach((interview) => {
				inqueue_interviews.push({
					id: interview.id,
					...interview.data(),
				});
			});
			setInQueueInterviews(inqueue_interviews);
		});

		return { completed_unsubscriber, walkin_unsubscriber, inqueue_unsubscriber };
	}

	useEffect(() => {
		if (session_id) {
			const { completed_unsubscriber, walkin_unsubscriber, inqueue_unsubscriber } = FETCH_INTERVIEWS();
			return () => {
				completed_unsubscriber();
				walkin_unsubscriber();
				inqueue_unsubscriber();
			};
		} else {
			setCompletedInterviews([]);
			setInQueueInterviews([]);
			setWalkinInterviews([]);
		}
	}, [session_id, panel_id]);

	return (
		<interviewContext.Provider
			value={{
				completedInterviews,
				walkinInterviews,
				inQueueInterviews,
				session_id,
				panel_id,
				NextInterview,
				UpdateCheckin,
				UpdateWalkin,
			}}>
			{children}
		</interviewContext.Provider>
	);
}

export default React.memo(InterviewProvider);
