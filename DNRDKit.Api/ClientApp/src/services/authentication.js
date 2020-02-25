import { handleResponse } from './request-response';
import { SETTINGS } from '../config/app';

export const authService = {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
};

function signOut(callback) {
    localStorage.removeItem(SETTINGS.STORAGE_KEY);
    callback(true);
}

function signInWithEmailAndPassword(email, password, callback) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${SETTINGS.API_PATH}/connect/token`, requestOptions)
        .then(handleResponse)
        .then(
            (result) => {
                localStorage.setItem(SETTINGS.STORAGE_KEY, result.token);
                callback(result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                callback(null);
            }
        );
}

function onAuthStateChanged(callback) {
    const token = localStorage.getItem(SETTINGS.STORAGE_KEY);
    if (token) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        };

        return fetch(`${SETTINGS.API_PATH}/connect/state`, requestOptions)
            .then(handleResponse)
            .then(
                (result) => {
                    callback(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    localStorage.removeItem(SETTINGS.STORAGE_KEY);
                    callback(null);
                }
            );
    } else {
        callback(null);
    }
}