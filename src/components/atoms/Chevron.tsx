type TChevronProps = {
  direction: 'up' | 'down';
};

export function Chevron({ direction }: TChevronProps) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      style={{ transform: direction === 'up' ? 'rotate(180deg)' : undefined }}
    >
      <path d="M2 4L7 10L12 4H2Z" fill="var(--color-accent)" />
    </svg>
  );
}
