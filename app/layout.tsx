import { TrpcProvider } from "@/components/providers/trpc-provider";
import { cn, constructMetadata } from "@/lib/utils";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "relative h-full font-sans antialiased",
          inter.className
        )}
      >
        <main className="relative flex flex-col min-h-screen">
          <div className="flex-grow flex-1">
            <Toaster position="bottom-left" richColors/>
            <TrpcProvider>
              {children}
            </TrpcProvider>
          </div>
        </main>
      </body>
    </html>
  );
}
