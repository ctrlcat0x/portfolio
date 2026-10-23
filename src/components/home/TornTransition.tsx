import Image from "next/image";

export default function TornTransition({
  direction,
}: {
  direction: "top" | "bottom";
}) {
  const isTop = direction === "top";

  return (
    <div
      className={`relative z-10 overflow-hidden ${isTop ? "-mt-[clamp(1rem,2.5vw,2.5rem)] bg-[#111]" : "bg-[#111]"}`}
      aria-hidden="true"
    >
      <Image
        src={isTop ? "/torn paper top.png" : "/torn paper bottom.png"}
        alt=""
        width={2900}
        height={556}
        sizes="100vw"
        className={`block h-auto w-full ${isTop ? "-scale-x-100" : ""}`}
      />
    </div>
  );
}
