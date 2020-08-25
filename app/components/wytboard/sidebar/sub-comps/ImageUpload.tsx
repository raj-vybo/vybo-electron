import React, { useState, useEffect, useRef } from 'react';
import DataSharingService from 'services/data-sharing';

const ImageUploadToCanvas = () => {
  const imageFileInputRef = useRef<HTMLImageElement | null>();

  const [selectedFile, setSelectedFile] = useState<File>();

  // Listen To Upload
  useEffect(() => {
    const startUploadSub = DataSharingService.startImageSelection.subscribe(
      () => imageFileInputRef?.current?.click()
    );
    return () => {
      startUploadSub.unsubscribe();
    };
  }, []);

  // Do Upload
  useEffect(() => {
    if (!selectedFile) {
      DataSharingService.imageSelection.next(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    DataSharingService.imageSelection.next(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  // On File Selection
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  return (
    <input
      ref={imageFileInputRef}
      type="file"
      multiple={false}
      hidden
      accept="image/*"
      onChange={onSelectFile}
    />
  );
};

export default ImageUploadToCanvas;
