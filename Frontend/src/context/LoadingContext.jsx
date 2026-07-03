import { createContext, useContext, useState } from "react";

export const LoadingContext = createContext();

export const LoadingProvider = ({children}) => {
    const [loading,setLoading] = useState(false);
    const [progress,setProgress] = useState(0);
    const [message,setMessage] = useState("");

    const startLoading = (msg="")=>{
        setLoading(true);
        setProgress(0);
        setMessage(msg);
    }

    const stopLoading = () =>{
        setLoading(false);
        setProgress(0);
        setMessage("");
    }
    return (
        <LoadingContext.Provider
            value = {{
                loading,
                progress,
                message,
                setProgress,
                setMessage,
                startLoading,
                stopLoading
            }}
        >
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext);