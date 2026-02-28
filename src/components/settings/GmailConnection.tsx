import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGmail } from '@/hooks/useGmail';
import { Mail, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export const GmailConnection: React.FC = () => {
  const { status, loading, connecting, connect, disconnect } = useGmail();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Gmail Connection
        </CardTitle>
        <CardDescription>
          Connect your Gmail account to send email sequences
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Checking connection status...
          </div>
        ) : status.connected ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Connected</span>
            </div>
            <div className="space-y-1 text-sm">
              <div>
                <span className="text-muted-foreground">Account: </span>
                <span className="font-medium">{status.email}</span>
              </div>
              {status.connectedAt && (
                <div>
                  <span className="text-muted-foreground">Connected: </span>
                  <span>
                    {formatDistanceToNow(new Date(status.connectedAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              )}
            </div>
            <Button variant="outline" onClick={disconnect}>
              Disconnect Gmail
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <XCircle className="h-5 w-5" />
              <span>Not connected</span>
            </div>
            {status.error && (
              <p className="text-sm text-red-500">{status.error}</p>
            )}
            <p className="text-sm text-muted-foreground">
              Connect your Gmail account to enable email sequences. This allows
              the CRM to send emails on your behalf and track replies.
            </p>
            <Button onClick={connect} disabled={connecting}>
              {connecting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Connect Gmail
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
