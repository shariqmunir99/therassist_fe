"use client";

import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  AudioLines,
  Trash2,
  AlertTriangle,
  X,
  CheckCircle,
  XCircle,
  Loader2,
  CalendarIcon,
} from "lucide-react";
import { toast } from "sonner";
import axios, { CancelTokenSource, AxiosProgressEvent } from "axios";
import { Client } from "@/modules/client/models/Client";
import { useUploadSession } from "../hooks/useSession";
import {
  validateAudioFile,
  getAudioDuration,
  validateAudioDuration,
  formatFileSize,
  formatDuration,
} from "@/modules/shared/utils/fileValidations";
import { FILE_UPLOAD_CONFIG } from "@/config/constants";

type UploadState = "idle" | "fileSelected" | "uploading" | "success" | "error";

interface FileValidation {
  isValid: boolean;
  error?: string;
  warning?: string;
  duration?: number;
  isValidatingDuration?: boolean;
}

interface UploadSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedClientId?: string;
  clients: Client[];
}

export function UploadSessionModal({
  isOpen,
  onClose,
  selectedClientId,
  clients,
}: UploadSessionModalProps) {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileValidation, setFileValidation] = useState<FileValidation>({
    isValid: false,
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedBytes, setUploadedBytes] = useState(0);
  const [totalBytes, setTotalBytes] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Form state
  const [clientId, setClientId] = useState(selectedClientId || "");
  const [sessionDate, setSessionDate] = useState<Date>(new Date());
  const [notes, setNotes] = useState("");
  const [hasConsent, setHasConsent] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cancelTokenSourceRef = useRef<CancelTokenSource | null>(null);
  const uploadMutation = useUploadSession();

  // Set client ID when selectedClientId changes
  useEffect(() => {
    if (selectedClientId) {
      setClientId(selectedClientId);
    }
  }, [selectedClientId]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      // Small delay to allow closing animation
      setTimeout(() => {
        resetForm();
      }, 300);
    }
  }, [isOpen]);

  // Prevent closing during upload
  const handleInteractOutside = (e: Event) => {
    if (uploadState === "uploading") {
      e.preventDefault();
    }
  };

  // Handle file selection
  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    const error = validateAudioFile(file);
    if (error) {
      setFileValidation({ isValid: false, error });
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setFileValidation({ isValid: true, isValidatingDuration: true });
    setUploadState("fileSelected");

    // Validate duration asynchronously
    try {
      const duration = await getAudioDuration(file);

      if (duration === null) {
        // Could not parse duration - show warning but allow upload
        setFileValidation({
          isValid: true,
          warning: "Duration could not be verified. Upload will proceed.",
        });
      } else {
        const durationError = validateAudioDuration(duration);
        if (durationError) {
          setFileValidation({ isValid: false, error: durationError });
        } else {
          setFileValidation({ isValid: true, duration });
        }
      }
    } catch (error) {
      console.error("Error validating duration:", error);
      setFileValidation({
        isValid: true,
        warning: "Duration could not be verified. Upload will proceed.",
      });
    }
  };

  // Handle file drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
      handleFileSelect({ target: fileInputRef.current } as any);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Remove selected file
  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileValidation({ isValid: false });
    setUploadState("idle");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle upload
  const handleUpload = async () => {
    console.log("Client Id: ", clientId);
    if (!selectedFile || !clientId || !hasConsent) return;

    setUploadState("uploading");
    setUploadProgress(0);
    setUploadedBytes(0);
    setTotalBytes(selectedFile.size);

    // Create cancel token
    cancelTokenSourceRef.current = axios.CancelToken.source();

    // Add beforeunload handler
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    try {
      await uploadMutation.mutateAsync({
        payload: {
          clientId,
          audioFile: selectedFile,
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadProgress(progress);
          setUploadedBytes(progressEvent.loaded);
          setTotalBytes(progressEvent.total || selectedFile.size);
        },
        cancelToken: cancelTokenSourceRef.current.token,
      });

      // Success
      window.removeEventListener("beforeunload", handleBeforeUnload);
      setUploadState("success");

      // Auto close after 1.5 seconds
      setTimeout(() => {
        toast.success("Session uploaded successfully");
        onClose();
      }, 1500);
    } catch (error: any) {
      window.removeEventListener("beforeunload", handleBeforeUnload);

      if (axios.isCancel(error)) {
        // Upload was cancelled
        setUploadState("fileSelected");
        setUploadProgress(0);
      } else {
        // Upload failed
        setUploadState("error");
        setErrorMessage(
          error.response?.data?.message ||
            "An unexpected error occurred. Please try uploading the file again."
        );
      }
    }
  };

  // Handle cancel upload
  const handleCancelUpload = () => {
    if (cancelTokenSourceRef.current) {
      cancelTokenSourceRef.current.cancel("Upload cancelled by user");
    }
  };

  // Handle retry
  const handleRetry = () => {
    setUploadState("fileSelected");
    setErrorMessage("");
    setUploadProgress(0);
  };

  // Reset form
  const resetForm = () => {
    setUploadState("idle");
    setSelectedFile(null);
    setFileValidation({ isValid: false });
    setUploadProgress(0);
    setUploadedBytes(0);
    setTotalBytes(0);
    setErrorMessage("");
    setClientId(selectedClientId || "");
    setSessionDate(new Date());
    setNotes("");
    setHasConsent(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Check if upload button should be enabled
  const canUpload =
    selectedFile &&
    fileValidation.isValid &&
    !fileValidation.isValidatingDuration &&
    clientId &&
    hasConsent;

  // Get selected client
  const selectedClient = clients.find((c) => c.id === clientId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-3xl sm:p-2 max-lg:max-w-4xl max-w-6xl   p-0 gap-0"
        onInteractOutside={handleInteractOutside}
        onEscapeKeyDown={(e) =>
          uploadState === "uploading" && e.preventDefault()
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column */}
          <div className="p-8 bg-gray-50 dark:bg-gray-800/50 flex flex-col justify-center">
            {uploadState === "idle" && (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 px-6 py-14 text-center cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Upload className="h-8 w-8" />
                </div>
                <div className="flex max-w-xs flex-col items-center gap-2">
                  <p className="text-gray-900 dark:text-white text-lg font-bold">
                    Drag & drop audio file here
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Or browse files
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={FILE_UPLOAD_CONFIG.AUDIO_UPLOAD.ALLOWED_EXTENSIONS.join(
                    ","
                  )}
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            )}

            {uploadState === "fileSelected" && selectedFile && (
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <AudioLines className="h-8 w-8 text-primary flex-shrink-0" />
                    <div className="text-sm min-w-0">
                      <p className="font-semibold text-gray-800 dark:text-gray-100 truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        {formatFileSize(selectedFile.size)}
                        {fileValidation.duration && (
                          <> • {formatDuration(fileValidation.duration)}</>
                        )}
                        {fileValidation.isValidatingDuration && (
                          <> • Checking duration...</>
                        )}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveFile}
                    className="text-gray-400 hover:text-red-500 flex-shrink-0"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>

                {fileValidation.warning && (
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 rounded-lg p-4 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      {fileValidation.warning}
                    </p>
                  </div>
                )}

                {fileValidation.error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg p-4 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-700 dark:text-red-300">
                      {fileValidation.error}
                    </p>
                  </div>
                )}
              </div>
            )}

            {uploadState === "uploading" && (
              <div className="flex flex-col items-center">
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <svg
                    className="absolute inset-0 -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    <path
                      className="text-gray-200 dark:text-gray-700"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="text-primary transition-all duration-300"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray={`${uploadProgress}, 100`}
                      strokeWidth="4"
                    />
                  </svg>
                  <span className="text-4xl font-bold text-gray-800 dark:text-gray-100">
                    {uploadProgress}%
                  </span>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Uploading session...
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
                  {formatFileSize(uploadedBytes)} / {formatFileSize(totalBytes)}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancelUpload}
                  className="mt-4"
                >
                  Cancel Upload
                </Button>
              </div>
            )}

            {uploadState === "success" && (
              <div className="flex flex-col items-center text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                  <CheckCircle className="h-16 w-16" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                  Upload Successful
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Your session has been securely uploaded and is being
                  processed.
                </p>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                  This window will close automatically.
                </p>
              </div>
            )}

            {uploadState === "error" && (
              <div className="flex flex-col items-center text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                  <XCircle className="h-16 w-16" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                  Upload Failed
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-xs">
                  {errorMessage}
                </p>
                <div className="flex items-center justify-center gap-3 mt-6">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button onClick={handleRetry}>Retry Upload</Button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div
            className={`p-8 flex flex-col space-y-6 ${
              uploadState === "uploading"
                ? "opacity-50 pointer-events-none"
                : ""
            } ${uploadState === "success" ? "opacity-20" : ""}`}
          >
            <div className="flex justify-between items-start">
              <DialogTitle className="text-2xl font-bold">
                Upload New Session
              </DialogTitle>
            </div>

            <div className="space-y-4">
              {/* Session Date - Hidden */}
              <label className="hidden flex-col">
                <p className="text-sm font-medium leading-normal pb-2 text-gray-700 dark:text-gray-300">
                  Session Date
                </p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-12 justify-start text-left font-normal"
                      disabled={uploadState === "uploading"}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {sessionDate ? (
                        format(sessionDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={sessionDate}
                      onSelect={(date) => date && setSessionDate(date)}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </label>

              {/* Client Select */}
              <label className="flex flex-col">
                <p className="text-sm font-medium leading-normal pb-2 text-gray-700 dark:text-gray-300">
                  Select Client
                </p>
                <Select
                  value={clientId}
                  onValueChange={setClientId}
                  disabled={!!selectedClientId || uploadState === "uploading"}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select a client">
                      {selectedClient?.alias || "Select a client"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.alias}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>

              {/* Session Notes - Hidden */}
              <label className="hidden flex-col">
                <p className="text-sm font-medium leading-normal pb-2 text-gray-700 dark:text-gray-300">
                  Session Notes (Optional)
                </p>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={uploadState === "uploading"}
                  placeholder="Add any relevant notes for this session..."
                  className="min-h-[120px]"
                  maxLength={FILE_UPLOAD_CONFIG.AUDIO_UPLOAD.MAX_NOTES_LENGTH}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                  {notes.length} /{" "}
                  {FILE_UPLOAD_CONFIG.AUDIO_UPLOAD.MAX_NOTES_LENGTH}
                </p>
              </label>

              {/* Consent Checkbox */}
              <label className="flex items-center gap-x-3 py-2">
                <input
                  type="checkbox"
                  checked={hasConsent}
                  onChange={(e) => setHasConsent(e.target.checked)}
                  disabled={uploadState === "uploading"}
                  className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 bg-transparent text-primary focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
                />
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  I confirm I have received client consent for this upload.
                </p>
              </label>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <Button
                variant="ghost"
                onClick={onClose}
                disabled={uploadState === "uploading"}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                disabled={!canUpload || uploadState === "uploading"}
              >
                {uploadState === "uploading" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload Session"
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
