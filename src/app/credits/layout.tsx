import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Credits & Contributors - SoIT RGPV',
  description: 'Acknowledging the dedicated mentors, team members, and students who made the SoIT website possible.',
};

export default function CreditsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}