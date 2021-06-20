import React, { useState, useEffect, useContext, createContext } from "react";
import Router from "next/router";
import firebase from "./firebase";

import { getStudent, getCompany, createStudent } from "./api";

const authContext = createContext();

export function AuthProvider({ children }) {
	const auth = useFirebaseAuth();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
	return useContext(authContext);
};

function useFirebaseAuth() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const handleUser = async (rawUser) => {
		if (rawUser) {
			const user = await formatUser(rawUser);
			const { token, ...userWithoutToken } = user;
			setUser(user);
			setLoading(false);
			return user;
		} else {
			setUser(false);
			setLoading(false);
			return false;
		}
	};

	const signup = (email, password, info) => {
		return firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(async (user) => {
				const body = {
					uuid: user.user.uid,
					universityid: info.universityid,
					email: info.email,
					name: info.name,
					department: info.department,
					phone: info.phone,
					photoUrl: info.photoUrl,
				};
				const response = await createStudent(body);
				return { uid: user.user.uid, response };
			})
			.catch((error) => {
				return { response: { status: 400 }, error };
			});
	};

	const signin = (email, password, redirect) => {
		setLoading(true);
		return firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((response) => {
				// TODO: API call to get student info ( input: student_id from response.user, output: student info)
				// Pass the student info into handleUser
				handleUser(response.user);

				if (redirect) {
					Router.push(redirect);
				}
			});
	};

	const signout = () => {
		return firebase
			.auth()
			.signOut()
			.then(() => {
				Router.push("/");
			});
	};

	const updatePassword = (newPassword) => {
		return user.user.updatePassword(newPassword);
	};

	useEffect(() => {
		const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);
		return () => unsubscribe();
	}, []);

	const getFreshToken = async () => {
		const currentUser = firebase.auth().currentUser;
		if (currentUser) {
			const token = await currentUser.getIdToken(false);
			return `${token}`;
		} else {
			return "";
		}
	};

	return {
		user,
		loading,
		signup,
		signin,
		signout,
		updatePassword,
		getFreshToken,
		setLoading,
	};
}

const formatUser = async (user) => {
	if (user.email.endsWith("uom.lk")) {
		const { data } = await getStudent(user.uid);
		return {
			user,
			username: data.username,
			uuid: user.uid,
			email: data.email,
			name: data.name,
			phone: data.phone,
			department: data.department,
			photoUrl: data.photoUrl,
			cvUrl: data.cvUrl,
		};
	} else {
		const { data } = await getCompany(user.uid);
		return {
			user,
			username: data.username,
			uuid: data.uid,
			email: data.email,
			name: data.name,
			photoUrl: data.photoUrl,
		};
	}
};
