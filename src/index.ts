import { useEffect, useRef } from 'react';

/**
 * @description Adds a KeyPress event listener, and on ctrl + shift + s opens a Save dialog and saves the SVG image as a PNG file.
 */
const useSaveSVG = () => {
  const ref = useRef<SVGSVGElement>(null);
  const div = useRef<HTMLDivElement>();
  const displayProcessingOverlay = () => {
    div.current = document.createElement('div');
    div.current.id = 'processingOverlayDiv';
    div.current.style.width = '100vw';
    div.current.style.height = '100vh';
    div.current.style.position = 'fixed';
    div.current.style.top = '0';
    div.current.style.left = '0';
    div.current.style.background = 'black';
    div.current.style.opacity = '0.85';
    div.current.style.display = 'flex';
    div.current.style.color = 'white';
    div.current.style.alignItems = 'center';
    div.current.style.justifyContent = 'center';
    div.current.innerHTML = 'Processing...';
    document.body.appendChild(div.current);
    console.log(div.current);
  };
  const saveSvg = async () => {
    displayProcessingOverlay();
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
        const divr = document.querySelector('#processingOverlayDiv');
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
          if (div.current) document.body.removeChild(div.current);
        } catch (e) {
          console.log('User aborted file save dialog', e);
          if (div.current) document.body.removeChild(div.current);
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
