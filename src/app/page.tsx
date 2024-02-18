import ShowPosts from "@/components/ShowPosts";
import Title from "@/components/Title";

export default function Home() {
  return (
    <section className="container m-auto">
      <Title />
      <ShowPosts />
    </section>
  );
}
