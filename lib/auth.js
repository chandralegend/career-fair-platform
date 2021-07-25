import React, { useState, useEffect, useContext, createContext } from "react";
import Router from "next/router";
import { firebase } from "./firebase";

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
	const [loading, setLoading] = useState(false);

	const handleUser = async (rawUser) => {
		if (rawUser) {
			const formatted_user = await formatUser(rawUser);
			const { token, ...userWithoutToken } = formatted_user;
			setUser(formatted_user);
			setLoading(false);
			return true;
		} else {
			setUser(null);
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
					...info,
				};
				// console.count("Create Student Called");
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
				const handled = handleUser(response.user);
				if (handled) {
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

	const updateUser = (new_userdata) => {
		try {
			setUser({ ...user, ...new_userdata });
		} catch (error) {
			console.log(error);
		}
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
		updateUser,
	};
}

const formatUser = async (user) => {
	if (user.email.endsWith("uom.lk")) {
		// console.count("Auth GetStudent");
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
			checkedin: data.checkedin,
			company_list: data.company_list,
			completed_companies: data.completed_companies,
		};
	} else {
		// console.count("Auth GetCompany");
		const { data } = await getCompany(user.uid);
		return {
			user,
			username: data.username,
			uuid: user.uid,
			email: data.email,
			name: data.name,
			photoUrl: data.photoUrl,
			assign_representative: data.assign_representative,
		};
	}
};
