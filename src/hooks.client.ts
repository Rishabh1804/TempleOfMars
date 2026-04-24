// Client-side hooks. Theme + fs-base bootstrap happens in app.html
// before hydration to avoid FOUC. Nothing else to do here yet.
export const handleError = ({ error }: { error: unknown }) => {
  console.error('[temple]', error);
  return { message: 'An unexpected error occurred.' };
};
