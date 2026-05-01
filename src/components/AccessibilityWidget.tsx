"use client";

import { IAccessibilityOptions } from "accessibility";
import { useEffect } from "react";

const options: IAccessibilityOptions = {
  textToSpeechLang: "en-US",
  speechToTextLang: "en-US",
};

export default function AccessibilityWidget() {
  useEffect(() => {
    import("accessibility").then(({ Accessibility }) => {
      new Accessibility(options);
    });
  }, []);

  return null;
}
