import React, { useEffect, useRef } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler'; // Changed from BpmnViewer to BpmnModeler
// Assuming you're using Vite/Webpack raw loader
const qrDiagram = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
             xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
             xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             expressionLanguage="http://www.w3.org/1999/XPath"
             typeLanguage="http://www.w3.org/2001/XMLSchema"
             targetNamespace=""
             xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL http://www.omg.org/spec/BPMN/2.0/20100501/BPMN20.xsd">
<collaboration id="sid-c0e745ff-361e-4afb-8c8d-2a1fc32b1424">
    <participant id="sid-87F4C1D6-25E1-4A45-9DA7-AD945993D06F" name="Customer" processRef="sid-C3803939-0872-457F-8336-EAE484DC4A04">
    </participant>
</collaboration>
<process id="sid-C3803939-0872-457F-8336-EAE484DC4A04" isClosed="false" isExecutable="false" name="Customer" processType="None">
    <extensionElements/>
    <laneSet id="sid-b167d0d7-e761-4636-9200-76b7f0e8e83a">
        <lane id="sid-57E4FE0D-18E4-478D-BC5D-B15164E93254">
            <flowNodeRef>START_PROCESS</flowNodeRef>
            <flowNodeRef>SCAN_QR_CODE</flowNodeRef>
            <flowNodeRef>SCAN_OK</flowNodeRef>
            <flowNodeRef>sid-E49425CF-8287-4798-B622-D2A7D78EF00B</flowNodeRef>
            <flowNodeRef>END_PROCESS</flowNodeRef>
            <flowNodeRef>sid-5134932A-1863-4FFA-BB3C-A4B4078B11A9</flowNodeRef>
        </lane>
    </laneSet>
    <startEvent id="START_PROCESS" name="Notices&#10;QR code">
        <outgoing>sid-7B791A11-2F2E-4D80-AFB3-91A02CF2B4FD</outgoing>
    </startEvent>
    <task completionQuantity="1" id="SCAN_QR_CODE" isForCompensation="false" name="Scan QR code" startQuantity="1">
        <incoming>sid-4DC479E5-5C20-4948-BCFC-9EC5E2F66D8D</incoming>
        <outgoing>sid-EE8A7BA0-5D66-4F8B-80E3-CC2751B3856A</outgoing>
    </task>
    <exclusiveGateway gatewayDirection="Diverging" id="SCAN_OK" name="Scan successful?&#10;">
        <incoming>sid-EE8A7BA0-5D66-4F8B-80E3-CC2751B3856A</incoming>
        <outgoing>sid-8B820AF5-DC5C-4618-B854-E08B71FB55CB</outgoing>
        <outgoing>sid-337A23B9-A923-4CCE-B613-3E247B773CCE</outgoing>
    </exclusiveGateway>
    <task completionQuantity="1" id="sid-E49425CF-8287-4798-B622-D2A7D78EF00B" isForCompensation="false" name="Open product information in mobile  app" startQuantity="1">
        <incoming>sid-8B820AF5-DC5C-4618-B854-E08B71FB55CB</incoming>
        <outgoing>sid-57EB1F24-BD94-479A-BF1F-57F1EAA19C6C</outgoing>
    </task>
    <endEvent id="END_PROCESS" name="Is informed">
        <incoming>sid-57EB1F24-BD94-479A-BF1F-57F1EAA19C6C</incoming>
    </endEvent>
    <exclusiveGateway gatewayDirection="Converging" id="sid-5134932A-1863-4FFA-BB3C-A4B4078B11A9">
        <incoming>sid-7B791A11-2F2E-4D80-AFB3-91A02CF2B4FD</incoming>
        <incoming>sid-337A23B9-A923-4CCE-B613-3E247B773CCE</incoming>
        <outgoing>sid-4DC479E5-5C20-4948-BCFC-9EC5E2F66D8D</outgoing>
    </exclusiveGateway>
    <sequenceFlow id="sid-7B791A11-2F2E-4D80-AFB3-91A02CF2B4FD" sourceRef="START_PROCESS" targetRef="sid-5134932A-1863-4FFA-BB3C-A4B4078B11A9"/>
    <sequenceFlow id="sid-EE8A7BA0-5D66-4F8B-80E3-CC2751B3856A" sourceRef="SCAN_QR_CODE" targetRef="SCAN_OK"/>
    <sequenceFlow id="sid-57EB1F24-BD94-479A-BF1F-57F1EAA19C6C" sourceRef="sid-E49425CF-8287-4798-B622-D2A7D78EF00B" targetRef="END_PROCESS"/>
    <sequenceFlow id="sid-8B820AF5-DC5C-4618-B854-E08B71FB55CB" name="No" sourceRef="SCAN_OK" targetRef="sid-E49425CF-8287-4798-B622-D2A7D78EF00B"/>
    <sequenceFlow id="sid-4DC479E5-5C20-4948-BCFC-9EC5E2F66D8D" sourceRef="sid-5134932A-1863-4FFA-BB3C-A4B4078B11A9" targetRef="SCAN_QR_CODE"/>
    <sequenceFlow id="sid-337A23B9-A923-4CCE-B613-3E247B773CCE" name="Yes" sourceRef="SCAN_OK" targetRef="sid-5134932A-1863-4FFA-BB3C-A4B4078B11A9"/>
