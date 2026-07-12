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
      <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
