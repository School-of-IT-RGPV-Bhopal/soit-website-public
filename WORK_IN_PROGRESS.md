# Work in Progress Sections

Use the shared Work in Progress component for routes that should be temporarily hidden until launch.

## Quick start

1. Import the component in the route page.
2. Replace the existing page content with the component.
3. Adjust the messaging per section.

## Example

```tsx
import WorkInProgress from "components/WorkInProgress";

export default function SomeSectionPage() {
  return (
    <WorkInProgress
      title="This section is launching soon"
      description="We are polishing the content and collecting the latest inputs. Please check back shortly."
      expectedLaunch="If you need this information right now, reach out and we will share it directly."
      contactEmail="contact@soit.example"
    />
  );
}
```

## Notes

- Update the email, text, and link as needed.
- If you want to keep a section in the nav but block access, leave the route in place and show this component.
- When the section is ready, restore the original page content or remove the component.
