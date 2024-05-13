import { response } from '@utils/response';

export async function handler() {
  return response(200, { hello: 'world' });
}
