// components/BPMNEditor.tsx

import React, { useEffect, useRef } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';

import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

interface BPMNEditorProps {
  xml: string;
  onSave: (xml: string) => void;
    onCustomAction: (elementId: string) => void;
}
const BPMNEditor: React.FC<BPMNEditorProps> = ({ xml, onSave,onCustomAction }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const modelerRef = useRef<BpmnModeler | null>(null);

  useEffect(() => {
    if (containerRef.current) {
    modelerRef.current = new BpmnModeler({
  container: containerRef.current,
 keyboard: { bindTo: window }
});
 modelerRef.current.createDiagram();

// modeler.destroy();

    const eventBus = modelerRef.current.get('eventBus') as {
      on: (event: string, callback: (e: { element: any }) => void) => void;
    };

    // Example: Log when an element is clicked
    eventBus.on('element.click', function (e: { element: any }) {
       const element = e.element;
        const elementType = element.type;
        const elementId = element.id;

        console.log("Clicked Element:", elementId, elementType);

        // Trigger only if it's your specific custom element
        if (elementId === "SCAN_OK") {
          onCustomAction(elementId);
        }
  alert('Element clicked:' + element.id);
      console.log('Element clicked:', element);
    });

modelerRef.current.on('commandStack.changed', () => {
  //  alert('Element clicked:');
  // user modeled something or
  // performed an undo/redo operation
});

modelerRef.current.on('element.changed', (event: any ) => {
  const element = event.element;
  // alert('Element changed:');

  // the element was changed by the user
});
      if (xml) {
        modelerRef.current.importXML(xml); 
    }

    return () => {
      if (modelerRef.current) {
        modelerRef.current.destroy();
        modelerRef.current = null;
      }
    };
    }
  }, [xml,onCustomAction]);

  const handleSave = async () => {
    if (modelerRef.current) {
      const result = await modelerRef.current.saveXML({ format: true });
      if (result.xml) {
        onSave(result.xml);
      } else {
        console.error('Failed to save BPMN: XML is undefined');
      }
    }
  };

  return (
    <div>
      <div ref={containerRef} style={{ height: '600px', border: '1px solid #ccc' }} />
      <button onClick={handleSave}>Save BPMN</button>
    </div>
  );
};

export default BPMNEditor;
