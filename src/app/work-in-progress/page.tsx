import WorkInProgress from "@components/WorkInProgress";
import { siteContact } from "@lib/siteContact";

export default function WorkInProgressPage() {
  return (
    <WorkInProgress
      title="This section is launching soon"
      description="We are polishing the content and collecting the latest inputs. Please check back shortly."
      expectedLaunch="If you need this information right now, reach out and we will share it directly."
      contactEmail={siteContact.supportEmail}
    />
  );
}
