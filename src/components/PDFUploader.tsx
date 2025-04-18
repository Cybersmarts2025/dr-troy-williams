
import React, { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Input } from "@/components/ui/input";

const PDFUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      toast.error("Please select a valid PDF file");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("No file selected");
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('pdfs')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      toast.success("PDF uploaded successfully");
      setFile(null);
    } catch (error) {
      toast.error("Error uploading PDF");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center">Upload PDF</h2>
      <Input 
        type="file" 
        accept=".pdf"
        onChange={handleFileChange}
        disabled={uploading}
      />
      <Button 
        onClick={handleUpload} 
        disabled={!file || uploading}
      >
        {uploading ? "Uploading..." : "Upload PDF"}
      </Button>
    </div>
  );
};

export default PDFUploader;
