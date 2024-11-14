import { Providers } from "../provider";

import './globals.css'

import { Navbar } from "./components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>
     
        <Providers>
          
        <Navbar />
        <div className="mt-10">
        {children}
        </div>
        </Providers>
      
      </body>
    </html>
  );
}
