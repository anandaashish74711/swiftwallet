import { Providers } from "../provider";
import { ThemeProvider } from 'next-themes';


import { Navbar } from "./components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <Providers>
        <Navbar />
        {children}
        </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
