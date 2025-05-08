import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileText } from 'lucide-react';

const DispositionDialog = ({
  dispositionDialogOpen,
  setDispositionDialogOpen,
  selectedAppointment,
  disposition,
  setDisposition,
  dispositionNotes,
  setDispositionNotes,
  therapistNoteText,
  setTherapistNoteText,
  handleSaveDisposition
}) => {
  // New state for insurance verification question
  const [verifyInsurance, setVerifyInsurance] = useState(null); // null, "yes", "no"
  
  // New state for modality and diagnosis
  const [modality, setModality] = useState("none"); 
  const [diagnosisCode, setDiagnosisCode] = useState("none"); // Initialize with "none"
  const [openDiagnosisPopover, setOpenDiagnosisPopover] = useState(false);

  // Diagnosis codes (placeholder data)
  const diagnosisCodes = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "carrot", label: "Carrot" },
    { value: "orange", label: "Orange" }
  ];

  // Reset additional fields when disposition changes
  const handleDispositionChange = (value) => {
    setDisposition(value);
    if (value !== "FFS booked") {
      setVerifyInsurance(null);
      setModality("none");
      setDiagnosisCode("none");
    }
  };

  return (
    <Dialog open={dispositionDialogOpen} onOpenChange={setDispositionDialogOpen}>
      <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader className="sticky top-0 bg-white z-10 pb-2">
          <DialogTitle className="text-lg font-semibold text-blue-900">Record Outcome & Notes</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            For session with {selectedAppointment?.patientName}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Disposition Section */}
          <div className="space-y-1">
            <Label htmlFor="disposition" className="text-sm font-medium text-gray-700">
              Disposition
            </Label>
            <Select value={disposition} onValueChange={handleDispositionChange}>
              <SelectTrigger id="disposition" className="text-sm focus:ring-blue-500">
                <SelectValue placeholder="Select disposition (optional if adding note)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no disposition" className="text-sm text-gray-500 italic">-- No Disposition --</SelectItem>
                <SelectItem value="ringing and LVM" className="text-sm">Ringing and LVM</SelectItem>
                <SelectItem value="FFS booked" className="text-sm">FFS Booked</SelectItem>
                <SelectItem value="No show" className="text-sm">No Show</SelectItem>
                <SelectItem value="Rescheduled" className="text-sm">Rescheduled</SelectItem>
                <SelectItem value="Completed" className="text-sm">Completed</SelectItem>
                <SelectItem value="Technical Issues" className="text-sm">Technical Issues</SelectItem>
                <SelectItem value="Needs Follow-up" className="text-sm">Needs Follow-up</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Insurance Verification Question - Only show when FFS booked is selected */}
          {disposition === "FFS booked" && (
            <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
              <div className="flex items-center gap-8 justify-between">
                <Label className="text-sm font-medium text-blue-800 flex-shrink-0 flex-grow">
                  Should we go ahead with their insurance verification?
                </Label>
                <RadioGroup 
                  value={verifyInsurance} 
                  onValueChange={setVerifyInsurance}
                  className="flex gap-8 flex-shrink-0"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="verification-yes" />
                    <Label htmlFor="verification-yes" className="text-sm">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="verification-no" />
                    <Label htmlFor="verification-no" className="text-sm">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Additional fields when verification is "yes" */}
          {disposition === "FFS booked" && verifyInsurance === "yes" && (
            <div className="p-3 bg-blue-50/50 rounded-md border border-blue-100">
              <div className="grid grid-cols-2 gap-8">
                {/* Modality Dropdown */}
                <div className="space-y-1">
                  <Label htmlFor="modality" className="text-sm font-medium text-gray-700">
                    Modality (Optional)
                  </Label>
                  <Select value={modality} onValueChange={setModality}>
                    <SelectTrigger id="modality" className="text-sm focus:ring-blue-500 bg-white h-9">
                      <SelectValue placeholder="Select modality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none" className="text-sm text-gray-500 italic">-- Select --</SelectItem>
                      <SelectItem value="individual" className="text-sm">Individual</SelectItem>
                      <SelectItem value="couple" className="text-sm">Couple</SelectItem>
                      <SelectItem value="group" className="text-sm">Group</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Primary Diagnosis Code - Regular Dropdown */}
                <div className="space-y-1">
                  <Label htmlFor="diagnosis" className="text-sm font-medium text-gray-700">
                    Primary Diagnosis Code (Optional)
                  </Label>
                  <Select value={diagnosisCode} onValueChange={setDiagnosisCode}>
                    <SelectTrigger id="diagnosis" className="text-sm focus:ring-blue-500 bg-white h-9">
                      <SelectValue placeholder="Select diagnosis code" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none" className="text-sm text-gray-500 italic">-- Select --</SelectItem>
                      <SelectItem value="apple" className="text-sm">Apple</SelectItem>
                      <SelectItem value="banana" className="text-sm">Banana</SelectItem>
                      <SelectItem value="carrot" className="text-sm">Carrot</SelectItem>
                      <SelectItem value="orange" className="text-sm">Orange</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Disposition Notes Section */}
          <div className="space-y-1">
            <Label htmlFor="disposition-notes" className="text-sm font-medium text-gray-700">
              Disposition Notes
            </Label>
            <Textarea
              id="disposition-notes"
              placeholder="Add brief notes related to the disposition..."
              value={dispositionNotes}
              onChange={(e) => setDispositionNotes(e.target.value)}
              className="min-h-[60px] text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Therapist Confidential Notes Section */}
          <div className="space-y-1 border-t pt-3 mt-2 border-dashed border-slate-300">
            <Label
              htmlFor="therapist-notes"
              className="text-sm font-medium text-indigo-700 flex items-center gap-1.5"
            >
              <FileText className="h-4 w-4" /> Confidential Therapist Note
            </Label>
            <p className="text-xs text-slate-500">
              This note is confidential and linked to this session.
            </p>
            <Textarea
              id="therapist-notes"
              placeholder="Add confidential notes for your records..."
              value={therapistNoteText}
              onChange={(e) => setTherapistNoteText(e.target.value)}
              className="min-h-[100px] text-sm focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-50/30"
            />
          </div>
        </div>
        <DialogFooter className="sticky bottom-0 bg-white z-10 pt-2 border-t">
          <Button size="sm" variant="outline" onClick={() => setDispositionDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSaveDisposition}
            className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
            // Enable save if EITHER disposition is selected OR therapist note has text
            disabled={!disposition && !therapistNoteText.trim()}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DispositionDialog;