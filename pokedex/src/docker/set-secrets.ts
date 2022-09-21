import * as fs from 'fs';

const setSecrets = () => {
  const mongodbUrl = fs
    .readFileSync(process.env.MONGODB_URL_FILE_PATH!, 'utf-8')
    .trim();
  process.env.MONGODB_URL = mongodbUrl;
};

if (['production-docker', 'development-docker'].includes(process.env.NODE_ENV!))
  setSecrets();
