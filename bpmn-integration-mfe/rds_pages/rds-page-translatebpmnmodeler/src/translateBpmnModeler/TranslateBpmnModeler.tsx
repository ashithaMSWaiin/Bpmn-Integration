import React,{ useEffect, useRef } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';

import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

import customTranslate from './customTranslate';
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
</bpmn2:definitions>`;

const customTranslateModule = {
  translate: ['value', customTranslate],
};

 const TranslateBpmnModeler = ()=>{
                      // src/customTranslate/customTranslate.js
const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const modeler = new BpmnModeler({
      container: canvasRef.current,
      additionalModules: [customTranslateModule],
    });

    modeler.importXML(diagramXML)
      .then(() => {
        console.log('Diagram imported successfully!');
      })
      .catch((err) => {
        console.error('Error importing diagram:', err);
      });

    // Clean up on component unmount
    return () => {
      modeler.destroy();
    };
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <div ref={canvasRef} id="canvas" style={{ height: '100%' }} />
    </div>
  );
};
  export default TranslateBpmnModeler;