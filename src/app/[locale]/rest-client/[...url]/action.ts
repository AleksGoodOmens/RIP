import { sendUniversalRequest } from '@/lib/api-request';
import { decodeToString } from '@/lib/utils';

interface Props {
  urlBase64: string;
  method: string;
  headersBase64: string;
  bodyBase64: string;
  uid: string;
}

export const getResponse = async ({ urlBase64, method, headersBase64, bodyBase64, uid }: Props) => {
  const decodedUrl = decodeToString(urlBase64);
  const decodedHeaders = await JSON.parse(decodeToString(headersBase64));
  const decodedBody = decodeToString(bodyBase64);

  try {
    const response = await sendUniversalRequest({
      url: decodedUrl,
      method,
      headers: decodedHeaders,
      body: decodedBody,
      base64: { headers: headersBase64, body: bodyBase64 },
      uid,
    });

    return response;
  } catch (err) {
    if (err instanceof Error) {
      return {
        status: 0,
        body: err.message,
      };
    }
  }
};
