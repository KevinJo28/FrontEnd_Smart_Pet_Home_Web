import { getConfig } from "../api/apiGetDoorConfig";

export async function getDoorConfig() {
    const config = await getConfig();
    return config;
}