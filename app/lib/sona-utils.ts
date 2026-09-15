/** Sona's class helper adapted for this project's CSS classes. */
export function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(' ');
}
