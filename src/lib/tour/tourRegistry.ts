import type { DriveStep } from "driver.js";
import { academicsSteps } from "./steps/academics";
import { homeSteps } from "./steps/home";
import { placementsSteps } from "./steps/placements";
import { studentLifeSteps } from "./steps/student-life";

export const tourRegistry: Record<string, DriveStep[]> = {
  "/": homeSteps,
  "/academics": academicsSteps,
  "/placements": placementsSteps,
  "/student-life": studentLifeSteps,
};
