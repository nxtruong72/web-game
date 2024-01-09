import * as CryptoJS from 'crypto-js';
import * as fs from 'fs';
import * as path from 'path';
const { argv } = require('yargs');

try {
  let appConfigFilePath = '';
  if (argv.file.startsWith('src')) {
    appConfigFilePath = path.join(process.env['INIT_CWD'] as string, argv.file);
  } else {
    appConfigFilePath = argv.file;
  }
  const appConfig = JSON.parse(fs.readFileSync(appConfigFilePath, 'utf8'));
  const data = CryptoJS.AES.decrypt(appConfig.data, argv.encryptionKey as string).toString(CryptoJS.enc.Utf8);
  console.info(data);
} catch (error) {
  console.error('Error:', error);
}
