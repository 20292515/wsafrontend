import { Inter } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { getServerSession } from 'next-auth';
import ProviderWrapper from "@/app/ProviderWrapper"

config.autoAddCss = false;
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WSI Application Framework",
  description: "Customisable application framework for WSI",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderWrapper session={session}>
        {children}
        </ProviderWrapper>
      </body>
    </html>
  );
}
