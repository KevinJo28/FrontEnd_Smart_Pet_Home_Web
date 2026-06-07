import { CreateConfig } from "../api/apiCreateWater";



export async function CreateConfig1({ water_level, distance }) {
 
    await CreateConfig({
      water_level,
      distance
    });
}