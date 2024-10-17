import { Providers } from "../provider";



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
        {children}
        </Providers>
      
      </body>
    </html>
  );
}
