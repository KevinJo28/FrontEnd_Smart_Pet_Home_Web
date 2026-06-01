import Food from "../assets/pet-food.png";
import Rewards from "../assets/reward.png";
import Water from "../assets/dispenser.png";

export const getDeviceImage = (type) => {
  const images = {
    food_dispenser: Food,
    water_dispenser: Water,
    reward_dispenser: Rewards,
    // door_controller: Door,
    // ball_launcher: BallLauncher,
    // activity_monitor: Activity,
    // temperature_sensor: Temperature,
    // pet_communication: Communication,
  };

  return images[type];
};