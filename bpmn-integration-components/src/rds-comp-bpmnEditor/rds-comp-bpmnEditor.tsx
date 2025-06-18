// components/BPMNEditor.tsx

import React, { useEffect, useRef, useState } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';

import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
// import BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';
interface BPMNEditorProps {
  xml: string;
  onSave: (xml: string) => void;
    onCustomAction: (elementId: string) => void;
}
const BPMNEditor: React.FC<BPMNEditorProps> = ({ xml, onSave, onCustomAction }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const modelerRef = useRef<BpmnModeler | null>(null);
  const [elementActions, setElementActions] = useState<{ [key: string]: string }>({});
  const elementActionsRef = useRef<{ [key: string]: string }>({});
  const clickTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    elementActionsRef.current = elementActions;
  }, [elementActions]);
useEffect(() => {
  if (!containerRef.current) return;

    modelerRef.current = new BpmnModeler({
      container: containerRef.current,
      keyboard: { bindTo: window }
    });

    modelerRef.current.createDiagram();


    if (xml) {
      modelerRef.current.importXML(xml).then(() => {
        if (!modelerRef.current) return;
        const eventBus = modelerRef.current.get('eventBus') as {
          on: (event: string, callback: (e: any) => void) => void;
        };

        // Single click handler with delay
        eventBus.on('element.click', function (e: any) {
          if (clickTimer.current) clearTimeout(clickTimer.current);
          clickTimer.current = setTimeout(async () => {
            const element = e.element;
            if (element.type.includes('Task')) {
              const action = prompt(`Enter action for ${element.businessObject.name}`);
              if (action) {
                setElementActions((prev) => ({
                  ...prev,
                  [element.id]: action
                }));
                alert(
                  `Action '${action}' assigned  to ${element.businessObject.name}`
                );
                if (modelerRef.current) {
                  const result = await modelerRef.current.saveXML({
                    format: true
                  });
                  if (result.xml) {
                    onSave(result.xml); // This will update the xml in parent or state
                  }
                }
              }
            }
          }, 250); // 250ms delay to distinguish from double click
        });

        // Double click handler cancels single click
        eventBus.on('element.dblclick', function (e: any) {
           if (clickTimer.current) {
          clearTimeout(clickTimer.current);
          clickTimer.current = null;
        }
        const element = e.element;
        const action = elementActionsRef.current[element.id];
        alert(`Double click detected`);
        if (action) {
          alert(`Triggering actions '${action}' for ${element.businessObject.name}`);
        }
        });
      });
    }

  // ...existing cleanup...
  return () => {
    if (modelerRef.current) {
      modelerRef.current.destroy();
    }
  };
}, [xml, onCustomAction, elementActions]);
const CreateTask = () => {
  alert('Create Task action triggered');
};
  // useEffect(() => {
  //   if (!containerRef.current) return;

  //   modelerRef.current = new BpmnModeler({
  //     container: containerRef.current,
  //     keyboard: { bindTo: window }
  //   });

  //   modelerRef.current.createDiagram();

  //   const eventBus = modelerRef.current.get('eventBus') as {
  //     on: (event: string, callback: (e: { element: any }) => void) => void;
  //   };

  //   // Example: Log when an element is clicked
  //   eventBus.on('element.click', function (e: { element: any }) {
  //     const element = e.element;
  //     const elementType = element.type;
  //     const elementId = element.id;

  //     console.log("Clicked Element:", elementId, elementType);

  //     // Trigger only if it's your specific custom element
  //     if (elementId === "SCAN_OK") {
  //       onCustomAction(elementId);
  //     }

  //     const bo = element.businessObject;
  //     const taskName = bo.name?.toLowerCase();

  //     if (taskName === 'send email') {
  //       alert('Email sent!');
  //     }

  //     if (taskName === 'send sms') {
  //       alert('SMS sent!');
  //     }

  //     console.log('Element clicked:', element);
  //   });

  //   modelerRef.current.on('commandStack.changed', () => {
  //     // user modeled something or performed an undo/redo operation
  //   });

  //   modelerRef.current.on('element.changed', (event: any) => {
  //     // the element was changed by the user
  //   });

  //   if (xml) {
  //     modelerRef.current.importXML(xml).then(() => {
  //       if (!modelerRef.current) return;
  //       const eventBus = modelerRef.current.get('eventBus') as {
  //         on: (event: string, callback: (e: any) => void) => void;
  //       };

  //       // On single click: Assign an action
  //       eventBus.on('element.click', async function (e: any) {
  //         debugger;
  //         const element = e.element;
  //         if (element.type.includes('Task')) {
  //           const action = prompt(`Enter action for ${element.businessObject.name}`);
  //           if (action) {
  //             setElementActions((prev) => ({
  //               ...prev,
  //               [element.id]: action
  //             }));
  //             alert(
  //               `Action '${action}' assigned  to ${element.businessObject.name}`
  //             );
  //             if (modelerRef.current) {
  //               const result = await modelerRef.current.saveXML({
  //                 format: true
  //               });
  //               if (result.xml) {
  //                 onSave(result.xml); // This will update the xml in parent or state
  //               }
  //             }
  //           }
  //         }
  //       });

  //   // On double click: Trigger action
  //   eventBus.on('element.dblclick', async function (e: any) {
  //     debugger;
  //     const element = e.element;
  //     const action = elementActionsRef.current[element.id];
  //     if (action) {
  //       alert(`Triggering actions '${action}' for ${element.businessObject.name}`);
  //       // if (modelerRef.current) {
  //       //   const result = await modelerRef.current.saveXML({ format: true });
  //       //   if (result.xml) {
  //       //     onSave(result.xml); // This will update the xml in parent or state
  //       //   }
  //       // }
  //     }
  //   });
  //     });
  //   }

  //   return () => {
  //     if (modelerRef.current) {
  //       modelerRef.current.destroy();
  //     }
  //   };
  // }, [xml, onCustomAction, elementActions]);

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
