export async function response(
  statusCode: number,
  body: string | Record<string, any>,
) {
  return {
    statusCode,
    body: JSON.stringify(body),
  };
}