</process>
<bpmndi:BPMNDiagram id="sid-74620812-92c4-44e5-949c-aa47393d3830">
    <bpmndi:BPMNPlane bpmnElement="sid-c0e745ff-361e-4afb-8c8d-2a1fc32b1424" id="sid-cdcae759-2af7-4a6d-bd02-53f3352a731d">
        <bpmndi:BPMNShape bpmnElement="sid-87F4C1D6-25E1-4A45-9DA7-AD945993D06F" id="sid-87F4C1D6-25E1-4A45-9DA7-AD945993D06F_gui" isHorizontal="true">
            <omgdc:Bounds height="250.0" width="933.0" x="42.5" y="75.0"/>
            <bpmndi:BPMNLabel labelStyle="sid-84cb49fd-2f7c-44fb-8950-83c3fa153d3b">
                <omgdc:Bounds height="59.142852783203125" width="12.000000000000014" x="47.49999999999999" y="170.42857360839844"/>
            </bpmndi:BPMNLabel>
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape bpmnElement="sid-57E4FE0D-18E4-478D-BC5D-B15164E93254" id="sid-57E4FE0D-18E4-478D-BC5D-B15164E93254_gui" isHorizontal="true">
            <omgdc:Bounds height="250.0" width="903.0" x="72.5" y="75.0"/>
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape bpmnElement="START_PROCESS" id="START_PROCESS_gui">
            <omgdc:Bounds height="30.0" width="30.0" x="150.0" y="165.0"/>
            <bpmndi:BPMNLabel labelStyle="sid-e0502d32-f8d1-41cf-9c4a-cbb49fecf581">
                <omgdc:Bounds height="22.0" width="46.35714340209961" x="141.8214282989502" y="197.0"/>
            </bpmndi:BPMNLabel>
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape bpmnElement="SCAN_QR_CODE" id="SCAN_QR_CODE_gui">
            <omgdc:Bounds height="80.0" width="100.0" x="352.5" y="140.0"/>
            <bpmndi:BPMNLabel labelStyle="sid-84cb49fd-2f7c-44fb-8950-83c3fa153d3b">
                <omgdc:Bounds height="12.0" width="84.0" x="360.5" y="172.0"/>
            </bpmndi:BPMNLabel>
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape bpmnElement="SCAN_OK" id="SCAN_OK_gui" isMarkerVisible="true">
            <omgdc:Bounds height="40.0" width="40.0" x="550.0" y="160.0"/>
            <bpmndi:BPMNLabel labelStyle="sid-e0502d32-f8d1-41cf-9c4a-cbb49fecf581">
                <omgdc:Bounds height="12.0" width="102.0" x="521.0" y="127.0"/>
            </bpmndi:BPMNLabel>
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape bpmnElement="sid-E49425CF-8287-4798-B622-D2A7D78EF00B" id="sid-E49425CF-8287-4798-B622-D2A7D78EF00B_gui">
            <omgdc:Bounds height="80.0" width="100.0" x="687.5" y="140.0"/>
            <bpmndi:BPMNLabel labelStyle="sid-84cb49fd-2f7c-44fb-8950-83c3fa153d3b">
                <omgdc:Bounds height="36.0" width="83.14285278320312" x="695.9285736083984" y="162.0"/>
            </bpmndi:BPMNLabel>
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape bpmnElement="END_PROCESS" id="END_PROCESS_gui">
            <omgdc:Bounds height="28.0" width="28.0" x="865.0" y="166.0"/>
            <bpmndi:BPMNLabel labelStyle="sid-e0502d32-f8d1-41cf-9c4a-cbb49fecf581">
                <omgdc:Bounds height="11.0" width="62.857147216796875" x="847.5714263916016" y="196.0"/>
            </bpmndi:BPMNLabel>
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape bpmnElement="sid-5134932A-1863-4FFA-BB3C-A4B4078B11A9" id="sid-5134932A-1863-4FFA-BB3C-A4B4078B11A9_gui" isMarkerVisible="true">
            <omgdc:Bounds height="40.0" width="40.0" x="240.0" y="160.0"/>
        </bpmndi:BPMNShape>
        <bpmndi:BPMNEdge bpmnElement="sid-EE8A7BA0-5D66-4F8B-80E3-CC2751B3856A" id="sid-EE8A7BA0-5D66-4F8B-80E3-CC2751B3856A_gui">
            <omgdi:waypoint x="452.5" y="180"/>
            <omgdi:waypoint x="550.0" y="180"/>
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge bpmnElement="sid-8B820AF5-DC5C-4618-B854-E08B71FB55CB" id="sid-8B820AF5-DC5C-4618-B854-E08B71FB55CB_gui">
            <omgdi:waypoint x="590.0" y="180"/>
            <omgdi:waypoint x="687.5" y="180"/>
            <bpmndi:BPMNLabel labelStyle="sid-e0502d32-f8d1-41cf-9c4a-cbb49fecf581">
                <omgdc:Bounds height="12.048704338048935" width="16.32155963195521" x="597.8850936986571" y="155"/>
            </bpmndi:BPMNLabel>
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge bpmnElement="sid-7B791A11-2F2E-4D80-AFB3-91A02CF2B4FD" id="sid-7B791A11-2F2E-4D80-AFB3-91A02CF2B4FD_gui">
            <omgdi:waypoint x="180.0" y="180"/>
            <omgdi:waypoint x="240.0" y="180"/>
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge bpmnElement="sid-4DC479E5-5C20-4948-BCFC-9EC5E2F66D8D" id="sid-4DC479E5-5C20-4948-BCFC-9EC5E2F66D8D_gui">
            <omgdi:waypoint x="280.0" y="180"/>
            <omgdi:waypoint x="352.5" y="180"/>
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge bpmnElement="sid-57EB1F24-BD94-479A-BF1F-57F1EAA19C6C" id="sid-57EB1F24-BD94-479A-BF1F-57F1EAA19C6C_gui">
            <omgdi:waypoint x="787.5" y="180.0"/>
            <omgdi:waypoint x="865.0" y="180.0"/>
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNEdge bpmnElement="sid-337A23B9-A923-4CCE-B613-3E247B773CCE" id="sid-337A23B9-A923-4CCE-B613-3E247B773CCE_gui">
            <omgdi:waypoint x="570.5" y="200.0"/>
            <omgdi:waypoint x="570.5" y="269.0"/>
            <omgdi:waypoint x="260.5" y="269.0"/>
            <omgdi:waypoint x="260.5" y="200.0"/>
            <bpmndi:BPMNLabel labelStyle="sid-e0502d32-f8d1-41cf-9c4a-cbb49fecf581">
                <omgdc:Bounds height="21.4285888671875" width="12.0" x="550" y="205"/>
            </bpmndi:BPMNLabel>
        </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
    <bpmndi:BPMNLabelStyle id="sid-e0502d32-f8d1-41cf-9c4a-cbb49fecf581">
        <omgdc:Font isBold="false" isItalic="false" isStrikeThrough="false" isUnderline="false" name="Arial" size="11.0"/>
    </bpmndi:BPMNLabelStyle>
    <bpmndi:BPMNLabelStyle id="sid-84cb49fd-2f7c-44fb-8950-83c3fa153d3b">
        <omgdc:Font isBold="false" isItalic="false" isStrikeThrough="false" isUnderline="false" name="Arial" size="12.0"/>
    </bpmndi:BPMNLabelStyle>
