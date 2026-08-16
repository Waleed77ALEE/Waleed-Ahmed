import { useState, useEffect } from 'react';
import { remoteConfig } from '../lib/remoteConfig';

export function useRemoteConfig(key: string, defaultValue: string): string {
  const [value, setValue] = useState<string>(() => {
    return remoteConfig.getString(key) || defaultValue;
  });

  useEffect(() => {
    remoteConfig.fetchAndActivate().then(() => {
      setValue(remoteConfig.getString(key) || defaultValue);
    });

    const handleStorage = () => {
      setValue(remoteConfig.getString(key) || defaultValue);
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key, defaultValue]);

  return value;
}
