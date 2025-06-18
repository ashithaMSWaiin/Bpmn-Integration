import React,{ useEffect, useRef, useState } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';

import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';

import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
                const ExampleBpmnModeler = ()=>{
 const canvasRef = useRef<HTMLDivElement | null>(null);
  const modelerRef = useRef<BpmnModeler | null>(null);


const [bpmnXml, setBpmnXml] = useState(`<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" targetNamespace="">
  <bpmn:process id="Process_1" isExecutable="true">
    <bpmn:task id="Task_Step1" name="Step 1" />
    <bpmn:exclusiveGateway id="Gateway_Cond1" name="Cond 1" />
    <bpmn:task id="Task_Step2" name="Step 2" />
    <bpmn:endEvent id="EndEvent_1" name="End" />
    <bpmn:endEvent id="EndEvent_2" name="End" />
    <bpmn:sequenceFlow id="Flow_1" targetRef="Task_Step1" />
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Task_Step1" targetRef="Gateway_Cond1" />
    <bpmn:sequenceFlow id="Flow_3" sourceRef="Gateway_Cond1" targetRef="Task_Step2">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">Yes</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="Flow_4" sourceRef="Gateway_Cond1" targetRef="EndEvent_1">
      <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">No</bpmn:conditionExpression>
    </bpmn:sequenceFlow>
    <bpmn:sequenceFlow id="Flow_5" sourceRef="Task_Step2" targetRef="EndEvent_2" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="Task_Step1_di" bpmnElement="Task_Step1" name="task">
        <omgdc:Bounds x="295" y="20" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_Cond1_di" bpmnElement="Gateway_Cond1" isMarkerVisible="true">
        <omgdc:Bounds x="320" y="195" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="274" y="213" width="36" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_Step2_di" bpmnElement="Task_Step2" name="task">
        <omgdc:Bounds x="420" y="180" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_2_di" bpmnElement="EndEvent_2">
        <omgdc:Bounds x="452" y="342" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="460" y="378" width="20" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_1_di" bpmnElement="EndEvent_1">
        <omgdc:Bounds x="332" y="352" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <omgdc:Bounds x="340" y="388" width="20" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
        <omgdi:waypoint x="345" y="100" />
        <omgdi:waypoint x="345" y="195" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_3_di" bpmnElement="Flow_3">
        <omgdi:waypoint x="370" y="220" />
        <omgdi:waypoint x="420" y="220" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_4_di" bpmnElement="Flow_4">
        <omgdi:waypoint x="345" y="245" />
        <omgdi:waypoint x="345" y="353" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_5_di" bpmnElement="Flow_5">
        <omgdi:waypoint x="470" y="260" />
        <omgdi:waypoint x="470" y="342" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`);

useEffect(() => {
  if (!canvasRef.current) return;

  const modeler = new BpmnModeler({
    container: canvasRef.current as HTMLElement
  });

  modelerRef.current = modeler;

  modeler.importXML(bpmnXml).then(() => {
    const elementRegistry = modeler.get('elementRegistry') as any;
    const modeling = modeler.get('modeling') as any;
    debugger;
    const shapesWithNameTask = elementRegistry.filter(
      (element: any) => element.businessObject && element.type ==='bpmn:Task');

    if (shapesWithNameTask.length > 0) {
      shapesWithNameTask.forEach((selectShape: any) => {

        modeling.setColor([selectShape], {
          stroke: 'orange',
          fill: 'rgb(236, 224, 11)'
        });
      });
    }
 const shapesWithNameEnd= elementRegistry.filter(
      (element: any) => element.businessObject && element.businessObject.name ==='End');

    if (shapesWithNameEnd.length > 0) {
      shapesWithNameEnd.forEach((selectShape: any) => {

        modeling.setColor([selectShape], {
          stroke: 'black',
          fill: 'rgb(75, 75, 73)'
        });
      });
    }
const conditnGateway = elementRegistry.get('Gateway_Cond1');
    if (conditnGateway) {
       modeling.setColor([conditnGateway], {
          stroke: 'blue',
          fill: 'rgb(85, 208, 241)'
        });
    }

  }).catch(err => {
    console.error('Failed to load BPMN diagram:', err);
  });

  return () => modeler.destroy();
}, []);
  // Save handler to export BPMN XML from the modeler
  const handleSave = async () => {
    if (modelerRef.current) {
      try {
        const { xml } = await modelerRef.current.saveXML({ format: true });
        setBpmnXml(xml ?? '');
        // Here you would typically send the XML to your backend API to save it
        console.log('Saving BPMN XML:', xml);
        // await axios.post('/api/app/process-models/sample-id', { xml });
        alert('Saved!');
      } catch (err) {
        alert('Failed to save BPMN XML');
        console.error(err);
      }
    }
  };

  return (
    <div>
      <h2>BPMN Modeler Example</h2>
      <div
        ref={canvasRef}
        style={{
          width: '100%',
          height: '600px',
          border: '1px solid #ccc',
        }}
      />
      <button onClick={handleSave}>Save BPMN</button>
    </div>
  );
};
                export default ExampleBpmnModeler;