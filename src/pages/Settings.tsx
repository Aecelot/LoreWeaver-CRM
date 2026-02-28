import React, { useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { ExportDialog, ImportDialog, TagManager } from '@/components/settings';
import { initializeDefaultPipelines, migrateLeadsWithCreatedBy } from '@/lib/firestore';
import { Download, Upload, User, Database, GitBranch, Wrench } from 'lucide-react';

export const Settings: React.FC = () => {
  const { user } = useAuth();
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [initializingPipelines, setInitializingPipelines] = useState(false);
  const [pipelinesInitialized, setPipelinesInitialized] = useState(false);
  const [migrating, setMigrating] = useState(false);
  const [migrationResult, setMigrationResult] = useState<{ updated: number; skipped: number } | null>(null);

  const handleInitializePipelines = async () => {
    setInitializingPipelines(true);
    try {
      await initializeDefaultPipelines();
      setPipelinesInitialized(true);
      toast.success('Pipelines initialized successfully');
    } catch {
      toast.error('Failed to initialize pipelines. They may already exist.');
    } finally {
      setInitializingPipelines(false);
    }
  };

  const handleMigration = async () => {
    if (!user?.uid) return;
    setMigrating(true);
    try {
      const result = await migrateLeadsWithCreatedBy(user.uid);
      setMigrationResult(result);
      if (result.updated > 0) {
        toast.success(`Migration complete: ${result.updated} leads updated`);
      } else {
        toast.info('No leads needed migration');
      }
    } catch {
      toast.error('Migration failed');
    } finally {
      setMigrating(false);
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

      <TagManager />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Data Migration
          </CardTitle>
          <CardDescription>Fix leads missing ownership data</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            Migrate existing leads to add your user ID as the owner. This is required
            for leads created before the security update. Run once to fix visibility issues.
          </p>
          {migrationResult && (
            <p className="text-sm text-green-600 mb-3">
              Last migration: {migrationResult.updated} updated, {migrationResult.skipped} already migrated
            </p>
          )}
          <Button
            onClick={handleMigration}
            disabled={migrating}
            variant="outline"
          >
            {migrating ? 'Migrating...' : 'Run Migration'}
          </Button>
        </CardContent>
      </Card>

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
