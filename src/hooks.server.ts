export const handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  // Only set the header if it hasn't already been set
  if (!response.headers.has('x-frame-options')) {
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  }

  return response;
};