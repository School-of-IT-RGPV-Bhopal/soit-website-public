import type { DriveStep } from "driver.js";
import { academicsSteps } from "./steps/academics";
import { gallerySteps } from "./steps/gallery";
import { homeSteps } from "./steps/home";
import { placementsSteps } from "./steps/placements";
import { studentLifeSteps } from "./steps/student-life";

export const tourRegistry: Record<string, DriveStep[]> = {
  "/": homeSteps,
  "/academics": academicsSteps,
  "/gallery": gallerySteps,
  "/placements": placementsSteps,
  "/student-life": studentLifeSteps,
};
