import { UseUserContext } from "./UseUserContext";
import { useState } from "react";

export const UseUserLogin = () => {
    const [usererror, setError] = useState(null);
    const [userisLoading, setisLoading] = useState(null);
    const { dispatch } = UseUserContext();

    const Userlogin = async (email, password) => {
        setisLoading(true);
        setError(null);

        const response = await fetch('http://https://vercel.com/ajithkumar200513s-projects/ak-solution-and-service-rg7o/29pH2sLc913nMhoa2Egm2mcYewHj/Ak_Web/User/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const json = await response.json();

        if (!response.ok) {
            setisLoading(false);
            setError(json.error || "Something went wrong"); // Extract the error message
        }

        if (response.ok) {
            localStorage.setItem('User', JSON.stringify(json));
            dispatch({ type: 'LOGIN', payload: json });
            setisLoading(false);
        }
    };

    return { Userlogin, usererror, userisLoading };
};
