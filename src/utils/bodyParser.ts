type Body = Record<string, any>;

export function bodyParser(body: string | undefined): Body {
  let parsedBody = {};
  try {
    if (!body) {
      return parsedBody;
    }
    parsedBody = JSON.parse(body);
  } catch (error) {
    throw new Error('Error parsing');
  }

  return parsedBody;
}
