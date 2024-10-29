import { Button } from "~/components/Button";

interface Props {
  setPage: (page: number) => void;
}
export const LandingPage = ({ setPage }: Props) => (
  <section className="flex h-full w-full flex-col items-center justify-center space-y-8">
    <div className="space-y-4">
      <h1 className="text-6xl">Daniel Sadler</h1>
      <h2>Full-Stack Developer</h2>
    </div>
  </section>
);
