'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';

const FileUploadComponent: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);

  const imageInputRef = React.useRef<HTMLInputElement | null>(null);
  const pdfInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    imageInputRef.current?.click();
  };

  const handlePdfClick = () => {
    pdfInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      setSelectedImage(URL.createObjectURL(imageFile)); // Create a URL for image preview
      setSelectedPdf(null); // Reset PDF selection if an image is uploaded
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const pdfFile = e.target.files[0];
      setSelectedPdf(pdfFile); // Store the selected PDF file
      setSelectedImage(null); // Reset image selection if a PDF is uploaded
    }
  };

  return (
    <div className="flex flex-col items-start">
      {/* Hidden file inputs */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <input
        ref={pdfInputRef}
        type="file"
        accept=".pdf"
        style={{ display: 'none' }}
        onChange={handlePdfChange}
      />

      {/* Icons for file upload */}
      <div className="mb-4 flex space-x-4">
        <Button onClick={handleImageClick} aria-label="Upload Image">
          <FontAwesomeIcon icon={faImage} className="text-2xl text-black" />
        </Button>
        <Button onClick={handlePdfClick} aria-label="Upload PDF">
          <FontAwesomeIcon icon={faFilePdf} className="text-2xl text-black" />
        </Button>
      </div>

      {/* Display the uploaded image or PDF */}
      <div className="mt-4">
        {selectedImage && (
          <div>
            <h4 className="mb-2 text-lg font-semibold">Image Preview:</h4>
            <img
              src={selectedImage}
              alt="Selected"
              className="h-auto max-w-full rounded-md shadow-md"
            />
          </div>
        )}

        {selectedPdf && (
          <div>
            <h4 className="mb-2 text-lg font-semibold">Selected PDF:</h4>
            <p>{selectedPdf.name}</p> {/* Display the PDF file name */}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadComponent;
