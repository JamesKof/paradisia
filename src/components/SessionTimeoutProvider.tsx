import { useSessionTimeout } from "@/hooks/useSessionTimeout";

export const SessionTimeoutProvider = () => {
  useSessionTimeout();
  return null;
};
