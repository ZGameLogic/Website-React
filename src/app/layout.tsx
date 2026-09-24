import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ben Shabowski",
  description: "A website for Ben Shabowski",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
