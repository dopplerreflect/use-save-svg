import { useEffect, useRef } from 'react';

/**
 * @description Adds a KeyPress event listener, and on ctrl + shift + s opens a Save dialog and saves the SVG image as a PNG file.
 */
const useSaveSVG = () => {
  const ref = useRef<SVGSVGElement>(null);

  const saveSvg = async () => {
    if (ref.current) {
      const svgText = new XMLSerializer().serializeToString(ref.current);
      const svg = new Blob([svgText], { type: 'image/svg+xml;charset=ut6-8' });
      const url = window.URL.createObjectURL(svg);
      const canvas = document.createElement('canvas');
      canvas.width = ref.current.viewBox.baseVal.width;
      canvas.height = ref.current.viewBox.baseVal.height;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = async function () {
        ctx?.drawImage(img, 0, 0);
        window.URL.revokeObjectURL(url);
        const image: Blob = await new Promise((resolve, reject) => {
          canvas.toBlob(blob => {
            if (blob) {
              resolve(blob);
            } else {
              reject('failed to turn canvas to blob');
            }
          });
        });

        try {
          const fileHandle = await showSaveFilePicker({
            //@ts-ignore
            suggestedName:
              ref.current && ref.current.id
                ? `${ref.current.id}.png`
                : 'Untitled.png',
            types: [
              { description: 'PNG file', accept: { 'image/png': ['.png'] } },
            ],
          });
          const writeable = await fileHandle.createWritable();
          await writeable.write(image);
          await writeable.close();
        } catch (e) {
          console.log('User aborted file save dialog', e);
        }
      };
      img.src = url;
    }
  };

  const handleKeyPressEvent = (event: KeyboardEvent): void => {
    const { ctrlKey, shiftKey, key } = event;
    if (ctrlKey && shiftKey && key === 'S') {
      saveSvg();
    }
  };

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPressEvent);
    return () => document.removeEventListener('keypress', handleKeyPressEvent);
  }, []);

  return ref;
};

export default useSaveSVG;
