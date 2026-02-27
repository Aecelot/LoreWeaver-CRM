import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { ExportDialog, ImportDialog } from '@/components/settings';
import { initializeDefaultPipelines } from '@/lib/firestore';
import { Download, Upload, User, Database, GitBranch } from 'lucide-react';

export const Settings: React.FC = () => {
  const { user } = useAuth();
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [initializingPipelines, setInitializingPipelines] = useState(false);
  const [pipelinesInitialized, setPipelinesInitialized] = useState(false);

  const handleInitializePipelines = async () => {
    setInitializingPipelines(true);
    try {
      await initializeDefaultPipelines();
      setPipelinesInitialized(true);
    } catch (error) {
      console.error('Failed to initialize pipelines:', error);
      alert('Failed to initialize pipelines. They may already exist.');
    } finally {
      setInitializingPipelines(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile
            </CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {user?.photoURL && (
              <div className="flex justify-center">
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Profile'}
                  className="h-20 w-20 rounded-full"
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium">Name</label>
              <p className="text-muted-foreground">{user?.displayName || 'Not set'}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Role</label>
              <p className="text-muted-foreground capitalize">{user?.role}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Management
            </CardTitle>
            <CardDescription>Import and export your leads data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Export</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Export all your leads or filter by type. The export includes contact information,
                pipeline status, and all custom fields.
              </p>
              <Button onClick={() => setShowExportDialog(true)}>
                <Download className="h-4 w-4 mr-2" />
                Export Leads
              </Button>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-2">Import</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Import leads from an Excel or CSV file. Required columns: Name, Contact Email.
              </p>
              <Button variant="outline" onClick={() => setShowImportDialog(true)}>
                <Upload className="h-4 w-4 mr-2" />
                Import Leads
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Pipeline Setup
          </CardTitle>
          <CardDescription>Initialize default pipeline stages</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            Create the default Studio and Investor pipelines with predefined stages.
            Only run this once when setting up the CRM.
          </p>
          <Button
            onClick={handleInitializePipelines}
            disabled={initializingPipelines || pipelinesInitialized}
          >
            {initializingPipelines
              ? 'Initializing...'
              : pipelinesInitialized
              ? 'Pipelines Created'
              : 'Initialize Pipelines'}
          </Button>
        </CardContent>
      </Card>

      <ExportDialog open={showExportDialog} onOpenChange={setShowExportDialog} />
      <ImportDialog open={showImportDialog} onOpenChange={setShowImportDialog} />
    </div>
  );
};
