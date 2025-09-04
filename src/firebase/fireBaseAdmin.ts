import fs from 'fs';
import path from 'path';

import admin, { ServiceAccount } from 'firebase-admin';

const serviceAccountPath = path.resolve(process.cwd(), 'config/serviceAccountKey.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8')) as ServiceAccount;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export { admin };
