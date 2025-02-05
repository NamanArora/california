import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, AlertTriangle } from 'lucide-react';

interface InstructionStepProps {
  number: number;
  title: string;
  description: string;
}

interface ZoomSessionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onStartSession: (url: string) => Promise<void>;
}

const InstructionStep: React.FC<InstructionStepProps> = ({ number, title, description }) => (
  <div className="flex items-start gap-4 p-4">
    <div className="space-y-1">
      <h3 className="font-semibold text-gray-900">Step {number}: {title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const ZoomSessionDialog: React.FC<ZoomSessionDialogProps> = ({ 
  isOpen, 
  onClose,
  onStartSession 
}) => {
  const [zoomUrl, setZoomUrl] = useState<string>('');
  const [isValidUrl, setIsValidUrl] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateZoomUrl = (url: string): boolean => {
    // Basic validation for zoom.us URLs
    const zoomRegex = /^https?:\/\/[^\/]*zoom\.us\//i;
    return zoomRegex.test(url);
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateZoomUrl(zoomUrl)) {
      setIsValidUrl(false);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onStartSession(zoomUrl);
      onClose();
    } catch (error) {
      console.error('Error starting session:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setZoomUrl(e.target.value);
    setIsValidUrl(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Start Zoom Session</DialogTitle>
        </DialogHeader>
        
        {/* Instructions */}
        <div className="border rounded-lg bg-gray-50 mb-6">
          <InstructionStep 
            number={1}
            title="Paste Zoom Link"
            description="Copy your Zoom meeting invite link and paste it in the input field below, then click Submit."
          />
          <div className="h-px bg-gray-200" />
          <InstructionStep 
            number={2}
            title="AI Assistant Joins"
            description="Our AI assistant will automatically join the call. If you don't see the assistant, please verify the Zoom URL and try again."
          />
          <div className="h-px bg-gray-200" />
          <InstructionStep 
            number={3}
            title="Access Reports"
            description="Once the session is complete, your detailed reports and analysis will be available in this dashboard."
          />
        </div>

        {/* Input section */}
        <div className="space-y-4">
          <div>
            <Input
              placeholder="Enter Zoom meeting URL"
              value={zoomUrl}
              onChange={handleInputChange}
              className={!isValidUrl ? 'border-red-500' : ''}
            />
            {!isValidUrl && (
              <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>Please enter a valid Zoom meeting URL eg: https://www.zoom.us/xyz123</span>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting || !zoomUrl}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Starting Session...
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ZoomSessionDialog;