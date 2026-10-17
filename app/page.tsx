import { Hero } from "@/components/site/hero";
import { AboutTimeline } from "@/components/site/about-timeline";
import { WorkStack } from "@/components/site/work-stack";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <AboutTimeline />
      <WorkStack />
    </main>
  );
}
