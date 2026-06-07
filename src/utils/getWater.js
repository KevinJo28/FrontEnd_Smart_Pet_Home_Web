import { getConfig } from "../api/apiGetWater";

export async function getWater() {
    const config = await getConfig();
    return config;
}