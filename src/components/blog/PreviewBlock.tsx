interface PreviewBlockProps {
  children: React.ReactNode;
  caption?: string;
}

/**
 * PreviewBlock — a bordered demo area for showcasing components or
 * interactive pieces. Used inline in MDX posts like:
 *
 *   <PreviewBlock caption="Press and hold to see the transition.">
 *     <HoldToDeleteButton />
 *   </PreviewBlock>
 */
export default function PreviewBlock({ children, caption }: PreviewBlockProps) {
  return (
    <figure className="my-8">
      <div className="flex min-h-48 items-center justify-center rounded-xl border border-border bg-muted/20 p-8">
        {children}
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
