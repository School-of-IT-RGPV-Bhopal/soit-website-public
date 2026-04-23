import type { DriveStep } from "driver.js";
import { homeSteps } from "./steps/home";

export const tourRegistry: Record<string, DriveStep[]> = {
  "/": homeSteps,
};
