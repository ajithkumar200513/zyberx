import { UseAdminContext } from "./UseAdminContext";
import { useState } from "react";

export const UseAdminLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false); // Initialize as false
  const { dispatch } = UseAdminContext();

  const Adminlogin = async (email, password) => {
    setError(null);
    setisLoading(true);

    try {
      const response = await fetch('http://https://vercel.com/ajithkumar200513s-projects/ak-solution-and-service-rg7o/29pH2sLc913nMhoa2Egm2mcYewHj/Ak_Web/Admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || "Something went wrong"); // Handle known errors
      } else {
        localStorage.setItem('Admin', JSON.stringify(json));
        dispatch({ type: 'LOGIN', payload: json });
      }
    } catch (error) {
      setError('An unexpected error occurred'); // Handle unexpected errors
      console.error('Request failed:', error);
    } finally {
      setisLoading(false); // Ensure loading state is updated in all cases
    }
  };

  return { Adminlogin, error, isLoading };
};
