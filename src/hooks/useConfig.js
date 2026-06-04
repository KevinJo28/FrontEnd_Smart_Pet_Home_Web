
import { useContext } from "react";
import { configContext } from "../context/configContext";
 
export function useConfig() {
  return useContext(configContext);
}
 