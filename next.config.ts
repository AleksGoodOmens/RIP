import path from 'path';
import { fileURLToPath } from 'url';

import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
