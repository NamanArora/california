import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, AlertTriangle } from 'lucide-react';

const ZoomSessionDialog = ({ 
  isOpen, 
  onClose,
  onStartSession 
}) => {
  const [zoomUrl, setZoomUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateZoomUrl = (url) => {
    // Basic validation for zoom.us URLs
    const zoomRegex = /^https?:\/\/[^\/]*zoom\.us\//i;
    return zoomRegex.test(url);
  };

  const handleSubmit = async () => {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Start Zoom Session</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Input
              placeholder="Enter Zoom meeting URL"
              value={zoomUrl}
              onChange={(e) => {
                setZoomUrl(e.target.value);
                setIsValidUrl(true);
              }}
              className={!isValidUrl ? 'border-red-500' : ''}
            />
            {!isValidUrl && (
              <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>Please enter a valid Zoom meeting URL</span>
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
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Starting Session...
                </>
              ) : (
                'Start Session'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ZoomSessionDialog;