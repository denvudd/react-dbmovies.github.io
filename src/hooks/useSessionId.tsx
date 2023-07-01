import React from "react";

/**
 * A custom React hook that returns the value of sessionId from LocalStorage if it exists, and null if not.
 * @example
 * const sessionId = useSessionId();
 * const handleClickSubmit = async () => {
    try {
      if (sessionId) {
        deleteSession(sessionId)
          .unwrap()
          .then((data) => {
            if (data.success) {
              localStorage.removeItem("session_id");
              router.reload();
            }
          });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
 */

export const useSessionId = () => {
  const [sessionId, setSessionId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const storedSessionId = localStorage.getItem("session_id");
    
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      setSessionId(null);
    }
  }, []);

  return sessionId;
};
