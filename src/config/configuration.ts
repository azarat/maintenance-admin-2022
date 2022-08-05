import { SecretsManager } from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

const sm = new SecretsManager({
  region: process.env.AWS_REGION,
});

const getSecret = async (secretName: string): Promise<string> => {
  const { SecretString } = await sm
    .getSecretValue({
      SecretId: process.env.SECRET_ID,
    })
    .promise();
  const secrets = JSON.parse(SecretString);
  return secrets[secretName];
};

export const configuration = async (): Promise<{ [key: string]: string }> => ({
  mongoUri: await getSecret('MONGO_URI'),
  jwtSecret: await getSecret('JWT_SECRET'),
  userSdkSecret: await getSecret('USER_SDK_SECRET'),
  userSdkUrl: await getSecret('USER_SDK_URL'),
  cockpitSecret: await getSecret('COCKTIT_SECRET'),
  cockpitUri: await getSecret('COCKPIT_URI'),
  qrSecret: await getSecret('QR_SECRET'),
});