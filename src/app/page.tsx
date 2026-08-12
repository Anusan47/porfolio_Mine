import Hero from "@/components/home/hero"
import Experience from "@/components/home/experience"
import Dashboard from "@/components/home/dashboard";
import Projects from "@/components/home/projects"
import Earth from "@/components/home/earth"
import { BlurFade } from "@/components/ui/blur-fade";
import { getObsessionPhotos } from "@/lib/sunsets";
import { data } from "@/data/data";

const BLUR_FADE_DELAY = 0.005;

export default async function Home() {
  const row1 = await getObsessionPhotos(data.obsessionsRow1);
  const row2 = await getObsessionPhotos(data.obsessionsRow2);

  return (
    <div className="relative min-h-screen w-full bg-background">
      <div className="mx-auto flex max-w-5xl flex-col space-y-12 sm:space-y-32 px-4">
        <BlurFade delay={BLUR_FADE_DELAY} inView>
          <section id="hero">
            <Hero />
          </section>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 2} inView>
          <section id="dashboard">
            <Dashboard />
          </section>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 3} inView>
          <section id="projects">
            <Projects />
          </section>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY} inView>
          <section id="experience">
            <Experience />
          </section>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY} inView>
          <section id="earth">
            <Earth photosRow1={row1} photosRow2={row2} />
          </section>
        </BlurFade>
      </div>
    </div>
  );
}
