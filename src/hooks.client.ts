export const handleError = ({ error }: { error: unknown }) => {
  console.error('[temple]', error);
  return { message: 'An unexpected error occurred.' };
};
