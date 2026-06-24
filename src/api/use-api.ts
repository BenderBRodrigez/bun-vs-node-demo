import { ApiContext } from "./api-context";
import { useContext } from "react";

export const useApi = () => useContext(ApiContext);
