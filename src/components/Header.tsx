import Image from "next/image";

export default function Header() {
  return (
    <header className="mb-12 flex items-center justify-center">
      <Image
        src="/hero.gif"
        alt="Hero Image"
        width={80}
        height={80}
        className="rounded-full object-cover size-20 transition duration-200 hover:rotate-10"
        unoptimized
        priority
      />
    </header>
  );
}
