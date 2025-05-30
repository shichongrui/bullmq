import { createHash } from 'crypto';

export function createRepeatableJobKey(
  jobName: string,
  jobId: string,
  endDate: string,
  tz: string,
  suffix: number,
): string {
  return `${jobName}:${jobId}:${endDate}:${tz}:${suffix}`;
}

export function getRepeatableJobKeyPrefix(
  prefix: string,
  queueName: string,
): string {
  return `${prefix}:${queueName}:repeat:`;
}

export function extractRepeatableJobChecksumFromRedisKey(
  redisKey: string,
): string {
  return redisKey.split(':')[3];
}

export function hash(repeatKeyHashAlgorithm: string, payload: string): string {
  return createHash(repeatKeyHashAlgorithm).update(payload).digest('hex');
}

export function getRepeatJobIdCheckum(
  repeatJobKey: string,
  repeatKeyHashAlgorithm: string,
): string {
  return hash(repeatKeyHashAlgorithm, repeatJobKey);
}