</bpmndi:BPMNDiagram>
</definitions>`;
//'https://cdn.statically.io/gh/bpmn-io/bpmn-js-examples/main/overlays/resources/qr-code.bpmn';

import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import './overlayStyle.css'; // Custom overlay styles

const OverlayModeler = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const modelerRef = useRef<BpmnModeler | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const bpmnModeler = new BpmnModeler({
      container: canvasRef.current as HTMLElement
    });

    modelerRef.current = bpmnModeler;

    bpmnModeler.importXML(qrDiagram).then(() => {
      const canvas = bpmnModeler.get('canvas') as {
        zoom: (arg: string) => void;
      };
      const overlays = bpmnModeler.get('overlays') as {
        add: (
          elementId: string,
          type: string,
          options: Record<string, any>
        ) => void;
      };

      // Zoom to fit full viewport
      canvas.zoom('fit-viewport');

      // === Add overlays ===

      // Simple overlay
      overlays.add('SCAN_OK', 'note', {
        position: { bottom: 0, right: 0 },
        html: '<div class="diagram-note">Mixed up the labels?</div>'
      });

      // Non-scaling overlay
      overlays.add('START_PROCESS', 'note', {
        position: { bottom: 0, right: 0 },
        scale: false,
        html: '<div class="diagram-note">I don\'t scale</div>'
      });

      // Non-shrinking overlay
      overlays.add('SCAN_QR_CODE', 'note', {
        position: { bottom: 0, right: 0 },
        scale: { min: 1 },
        html: '<div class="diagram-note">I don\'t shrink beyond 100%</div>'
      });

      // Hidden at low zoom
      overlays.add('END_PROCESS', 'note', {
        position: { bottom: 0, right: 0 },
        show: { minZoom: 0.7 },
        html: '<div class="diagram-note">I hide at low zoom levels</div>'
      });

    }).catch(err => {
      console.error('could not import BPMN 2.0 diagram', err);
    });

    return () => {
      bpmnModeler.destroy();
    };
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <div ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default OverlayModeler;