import { CreateConfig } from "../api/apiCreateDoorConfig";
import { updateConfig } from "../api/apiUpdateDoorConfig";


export async function CreateConfig1({ open_time, close_time }) {
  try {
    await CreateConfig({
      open_time,
      close_time
    });
  } catch {
    await updateConfig({
      open_time,
      close_time
    });
  }
}