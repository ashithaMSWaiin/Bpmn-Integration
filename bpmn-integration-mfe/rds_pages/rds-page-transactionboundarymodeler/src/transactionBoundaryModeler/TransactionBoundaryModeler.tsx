import React,{ useRef, useEffect, useState } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';

import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

import debounce from 'lodash.debounce';
// declare module 'camunda-transaction-boundaries';
// import transactionBoundariesModule from 'camunda-transaction-boundaries';

// Replace with your BPMN diagram XML
// If using Webpack, ensure raw-loader is configured for .bpmn files, or use require as below:


const diagramXML =
//  'https://cdn.statically.io/gh/bpmn-io/bpmn-js-examples/main/transaction-boundaries/resources/transaction-boundaries.bpmn';
'https://cdn.statically.io/gh/bpmn-io/bpmn-js-examples/main/colors/resources/pizza-collaboration.bpmn';


  const TransactionBoundaryModeler = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const bpmnRef = useRef<BpmnModeler | null>(null);
    const [downloadXml, setDownloadXml] = useState<string | null>(null);
    const [downloadSvg, setDownloadSvg] = useState<string | null>(null);
    const dropZoneRef = useRef<HTMLDivElement | null>(null);
  
    // Initialize BPMN Modeler
    useEffect(() => {
      if (containerRef.current) {
        bpmnRef.current = new BpmnModeler({
          container: containerRef.current,
        //   additionalModules: [transactionBoundariesModule],
        });
  
        // Load initial diagram
        openDiagram(diagramXML);
      }
  
      // Setup file drop
      const dropZone = dropZoneRef.current;
      const handleDragOver = (e: React.DragEvent<HTMLDivElement> | DragEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if ('dataTransfer' in e && e.dataTransfer) {
          e.dataTransfer.dropEffect = 'copy';
        }
      };
      const handleDrop = (e: React.DragEvent<HTMLDivElement> | DragEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if ('dataTransfer' in e && e.dataTransfer) {
          const file = e.dataTransfer.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (ev: ProgressEvent<FileReader>) => {
              if (ev.target && typeof ev.target.result === 'string') {
                openDiagram(ev.target.result);
              }
            };
            reader.readAsText(file);
          }
        }
      };
      if (dropZone) {
        dropZone.addEventListener('dragover', handleDragOver as EventListener);
        dropZone.addEventListener('drop', handleDrop as EventListener);
      }
  
      return () => {
        if (dropZone) {
          dropZone.removeEventListener('dragover', handleDragOver as EventListener);
          dropZone.removeEventListener('drop', handleDrop as EventListener);
        }
        if (bpmnRef.current) {
          bpmnRef.current.destroy();
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    const openDiagram = async (xml: string) => {
      if (!bpmnRef.current) return;
      try {
        await (bpmnRef.current as BpmnModeler).importXML(xml);
        // (bpmnRef.current as BpmnModeler).get('canvas').zoom('fit-viewport');
      } catch (err) {
        console.error('Failed to load diagram:', err);
      }
    };
  
    const saveArtifacts = debounce(async () => {
      if (!bpmnRef.current) return;
      try {
        const { svg } = await bpmnRef.current.saveSVG();
        setDownloadSvg(svg);
      } catch (err) {
        console.error('Error saving SVG:', err);
        setDownloadSvg(null);
      }
      try {
        const { xml } = await bpmnRef.current.saveXML({ format: true });
        setDownloadXml(xml ?? null);
      } catch (err) {
        console.error('Error saving XML:', err);
        setDownloadXml(null);
      }
    }, 500);
  
    // Register event listeners for command stack change
    useEffect(() => {
      const modeler = bpmnRef.current;
      if (modeler && typeof (modeler as any).on === 'function' && typeof (modeler as any).off === 'function') {
        (modeler as any).on('commandStack.changed', saveArtifacts);
        return () => {
          (modeler as any).off('commandStack.changed', saveArtifacts);
        };
      }
      return;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bpmnRef.current]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '10px', background: '#f0f0f0', position: 'fixed', top: 0, width: '100%', zIndex: 100 }}>
        <h3>Drag & Drop BPMN Diagram</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div>
            <button
              onClick={() => {
                // Load initial diagram or custom logic
                openDiagram(diagramXML);
              }}
            >
              Load Default Diagram
            </button>
          </div>
          <div>
            <a
              href={downloadSvg ? 'data:image/svg+xml;utf8,' + encodeURIComponent(downloadSvg) : '#'}
              download="diagram.svg"
              style={{ marginRight: '10px', color: downloadSvg ? 'blue' : 'gray', pointerEvents: downloadSvg ? 'auto' : 'none' }}
            >
              Download SVG
            </a>
            <a
              href={downloadXml ? 'data:application/xml;charset=UTF-8,' + encodeURIComponent(downloadXml) : '#'}
              download="diagram.bpmn"
              style={{ color: downloadXml ? 'blue' : 'gray', pointerEvents: downloadXml ? 'auto' : 'none' }}
            >
              Download BPMN XML
            </a>
          </div>
        </div>
      </div>

      {/* Drop zone */}
      <div
        ref={dropZoneRef}
        style={{
          marginTop: '150px',
          border: '2px dashed #ccc',
          margin: '10px',
          position: 'relative',
        }}
      >
        {/* Canvas container */}
        <div
          ref={containerRef}
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        />
      </div>
    </div>
  );
};

  export default TransactionBoundaryModeler;