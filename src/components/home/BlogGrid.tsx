import Link from "next/link";
import Tilt from "@/components/home/Tilt";
import { getAllPosts } from "@/lib/posts";

const categories: Record<string, string> = {
  "core-css-javascript": "Engineering",
  "stop-worrying-love-ui-animation": "Motion design",
};

export default function BlogGrid() {
  const posts = getAllPosts();

  return (
    <section
      aria-labelledby="blogs-title"
      className="bg-[#fdfdfd] px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex items-start justify-center gap-3 text-center sm:mb-16">
          <h2
            id="blogs-title"
            className="text-5xl font-medium leading-none tracking-[-0.05em] sm:text-6xl"
          >
            BLOGS
          </h2>
          <span className="pt-1 text-sm tabular-nums text-[#77756c]">
            [{String(posts.length).padStart(2, "0")}]
          </span>
        </div>

        <div
          className={`grid gap-x-4 gap-y-12 ${
            posts.length === 1
              ? "mx-auto max-w-md"
              : posts.length === 2
                ? "sm:grid-cols-2"
                : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {posts.map((post, index) => (
            <article key={post.slug}>
              <Tilt className="rounded-2xl" rotationFactor={7}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  <div
                    className={`relative flex aspect-[4/3] items-end overflow-hidden rounded-2xl p-6 ring-1 ring-black/10 sm:p-8 ${
                      index % 3 === 0
                        ? "bg-[#c8dfff]"
                        : index % 3 === 1
                          ? "bg-[#f1c5e2]"
                          : "bg-[#d8e8bd]"
                    }`}
                  >
                    <div className="absolute inset-0 blog-grid-texture opacity-60 transition-transform duration-300 group-hover:scale-[1.03]" />
                    <p className="relative max-w-[12ch] text-[clamp(2rem,3vw,3rem)] font-medium leading-[0.92] tracking-[-0.045em]">
                      {post.title}
                    </p>
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-medium leading-tight tracking-tight group-hover:underline">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#77756c]">
                      {categories[post.slug] ?? "Writing"}
                    </p>
                  </div>
                </Link>
              </Tilt>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
