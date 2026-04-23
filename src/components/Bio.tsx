import Link from "next/link";

export default function Bio() {
  return (
    <section className="mb-10">
      {/* Name + date */}
      <p className="text-sm font-medium text-foreground">Sahil Rana</p>
      <p className="text-sm text-muted-foreground mb-5">Design Engineer</p>

      {/* Bio paragraphs — replace with your own */}
      <div className="space-y-4 text-sm leading-[1.7] text-foreground/85">
        <p>Good design speaks. Great design shouts.</p>
        <p>
          Based in Chandigarh, India, I work at the intersection of design and
          engineering, building products that feel considered and intentional. I
          care deeply about the craft — the weight of a transition, the feel of
          a layout, and the sound of a click.
        </p>
        <p>
          Powered by Diet Coke and coffee, I am exploring what it means to make
          software that feels as good as it works.
        </p>
        <p>
          Currently building{" "}
          <Link
            target="_blank"
            href="https://www.odysseyui.com/"
            className="underline decoration-wavy underline-offset-3 decoration-[#f8b304]/75 hover:decoration-[#f8b304] transition-colors"
          >
            @odysseyui
          </Link>
          . You can find me on{" "}
          <Link
            target="_blank"
            href="https://x.com/ctrlcat0x"
            className="underline decoration-wavy underline-offset-3 decoration-[#f8b304]/75 hover:decoration-[#f8b304] transition-colors"
          >
            X
          </Link>
          , or reach me via{" "}
          <Link
            target="_blank"
            href="mailto:developer.sahilrana@gmail.com"
            className="underline decoration-wavy underline-offset-3 decoration-[#f8b304]/75 hover:decoration-[#f8b304] transition-colors"
          >
            email
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
