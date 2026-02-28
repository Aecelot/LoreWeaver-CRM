import { useState, useEffect, useCallback } from 'react';
import type { GmailStatus } from '@/types';

// Firebase Functions base URL
const FUNCTIONS_BASE_URL = import.meta.env.PROD
  ? 'https://us-central1-loreweaver-crm.cloudfunctions.net'
  : 'http://127.0.0.1:5001/loreweaver-crm/us-central1';

export function useGmail() {
  const [status, setStatus] = useState<GmailStatus>({ connected: false });
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);

  const checkStatus = useCallback(async () => {
    try {
      const response = await fetch(`${FUNCTIONS_BASE_URL}/gmailStatus`);
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error('Error checking Gmail status:', error);
      setStatus({ connected: false, error: 'Failed to check connection status' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkStatus();

    // Check for callback status in URL
    const params = new URLSearchParams(window.location.search);
    const gmailStatus = params.get('gmail');
    if (gmailStatus === 'connected') {
      checkStatus();
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    } else if (gmailStatus === 'error') {
      setStatus({ connected: false, error: 'Failed to connect Gmail' });
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [checkStatus]);

  const connect = useCallback(async () => {
    setConnecting(true);
    try {
      const response = await fetch(`${FUNCTIONS_BASE_URL}/gmailAuthUrl`);
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No auth URL received');
      }
    } catch (error) {
      console.error('Error getting auth URL:', error);
      setStatus({ connected: false, error: 'Failed to start connection' });
      setConnecting(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      const response = await fetch(`${FUNCTIONS_BASE_URL}/gmailDisconnect`, {
        method: 'POST',
      });
      const data = await response.json();
      if (data.success) {
        setStatus({ connected: false });
      } else {
        throw new Error('Failed to disconnect');
      }
    } catch (error) {
      console.error('Error disconnecting Gmail:', error);
    }
  }, []);

  return {
    status,
    loading,
    connecting,
    connect,
    disconnect,
    refresh: checkStatus,
  };
}
