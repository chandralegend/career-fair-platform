import React, { useState, useEffect, useContext, createContext } from "react";
import Router from "next/router";
import firebase from "./firebase";

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
		console.log("handleUser called", new Date());
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

	const signin = (email, password, redirect) => {
		setLoading(true);
		return firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((response) => {
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

	useEffect(() => {
		const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);
		return () => unsubscribe();
	}, []);

	const getFreshToken = async () => {
		console.log("getFreshToken called", new Date());
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
		signin,
		signout,
		getFreshToken,
		setLoading,
	};
}

const formatUser = async (user) => {
	return {
		uid: user.uid,
		email: user.email,
		name: user.displayName,
		provider: user.providerData[0].providerId,
		photoUrl: user.photoURL,
	};
};
