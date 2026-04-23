import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Ordinances - SoIT RGPV',
  description: 'Ordinances page',
};

export default function OrdinanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}