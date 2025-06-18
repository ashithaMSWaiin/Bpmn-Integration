import BpmnModeler from 'bpmn-js/lib/Modeler';
const BpmnPropertiesPanelModule: any = require('bpmn-js-properties-panel').BpmnPropertiesPanelModule;
const BpmnPropertiesProviderModule: any = require('bpmn-js-properties-panel').BpmnPropertiesProviderModule;
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import '@bpmn-io/properties-panel/assets/properties-panel.css';
import React,{ useEffect, useRef } from 'react';

const diagramXML =`<?xml version="1.0" encoding="UTF-8"?>
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
//'https://cdn.statically.io/gh/bpmn-io/bpmn-js-examples/main/properties-panel-list-extension/resources/newDiagram.bpmn';
const  MagicPropertiesProviderModule = 'https://cdn.statically.io/gh/bpmn-io/bpmn-js-examples/main/properties-panel-list-extension/src/provider/magic'; // index.js file
const magicModdleDescriptor = 'https://cdn.statically.io/gh/bpmn-io/bpmn-js-examples/main/properties-panel-list-extension/src/descriptors/magic.json';


                     const PropertyPanelExtensionModeler = ()=>{
                     const canvasRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const modelerRef = useRef<BpmnModeler | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !panelRef.current) return;

    const modeler = new BpmnModeler({
      container: canvasRef.current,
      propertiesPanel: {
        parent: panelRef.current
      },
      additionalModules: [
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
        MagicPropertiesProviderModule // 👈 your magic provider
      ],
      moddleExtensions: {
        magic: magicModdleDescriptor
      }
    });

    modelerRef.current = modeler;

    modeler.importXML(diagramXML).then(() => {
      console.log('Diagram loaded');
    }).catch(err => {
      console.error('Error importing XML', err);
    });

    return () => {
      modeler.destroy();
    };
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div
        ref={canvasRef}
        style={{ flex: 1, height: '100%' }}
        id="js-canvas"
      ></div>
      <div
        ref={panelRef}
        style={{ width: '300px', borderLeft: '1px solid #ccc', overflowY: 'auto' }}
        id="js-properties-panel"
      ></div>
    </div>
  );
};

                export default PropertyPanelExtensionModeler;