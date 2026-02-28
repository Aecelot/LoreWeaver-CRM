import React, { useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useSequences, useLeadSequence } from '@/hooks/useSequences';
import { useGmail } from '@/hooks/useGmail';
import type { Lead, EmailEvent } from '@/types';
import {
  Mail,
  Play,
  Pause,
  Square,
  CheckCircle,
  MessageSquare,
  Clock,
  AlertCircle,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { Link } from 'react-router-dom';

interface LeadSequenceCardProps {
  lead: Lead;
}

export const LeadSequenceCard: React.FC<LeadSequenceCardProps> = ({ lead }) => {
  const { status: gmailStatus } = useGmail();
  const { sequences } = useSequences();
  const {
    sequenceStatus,
    loading,
    startSequence,
    pauseSequence,
    resumeSequence,
    stopSequence,
  } = useLeadSequence(lead.id);

  const [showStartDialog, setShowStartDialog] = useState(false);
  const [selectedSequenceId, setSelectedSequenceId] = useState('');
  const [starting, setStarting] = useState(false);

  const handleStartSequence = async () => {
    if (!selectedSequenceId) {
      toast.error('Please select a sequence');
      return;
    }

    const sequence = sequences.find((s) => s.id === selectedSequenceId);
    if (!sequence) return;

    const email = lead.contact?.email;
    if (!email) {
      toast.error('Lead has no email address');
      return;
    }

    setStarting(true);
    try {
      await startSequence(
        selectedSequenceId,
        sequence.name,
        email,
        lead.contact?.name || lead.name
      );
      toast.success('Sequence started');
      setShowStartDialog(false);
      setSelectedSequenceId('');
    } catch (error) {
      toast.error('Failed to start sequence');
      console.error(error);
    } finally {
      setStarting(false);
    }
  };

  const handlePause = async () => {
    try {
      await pauseSequence();
      toast.success('Sequence paused');
    } catch (error) {
      toast.error('Failed to pause sequence');
    }
  };

  const handleResume = async () => {
    try {
      await resumeSequence();
      toast.success('Sequence resumed');
    } catch (error) {
      toast.error('Failed to resume sequence');
    }
  };

  const handleStop = async () => {
    try {
      await stopSequence();
      toast.success('Sequence stopped');
    } catch (error) {
      toast.error('Failed to stop sequence');
    }
  };

  const getStatusIcon = () => {
    if (!sequenceStatus) return null;
    switch (sequenceStatus.status) {
      case 'active':
        return <Play className="h-4 w-4 text-green-500" />;
      case 'paused':
        return <Pause className="h-4 w-4 text-amber-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'replied':
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      case 'bounced':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    if (!sequenceStatus) return '';
    switch (sequenceStatus.status) {
      case 'active':
        return 'Active';
      case 'paused':
        return 'Paused';
      case 'completed':
        return 'Completed';
      case 'replied':
        return 'Replied';
      case 'bounced':
        return 'Bounced';
      default:
        return sequenceStatus.status;
    }
  };

  if (!gmailStatus.connected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Mail className="h-4 w-4" />
            Email Sequence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span>Connect Gmail in Settings to use sequences</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Mail className="h-4 w-4" />
            Email Sequence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Mail className="h-4 w-4" />
            Email Sequence
          </CardTitle>
          {sequenceStatus && (
            <CardDescription className="flex items-center gap-2">
              {getStatusIcon()}
              <span>{getStatusText()}</span>
              <span className="text-muted-foreground">•</span>
              <span>{sequenceStatus.sequenceName}</span>
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {sequenceStatus ? (
            <div className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>
                    {sequenceStatus.currentStep - 1} /{' '}
                    {sequenceStatus.history.length +
                      (sequenceStatus.status === 'active' ? 1 : 0)} emails sent
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{
                      width: `${Math.min(
                        ((sequenceStatus.currentStep - 1) / 5) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Email History */}
              {sequenceStatus.history.length > 0 && (
                <div className="space-y-2">
                  <span className="text-sm font-medium">History</span>
                  <div className="space-y-1">
                    {sequenceStatus.history.map((event: EmailEvent, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-sm py-1 border-b last:border-0"
                      >
                        <span className="text-muted-foreground">
                          Email {event.step}
                        </span>
                        <div className="flex items-center gap-3">
                          {event.opened && (
                            <span className="text-xs text-green-600">Opened</span>
                          )}
                          {event.clicked && (
                            <span className="text-xs text-blue-600">Clicked</span>
                          )}
                          {event.replied && (
                            <span className="text-xs text-green-600 font-medium">
                              Replied
                            </span>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {format(event.sentAt.toDate(), 'MMM d, HH:mm')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Next Send */}
              {sequenceStatus.status === 'active' && sequenceStatus.nextSendAt && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>
                    Next email{' '}
                    {formatDistanceToNow(sequenceStatus.nextSendAt.toDate(), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                {sequenceStatus.status === 'active' && (
                  <Button variant="outline" size="sm" onClick={handlePause}>
                    <Pause className="h-3 w-3 mr-1" />
                    Pause
                  </Button>
                )}
                {sequenceStatus.status === 'paused' && (
                  <Button variant="outline" size="sm" onClick={handleResume}>
                    <Play className="h-3 w-3 mr-1" />
                    Resume
                  </Button>
                )}
                {(sequenceStatus.status === 'active' ||
                  sequenceStatus.status === 'paused') && (
                  <Button variant="outline" size="sm" onClick={handleStop}>
                    <Square className="h-3 w-3 mr-1" />
                    Stop
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {!lead.contact?.email ? (
                <p className="text-sm text-muted-foreground">
                  Add an email address to start a sequence
                </p>
              ) : sequences.length === 0 ? (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    No sequences available
                  </p>
                  <Link to="/sequences">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Create Sequence
                    </Button>
                  </Link>
                </div>
              ) : (
                <Button size="sm" onClick={() => setShowStartDialog(true)}>
                  <Play className="h-3 w-3 mr-1" />
                  Start Sequence
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Start Sequence Dialog */}
      <Dialog open={showStartDialog} onOpenChange={setShowStartDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start Email Sequence</DialogTitle>
            <DialogDescription>
              Select a sequence to start for {lead.name}. Emails will be sent to{' '}
              {lead.contact?.email}.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Select value={selectedSequenceId} onValueChange={setSelectedSequenceId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a sequence" />
              </SelectTrigger>
              <SelectContent>
                {sequences.map((sequence) => (
                  <SelectItem key={sequence.id} value={sequence.id}>
                    {sequence.name} ({sequence.emails.length} emails)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStartDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleStartSequence} disabled={starting || !selectedSequenceId}>
              {starting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Start Sequence
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
