import { Link } from '@/i18n/navigation';
import { HistoryItem } from '@/interfaces';
import { encodeTo64 } from '@/lib/utils';

import { Text } from '../text/Text';
import { Button } from '../ui';

interface Props {
  history: HistoryItem[];
}

export const HistoryFull = ({ history }: Props) => {
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (ms: number) => {
    return ms.toFixed(2) + ' ms';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-600';
    if (status >= 300 && status < 400) return 'text-blue-600';
    if (status >= 400 && status < 500) return 'text-yellow-600';
    if (status >= 500) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-4">
      {history.map((item) => {
        const method = item.metrics.method;
        const urlBase64 = encodeTo64(item.metrics.url);
        const headersBase64 = item.base64.headers;
        const bodyBase64 = item.base64.body;

        return (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg p-4 hover:bg-accent	 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded text-sm font-mono font-bold ${
                    method === 'GET'
                      ? 'bg-blue-300 text-blue-800'
                      : method === 'POST'
                        ? 'bg-green-300 text-green-800'
                        : method === 'PUT'
                          ? 'bg-yellow-300 text-yellow-800'
                          : method === 'DELETE'
                            ? 'bg-red-300 text-red-800'
                            : 'bg-gray-300 text-gray-800'
                  }`}
                >
                  {method}
                </span>
                <span className={`font-bold ${getStatusColor(item.metrics.statusCode)}`}>
                  {item.metrics.statusCode}
                </span>
              </div>
              <span className="text-sm text-gray-500">{formatDate(item.metrics.timestamp)}</span>
            </div>

            <div className="mb-3">
              <Text as="h3" className="font-semibold truncate">
                {item.metrics.url}
              </Text>
              <p className="text-sm text-gray-600">{item.metrics.endpoint}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm mb-4">
              <div>
                <span className="font-semibold">Duration:</span> {formatTime(item.metrics.duration)}
              </div>
              <div>
                <span className="font-semibold">Request:</span>{' '}
                {formatBytes(item.metrics.requestSize)}
              </div>
              <div>
                <span className="font-semibold">Response:</span>{' '}
                {formatBytes(item.metrics.responseSize)}
              </div>
            </div>

            <div className="flex justify-end">
              <Button asChild variant="outline" size="sm">
                <Link href={`/rest-client/${method}/${urlBase64}/${headersBase64}/${bodyBase64}`}>
                  Execute Again
                </Link>
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
