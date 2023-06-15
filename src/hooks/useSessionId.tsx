import React from "react";

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
