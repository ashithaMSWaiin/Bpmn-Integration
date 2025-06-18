import React,{ useRef, useEffect, useState } from 'react';
import axios from 'axios';
import BpmnModeler from 'bpmn-js/lib/Modeler';
// Add type for viewerRef
type BpmnViewerType = {
  importXML: (xml: string) => Promise<any>;
  get: (service: string) => any;
  destroy: () => void;
};

const CommentModeler = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<BpmnViewerType | null>(null);
  const [url, setUrl] = useState<string>('');
  const [log, setLog] = useState<string>('');

  // Initialize viewer
  useEffect(() => {
    if (containerRef.current) {
      viewerRef.current = new BpmnModeler({ container: containerRef.current, height: 600 }) as BpmnViewerType;
    }
    // Check URL param on load
    const params = new URLSearchParams(window.location.search);
    const urlParam = params.get('url');
    if (urlParam) {
      setUrl(decodeURIComponent(urlParam));
      openFromUrl(decodeURIComponent(urlParam));
    }
    // Cleanup
    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const appendLog = (message: string) => {
    setLog(prev => prev + message + '\n');
  };

  const openFromUrl = async (diagramUrl: string) => {
    appendLog(`Attempting to open <${diagramUrl}>`);
    try {
      const response = await axios.get(diagramUrl);
      const xml = response.data;
      if (viewerRef.current) {
        await viewerRef.current.importXML(xml);
        viewerRef.current.get('canvas').zoom('fit-viewport');
        appendLog('Success');
      } else {
        appendLog('Error: Viewer not initialized');
      }
    } catch (err) {
      let message = 'Unknown error';
      if (err instanceof Error) {
        message = err.message;
      }
      appendLog(`Error: ${message}`);
      console.error(err);
    }
  };

  const handleOpenClick = () => {
    if (url) {
      openFromUrl(url);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header with input */}
      <div style={{ padding: '10px', background: '#f0f0f0', position: 'fixed', top: 0, width: '100%', zIndex: 100 }}>
        <h3>Open BPMN 2.0 diagram from URL</h3>
        <input
          type="text"
          placeholder="path to diagram"
          value={url}
          onChange={handleInputChange}
          style={{ width: '70%', maxWidth: '100%', marginRight: '10px' }}
        />
        <button onClick={handleOpenClick}>Open</button>
        <p>
          <strong>Hint:</strong> try <code>https://cdn.statically.io/gh/bpmn-io/bpmn-js-examples/dfceecba/url-viewer/resources/pizza-collaboration.bpmn</code>
        </p>
      </div>

      {/* Canvas container */}
      <div
        ref={containerRef}
        style={{ flex: 1, marginTop: '150px', border: '1px solid black', margin: '10px' }}
      />

      {/* Console */}
      <div style={{ padding: '10px', background: '#f9f9f9', height: '150px', overflow: 'auto', margin: '10px' }}>
        <h4>Console</h4>
        <textarea
          readOnly
          value={log}
          style={{ width: '100%', height: '100%', border: 'none', resize: 'none' }}
        />
      </div>
    </div>
  );
};

export default CommentModeler;