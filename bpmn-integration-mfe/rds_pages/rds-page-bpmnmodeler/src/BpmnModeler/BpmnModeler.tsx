import React, { useEffect, useRef, useState, useCallback } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import $ from 'jquery';

// BPMN Styles
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import './BpmnModelerStyle.css'; // Your custom styles

const diagramXML = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn2:process id="Process_1" isExecutable="false">
    <bpmn2:startEvent id="StartEvent_1"/>
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds height="36.0" width="36.0" x="412.0" y="240.0"/>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>`; // if using Vite/Webpack5+, use ?raw to load XML as string

const BpmnModelerComponent = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const dropZoneRef = useRef<HTMLDivElement | null>(null);
  const [modeler, setModeler] = useState<BpmnModeler | null>(null);
  const [downloadLinks, setDownloadLinks] = useState({ xml: '', svg: '' });

  useEffect(() => {
    if (!canvasRef.current || !dropZoneRef.current) return;

    const bpmnModeler = new BpmnModeler({
      container: canvasRef.current as HTMLElement,
    });
    setModeler(bpmnModeler);

    // React debounce using useCallback and useRef
  const useDebounce = (fn: () => void, timeout: number) => {
    const timer = useRef<NodeJS.Timeout | null>(null);

    const debouncedFn = useCallback(() => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(fn, timeout);
    }, [fn, timeout]);

    // Optional: cleanup timer on unmount
    useEffect(() => {
      return () => {
        if (timer.current) clearTimeout(timer.current);
      };
    }, []);

    return debouncedFn;
  };

  // React file drop registration with cleanup
  const useFileDrop = (containerRef: React.RefObject<HTMLDivElement>, callback: (xml: string) => void) => {
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      function handleFileSelect(e: DragEvent) {
        e.preventDefault();
        if (!e.dataTransfer?.files?.length) return;
        const file = e.dataTransfer.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
          const xml = event.target?.result as string;
          callback(xml);
        };

        reader.readAsText(file);
      }

      function handleDragOver(e: DragEvent) {
        e.preventDefault();
        e.dataTransfer!.dropEffect = 'copy';
      }

      container.addEventListener('dragover', handleDragOver, false);
      container.addEventListener('drop', handleFileSelect, false);

      return () => {
        container.removeEventListener('dragover', handleDragOver, false);
        container.removeEventListener('drop', handleFileSelect, false);
      };
    }, [containerRef, callback]);
  };

    return () => {
      bpmnModeler.destroy();
    };
  }, []);

  const openDiagram = async (xml: string) => {
    try {
      if (!modeler) return;
      await modeler.importXML(xml);
      if (dropZoneRef.current) {
        $(dropZoneRef.current).removeClass('with-error').addClass('with-diagram');
      }
    } catch (err) {
      if (dropZoneRef.current) {
        $(dropZoneRef.current).removeClass('with-diagram').addClass('with-error');
      }
      console.error(err);
    }
  };

  const createNewDiagram = () => {
    openDiagram(diagramXML);
  };

  const exportArtifacts = async () => {
    if (!modeler) return;
    try {
      const { svg } = await modeler.saveSVG();
      const { xml } = await modeler.saveXML({ format: true });

      setDownloadLinks({
        svg: `data:application/svg+xml;charset=UTF-8,${encodeURIComponent(svg ?? '')}`,
        xml: `data:application/bpmn20-xml;charset=UTF-8,${encodeURIComponent(xml ?? '')}`
      });
    } catch (err) {
      console.error('Error exporting:', err);
    }
  };

  // Simple debounce implementation
  function debounce(fn: (...args: any[]) => void, timeout: number) {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), timeout);
    };
  }

  useEffect(() => {
    if (modeler) {
      modeler.on('commandStack.changed', debounce(exportArtifacts, 500));
    }
  }, [modeler]);

  return (
    <div ref={dropZoneRef} id="js-drop-zone" className="drop-zone">
      <div className="buttons">
        <button onClick={createNewDiagram} id="js-create-diagram">Create New Diagram</button>
        <a
          id="js-download-diagram"
          href={downloadLinks.xml}
          download="diagram.bpmn"
          className={downloadLinks.xml ? 'active' : ''}
        >Download BPMN</a>
        <a
          id="js-download-svg"
          href={downloadLinks.svg}
          download="diagram.svg"
          className={downloadLinks.svg ? 'active' : ''}
        >Download SVG</a>
      </div>
      <div id="js-canvas" style={{ width: '100%', height: '600px' }} ref={canvasRef}></div>
    </div>
  );
};

export default BpmnModelerComponent;

// function debounce(fn, timeout) {
//   let timer;
//   return () => {
//     clearTimeout(timer);
//     timer = setTimeout(fn, timeout);
//   };
// }

// function registerFileDrop(container, callback) {
//   function handleFileSelect(e) {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       const xml = e.target.result;
//       callback(xml);
//     };

//     reader.readAsText(file);
//   }

//   function handleDragOver(e) {
//     e.preventDefault();
//     e.dataTransfer.dropEffect = 'copy';
//   }

//   container.addEventListener('dragover', handleDragOver, false);
//   container.addEventListener('drop', handleFileSelect, false);
// }
