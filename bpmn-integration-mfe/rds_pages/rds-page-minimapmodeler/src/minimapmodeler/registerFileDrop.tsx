/**
 * Registers a file drop event on the given drop zone element.
 * Calls the provided callback with the file contents as a string.
 */
const registerFileDrop = (
  dropZone: HTMLElement,
  callback: (xml: string) => void
) => {
  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    if (!event.dataTransfer || !event.dataTransfer.files.length) return;
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        callback(e.target.result);
      }
    };
    reader.readAsText(file);
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  dropZone.addEventListener('drop', handleDrop);
  dropZone.addEventListener('dragover', handleDragOver);

  // Cleanup function (optional)
  return () => {
    dropZone.removeEventListener('drop', handleDrop);
    dropZone.removeEventListener('dragover', handleDragOver);
  };
};

export default registerFileDrop;