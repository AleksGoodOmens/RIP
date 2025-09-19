import { sendUniversalRequest } from '@/lib/api-request';
import { decodeToString } from '@/lib/utils';

interface Props {
  urlInBase64: string;
  method: string;
  headersBase64: string;
  bodyBase64: string;
}

export const getResponse = async ({ urlInBase64, method, headersBase64, bodyBase64 }: Props) => {
  const decodedUrl = decodeToString(urlInBase64);
  const decodedHeaders = await JSON.parse(decodeToString(headersBase64));
  const decodedBody = decodeToString(bodyBase64);

  try {
    const response = await sendUniversalRequest(decodedUrl, method, decodedHeaders, decodedBody);

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
