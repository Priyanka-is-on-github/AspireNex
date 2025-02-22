import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import FireFliesBackground from "./components/FireFliesBackground";
import Sound from '../app/components/Sound'

const inter = Inter({ subsets: ["latin"],variable:"--font-inter", });

export const metadata = {
  title: "Personal_Portfolio",
  description: "As a Computer Science student, I've crafted this portfolio using Next.js to showcase my skills in frontend development. Dive into my projects and explore how I'm shaping my career in web development.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={clsx(inter.variable, 'bg-background text-foreground font-inter')}>
        {children}
          <FireFliesBackground/>
          <Sound/>
          <div id="my-modal"/>
      </body>
    </html>
  );
}
