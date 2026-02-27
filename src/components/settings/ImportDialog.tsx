import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useImport } from '@/hooks/useImport';
import { useAuth } from '@/contexts/AuthContext';
import { usePipeline } from '@/hooks/usePipeline';
import { Upload, FileSpreadsheet, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ImportDialog: React.FC<ImportDialogProps> = ({ open, onOpenChange }) => {
  const { user } = useAuth();
  const { pipelines } = usePipeline();
  const { loadPreview, importLeads, clearPreview, preview, isImporting, error } = useImport();
  const [file, setFile] = useState<File | null>(null);
  const [importResult, setImportResult] = useState<{ success: number; failed: number; errors: string[] } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setImportResult(null);

    try {
      await loadPreview(selectedFile);
    } catch {
      // Error is handled in useImport
    }
  };

  const handleImport = async () => {
    if (!user || !preview.length) return;

    // Get default pipeline and stage
    const defaultPipeline = pipelines.find((p) => p.type === 'studio');
    const defaultStageId = defaultPipeline?.stages[0]?.id || 'new-lead';
    const defaultPipelineId = defaultPipeline?.id || 'default';

    const result = await importLeads(preview, user.uid, defaultPipelineId, defaultStageId);
    setImportResult(result);

    if (result.success > 0) {
      clearPreview();
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClose = () => {
    clearPreview();
    setFile(null);
    setImportResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onOpenChange(false);
  };

  const validLeads = preview.filter((l) => l.name && l.contact.email);
  const invalidLeads = preview.filter((l) => !l.name || !l.contact.email);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Import Leads
          </DialogTitle>
          <DialogDescription>
            Upload an Excel or CSV file to import leads.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* File Upload */}
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <FileSpreadsheet className="h-12 w-12 text-muted-foreground mb-2" />
              <span className="text-sm font-medium">
                {file ? file.name : 'Click to upload or drag and drop'}
              </span>
              <span className="text-xs text-muted-foreground">
                Excel (.xlsx, .xls) or CSV files
              </span>
            </label>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-start gap-2">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Preview */}
          {preview.length > 0 && !importResult && (
            <div className="space-y-3">
              <h4 className="font-medium">Preview ({preview.length} rows)</h4>

              {invalidLeads.length > 0 && (
                <div className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 p-3 rounded-md text-sm">
                  <strong>{invalidLeads.length}</strong> row(s) are missing required fields (name or email) and will be skipped.
                </div>
              )}

              <div className="max-h-48 overflow-y-auto border rounded-md">
                <table className="w-full text-sm">
                  <thead className="bg-muted sticky top-0">
                    <tr>
                      <th className="text-left p-2">Name</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-left p-2">Email</th>
                      <th className="text-left p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.slice(0, 10).map((lead, i) => (
                      <tr key={i} className={`border-t ${!lead.name || !lead.contact.email ? 'text-muted-foreground' : ''}`}>
                        <td className="p-2">{lead.name || <span className="text-destructive">Missing</span>}</td>
                        <td className="p-2 capitalize">{lead.type}</td>
                        <td className="p-2">{lead.contact.email || <span className="text-destructive">Missing</span>}</td>
                        <td className="p-2">{lead.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {preview.length > 10 && (
                  <p className="p-2 text-xs text-muted-foreground text-center border-t">
                    ...and {preview.length - 10} more rows
                  </p>
                )}
              </div>

              <div className="bg-muted p-3 rounded-md">
                <p className="text-sm">
                  <strong>{validLeads.length}</strong> lead(s) will be imported.
                </p>
              </div>
            </div>
          )}

          {/* Import Result */}
          {importResult && (
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                {importResult.success > 0 && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span>{importResult.success} imported</span>
                  </div>
                )}
                {importResult.failed > 0 && (
                  <div className="flex items-center gap-2 text-destructive">
                    <XCircle className="h-5 w-5" />
                    <span>{importResult.failed} failed</span>
                  </div>
                )}
              </div>

              {importResult.errors.length > 0 && (
                <div className="max-h-32 overflow-y-auto bg-destructive/10 p-3 rounded-md">
                  <p className="text-sm font-medium text-destructive mb-2">Errors:</p>
                  <ul className="text-xs text-destructive space-y-1">
                    {importResult.errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Template Download */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Required columns: <strong>Name</strong>, <strong>Contact Email</strong>
            </p>
            <p>
              Optional: Type, Status, Priority, Contact Name, Phone, Website, Country, Location, Tags
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose}>
            {importResult?.success ? 'Done' : 'Cancel'}
          </Button>
          {preview.length > 0 && !importResult && (
            <Button onClick={handleImport} disabled={isImporting || validLeads.length === 0}>
              <Upload className="h-4 w-4 mr-2" />
              {isImporting ? 'Importing...' : `Import ${validLeads.length} Lead${validLeads.length !== 1 ? 's' : ''}`}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
