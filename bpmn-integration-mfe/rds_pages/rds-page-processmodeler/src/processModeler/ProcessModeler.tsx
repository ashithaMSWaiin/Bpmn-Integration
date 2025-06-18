
import React,{ useState, useEffect } from 'react';
import { RdsCompBpmnEditor } from "../../../rds-components";
// Uncomment the following line to use the BPMN modeler library
// Uncomment the following line to use axios for API calls

const ProcessModeler = () => {
  const [bpmnXml, setBpmnXml] = useState(
    ` <?xml version="1.0" encoding="UTF-8"?>
  <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
    xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
    xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
    id="Definitions_1"
    targetNamespace="http://bpmn.io/schema/bpmn">
    <bpmn:process id="Process_1" isExecutable="false">
      <bpmn:startEvent id="StartEvent_1" name="Start" />
      <bpmn:task id="Task_1" name="Processing" />
      <bpmn:serviceTask id="Task_2" name="Send Email" />
      <bpmn:serviceTask id="Task_3" name="Send SMS" />
      <bpmn:endEvent id="EndEvent_1" name="End" />
      <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Task_1" />
      <bpmn:sequenceFlow id="Flow_2" sourceRef="Task_1" targetRef="Task_2" />
      <bpmn:sequenceFlow id="Flow_3" sourceRef="Task_2" targetRef="Task_3" />
      <bpmn:sequenceFlow id="Flow_4" sourceRef="Task_3" targetRef="EndEvent_1" />
    </bpmn:process>
    <bpmndi:BPMNDiagram id="BPMNDiagram_1">
      <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1"/>
    </bpmndi:BPMNDiagram>
  </bpmn:definitions>`);
//     `<?xml version="1.0" encoding="UTF-8"?>
// <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0yriamp" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="18.6.1">
//   <bpmn:process id="Process_0akjit5" isExecutable="false">
//     <bpmn:startEvent id="StartEvent_123dnsg" name="start">
//       <bpmn:outgoing>Flow_1ixesed</bpmn:outgoing>
//       <bpmn:dataOutputAssociation id="DataOutputAssociation_11zrlts">
//         <bpmn:targetRef>DataStoreReference_1rzv5bo</bpmn:targetRef>
//       </bpmn:dataOutputAssociation>
//     </bpmn:startEvent>
//     <bpmn:task id="Activity_0vamxl7" name="Send Email">
//       <bpmn:incoming>Flow_1ixesed</bpmn:incoming>
//       <bpmn:incoming>Flow_0ww3xjx</bpmn:incoming>
//     </bpmn:task>
//     <bpmn:sequenceFlow id="Flow_1ixesed" sourceRef="StartEvent_123dnsg" targetRef="Activity_0vamxl7" />
//     <bpmn:exclusiveGateway id="Gateway_18sw7xa" name="Processing">
//       <bpmn:outgoing>Flow_0jquo6a</bpmn:outgoing>
//     </bpmn:exclusiveGateway>
//     <bpmn:task id="Activity_1hhj80i" name="Send SMS">
//       <bpmn:incoming>Flow_0jquo6a</bpmn:incoming>
//       <bpmn:outgoing>Flow_0vbev6z</bpmn:outgoing>
//     </bpmn:task>
//     <bpmn:sequenceFlow id="Flow_0jquo6a" sourceRef="Gateway_18sw7xa" targetRef="Activity_1hhj80i" />
//     <bpmn:intermediateThrowEvent id="Event_111la6r" name="End">
//       <bpmn:incoming>Flow_0vbev6z</bpmn:incoming>
//       <bpmn:incoming>Flow_1u3ggkp</bpmn:incoming>
//     </bpmn:intermediateThrowEvent>
//     <bpmn:sequenceFlow id="Flow_0vbev6z" sourceRef="Activity_1hhj80i" targetRef="Event_111la6r" />
//     <bpmn:dataStoreReference id="DataStoreReference_1rzv5bo" name="Store Data" />
//     <bpmn:startEvent id="Event_0l1z8yz" name="Recheck">
//       <bpmn:outgoing>Flow_0ww3xjx</bpmn:outgoing>
//       <bpmn:outgoing>Flow_1u3ggkp</bpmn:outgoing>
//     </bpmn:startEvent>
//     <bpmn:sequenceFlow id="Flow_0ww3xjx" sourceRef="Event_0l1z8yz" targetRef="Activity_0vamxl7" />
//     <bpmn:sequenceFlow id="Flow_1u3ggkp" sourceRef="Event_0l1z8yz" targetRef="Event_111la6r" />
//   </bpmn:process>
//   <bpmndi:BPMNDiagram id="BPMNDiagram_1">
//     <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_0akjit5">
//       <bpmndi:BPMNShape id="Gateway_18sw7xa_di" bpmnElement="Gateway_18sw7xa" isMarkerVisible="true">
//         <dc:Bounds x="295" y="415" width="50" height="50" />
//         <bpmndi:BPMNLabel>
//           <dc:Bounds x="293" y="472" width="55" height="14" />
//         </bpmndi:BPMNLabel>
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNShape id="Activity_1hhj80i_di" bpmnElement="Activity_1hhj80i">
//         <dc:Bounds x="400" y="400" width="100" height="80" />
//         <bpmndi:BPMNLabel />
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNShape id="Event_111la6r_di" bpmnElement="Event_111la6r">
//         <dc:Bounds x="562" y="422" width="36" height="36" />
//         <bpmndi:BPMNLabel>
//           <dc:Bounds x="570" y="465" width="20" height="14" />
//         </bpmndi:BPMNLabel>
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNShape id="DataStoreReference_1rzv5bo_di" bpmnElement="DataStoreReference_1rzv5bo">
//         <dc:Bounds x="185" y="115" width="50" height="50" />
//         <bpmndi:BPMNLabel>
//           <dc:Bounds x="184" y="85" width="53" height="14" />
//         </bpmndi:BPMNLabel>
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNShape id="Event_0l1z8yz_di" bpmnElement="Event_0l1z8yz">
//         <dc:Bounds x="562" y="302" width="36" height="36" />
//         <bpmndi:BPMNLabel>
//           <dc:Bounds x="558" y="272" width="44" height="14" />
//         </bpmndi:BPMNLabel>
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNShape id="Activity_0vamxl7_di" bpmnElement="Activity_0vamxl7">
//         <dc:Bounds x="400" y="230" width="100" height="80" />
//         <bpmndi:BPMNLabel />
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_123dnsg">
//         <dc:Bounds x="192" y="232" width="36" height="36" />
//         <bpmndi:BPMNLabel>
//           <dc:Bounds x="199" y="275" width="23" height="14" />
//         </bpmndi:BPMNLabel>
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNEdge id="Flow_1ixesed_di" bpmnElement="Flow_1ixesed">
//         <di:waypoint x="228" y="250" />
//         <di:waypoint x="309" y="250" />
//         <di:waypoint x="320" y="420" />
//         <di:waypoint x="400" y="287" />
//       </bpmndi:BPMNEdge>
//       <bpmndi:BPMNEdge id="DataOutputAssociation_11zrlts_di" bpmnElement="DataOutputAssociation_11zrlts">
//         <di:waypoint x="210" y="232" />
//         <di:waypoint x="210" y="165" />
//       </bpmndi:BPMNEdge>
//       <bpmndi:BPMNEdge id="Flow_0jquo6a_di" bpmnElement="Flow_0jquo6a">
//         <di:waypoint x="345" y="440" />
//         <di:waypoint x="400" y="440" />
//       </bpmndi:BPMNEdge>
//       <bpmndi:BPMNEdge id="Flow_0vbev6z_di" bpmnElement="Flow_0vbev6z">
//         <di:waypoint x="500" y="440" />
//         <di:waypoint x="562" y="440" />
//       </bpmndi:BPMNEdge>
//       <bpmndi:BPMNEdge id="Flow_1u3ggkp_di" bpmnElement="Flow_1u3ggkp">
//         <di:waypoint x="580" y="338" />
//         <di:waypoint x="580" y="422" />
//       </bpmndi:BPMNEdge>
//       <bpmndi:BPMNEdge id="Flow_0ww3xjx_di" bpmnElement="Flow_0ww3xjx">
//         <di:waypoint x="562" y="320" />
//         <di:waypoint x="531" y="320" />
//         <di:waypoint x="531" y="270" />
//         <di:waypoint x="500" y="270" />
//       </bpmndi:BPMNEdge>
//     </bpmndi:BPMNPlane>
//   </bpmndi:BPMNDiagram>
// </bpmn:definitions>
// `);
//     <?xml version="1.0" encoding="UTF-8"?>
// <definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" targetNamespace="" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL http://www.omg.org/spec/BPMN/2.0/20100501/BPMN20.xsd">
//   <collaboration id="sid-c0e745ff-361e-4afb-8c8d-2a1fc32b1424">
//     <participant id="sid-87F4C1D6-25E1-4A45-9DA7-AD945993D06F" name="Customer" processRef="sid-C3803939-0872-457F-8336-EAE484DC4A04" />
//   </collaboration>
//   <process id="sid-C3803939-0872-457F-8336-EAE484DC4A04" name="Customer" processType="None" isClosed="false" isExecutable="false">
//     <extensionElements />
//     <laneSet id="sid-b167d0d7-e761-4636-9200-76b7f0e8e83a">
//       <lane id="sid-57E4FE0D-18E4-478D-BC5D-B15164E93254">
//         <flowNodeRef>sid-52EB1772-F36E-433E-8F5B-D5DFD26E6F26</flowNodeRef>
//         <flowNodeRef>sid-E49425CF-8287-4798-B622-D2A7D78EF00B</flowNodeRef>
//         <flowNodeRef>sid-D7F237E8-56D0-4283-A3CE-4F0EFE446138</flowNodeRef>
//         <flowNodeRef>sid-E433566C-2289-4BEB-A19C-1697048900D2</flowNodeRef>
//         <flowNodeRef>sid-5134932A-1863-4FFA-BB3C-A4B4078B11A9</flowNodeRef>
//         <flowNodeRef>SCAN_OK</flowNodeRef>
//       </lane>
//     </laneSet>
//     <task id="sid-52EB1772-F36E-433E-8F5B-D5DFD26E6F26" name="Scan QR code">
//       <incoming>sid-4DC479E5-5C20-4948-BCFC-9EC5E2F66D8D</incoming>
//       <outgoing>sid-EE8A7BA0-5D66-4F8B-80E3-CC2751B3856A</outgoing>
//     </task>
//     <task id="sid-E49425CF-8287-4798-B622-D2A7D78EF00B" name="Open product information in mobile  app">
//       <incoming>sid-8B820AF5-DC5C-4618-B854-E08B71FB55CB</incoming>
//       <outgoing>sid-57EB1F24-BD94-479A-BF1F-57F1EAA19C6C</outgoing>
//     </task>
//     <startEvent id="sid-D7F237E8-56D0-4283-A3CE-4F0EFE446138" name="Notices&#10;QR code">
//       <outgoing>sid-7B791A11-2F2E-4D80-AFB3-91A02CF2B4FD</outgoing>
//     </startEvent>
//     <endEvent id="sid-E433566C-2289-4BEB-A19C-1697048900D2" name="Is informed">
//       <incoming>sid-57EB1F24-BD94-479A-BF1F-57F1EAA19C6C</incoming>
//     </endEvent>
//     <exclusiveGateway id="sid-5134932A-1863-4FFA-BB3C-A4B4078B11A9">
//       <incoming>sid-7B791A11-2F2E-4D80-AFB3-91A02CF2B4FD</incoming>
//       <incoming>sid-337A23B9-A923-4CCE-B613-3E247B773CCE</incoming>
//       <outgoing>sid-4DC479E5-5C20-4948-BCFC-9EC5E2F66D8D</outgoing>
//     </exclusiveGateway>
//     <exclusiveGateway id="SCAN_OK" name="Scan successful?&#10;">
//       <incoming>sid-EE8A7BA0-5D66-4F8B-80E3-CC2751B3856A</incoming>
//       <outgoing>sid-8B820AF5-DC5C-4618-B854-E08B71FB55CB</outgoing>
//       <outgoing>sid-337A23B9-A923-4CCE-B613-3E247B773CCE</outgoing>
//     </exclusiveGateway>
//     <sequenceFlow id="sid-337A23B9-A923-4CCE-B613-3E247B773CCE" name="Yes" sourceRef="SCAN_OK" targetRef="sid-5134932A-1863-4FFA-BB3C-A4B4078B11A9" />
//     <sequenceFlow id="sid-4DC479E5-5C20-4948-BCFC-9EC5E2F66D8D" sourceRef="sid-5134932A-1863-4FFA-BB3C-A4B4078B11A9" targetRef="sid-52EB1772-F36E-433E-8F5B-D5DFD26E6F26" />
//     <sequenceFlow id="sid-8B820AF5-DC5C-4618-B854-E08B71FB55CB" name="No" sourceRef="SCAN_OK" targetRef="sid-E49425CF-8287-4798-B622-D2A7D78EF00B" />
//     <sequenceFlow id="sid-57EB1F24-BD94-479A-BF1F-57F1EAA19C6C" sourceRef="sid-E49425CF-8287-4798-B622-D2A7D78EF00B" targetRef="sid-E433566C-2289-4BEB-A19C-1697048900D2" />
//     <sequenceFlow id="sid-EE8A7BA0-5D66-4F8B-80E3-CC2751B3856A" sourceRef="sid-52EB1772-F36E-433E-8F5B-D5DFD26E6F26" targetRef="SCAN_OK" />
//     <sequenceFlow id="sid-7B791A11-2F2E-4D80-AFB3-91A02CF2B4FD" sourceRef="sid-D7F237E8-56D0-4283-A3CE-4F0EFE446138" targetRef="sid-5134932A-1863-4FFA-BB3C-A4B4078B11A9" />
//   </process>
//   <bpmndi:BPMNDiagram id="sid-74620812-92c4-44e5-949c-aa47393d3830">
//     <bpmndi:BPMNPlane id="sid-cdcae759-2af7-4a6d-bd02-53f3352a731d" bpmnElement="sid-c0e745ff-361e-4afb-8c8d-2a1fc32b1424">
//       <bpmndi:BPMNShape id="sid-87F4C1D6-25E1-4A45-9DA7-AD945993D06F_gui" bpmnElement="sid-87F4C1D6-25E1-4A45-9DA7-AD945993D06F" isHorizontal="true">
//         <omgdc:Bounds x="83" y="105" width="933" height="250" />
//         <bpmndi:BPMNLabel labelStyle="sid-84cb49fd-2f7c-44fb-8950-83c3fa153d3b">
//           <omgdc:Bounds x="47.49999999999999" y="170.42857360839844" width="12.000000000000014" height="59.142852783203125" />
//         </bpmndi:BPMNLabel>
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNShape id="sid-57E4FE0D-18E4-478D-BC5D-B15164E93254_gui" bpmnElement="sid-57E4FE0D-18E4-478D-BC5D-B15164E93254" isHorizontal="true">
//         <omgdc:Bounds x="113" y="105" width="903" height="250" />
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNShape id="sid-52EB1772-F36E-433E-8F5B-D5DFD26E6F26_gui" bpmnElement="sid-52EB1772-F36E-433E-8F5B-D5DFD26E6F26">
//         <omgdc:Bounds x="393" y="170" width="100" height="80" />
//         <bpmndi:BPMNLabel labelStyle="sid-84cb49fd-2f7c-44fb-8950-83c3fa153d3b">
//           <omgdc:Bounds x="360.5" y="172" width="84" height="12" />
//         </bpmndi:BPMNLabel>
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNShape id="sid-E49425CF-8287-4798-B622-D2A7D78EF00B_gui" bpmnElement="sid-E49425CF-8287-4798-B622-D2A7D78EF00B">
//         <omgdc:Bounds x="728" y="170" width="100" height="80" />
//         <bpmndi:BPMNLabel labelStyle="sid-84cb49fd-2f7c-44fb-8950-83c3fa153d3b">
//           <omgdc:Bounds x="695.9285736083984" y="162" width="83.14285278320312" height="36" />
//         </bpmndi:BPMNLabel>
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNEdge id="sid-EE8A7BA0-5D66-4F8B-80E3-CC2751B3856A_gui" bpmnElement="sid-EE8A7BA0-5D66-4F8B-80E3-CC2751B3856A">
//         <omgdi:waypoint x="493" y="210" />
//         <omgdi:waypoint x="585" y="210" />
//         <bpmndi:BPMNLabel>
//           <omgdc:Bounds x="494" y="185" width="90" height="20" />
//         </bpmndi:BPMNLabel>
//       </bpmndi:BPMNEdge>
//       <bpmndi:BPMNEdge id="sid-8B820AF5-DC5C-4618-B854-E08B71FB55CB_gui" bpmnElement="sid-8B820AF5-DC5C-4618-B854-E08B71FB55CB">
//         <omgdi:waypoint x="635" y="210" />
//         <omgdi:waypoint x="728" y="210" />
//         <bpmndi:BPMNLabel labelStyle="sid-e0502d32-f8d1-41cf-9c4a-cbb49fecf581">
//           <omgdc:Bounds x="642" y="185" width="16" height="12" />
//         </bpmndi:BPMNLabel>
//       </bpmndi:BPMNEdge>
//       <bpmndi:BPMNEdge id="sid-7B791A11-2F2E-4D80-AFB3-91A02CF2B4FD_gui" bpmnElement="sid-7B791A11-2F2E-4D80-AFB3-91A02CF2B4FD">
//         <omgdi:waypoint x="223" y="210" />
//         <omgdi:waypoint x="275" y="210" />
//         <bpmndi:BPMNLabel>
//           <omgdc:Bounds x="204" y="185" width="90" height="20" />
//         </bpmndi:BPMNLabel>
//       </bpmndi:BPMNEdge>
//       <bpmndi:BPMNEdge id="sid-4DC479E5-5C20-4948-BCFC-9EC5E2F66D8D_gui" bpmnElement="sid-4DC479E5-5C20-4948-BCFC-9EC5E2F66D8D">
//         <omgdi:waypoint x="325" y="210" />
//         <omgdi:waypoint x="393" y="210" />
//         <bpmndi:BPMNLabel>
//           <omgdc:Bounds x="314" y="185" width="90" height="20" />
//         </bpmndi:BPMNLabel>
//       </bpmndi:BPMNEdge>
//       <bpmndi:BPMNEdge id="sid-57EB1F24-BD94-479A-BF1F-57F1EAA19C6C_gui" bpmnElement="sid-57EB1F24-BD94-479A-BF1F-57F1EAA19C6C">
//         <omgdi:waypoint x="828" y="210" />
//         <omgdi:waypoint x="901" y="210" />
//         <bpmndi:BPMNLabel>
//           <omgdc:Bounds x="820" y="185" width="90" height="20" />
//         </bpmndi:BPMNLabel>
//       </bpmndi:BPMNEdge>
//       <bpmndi:BPMNEdge id="sid-337A23B9-A923-4CCE-B613-3E247B773CCE_gui" bpmnElement="sid-337A23B9-A923-4CCE-B613-3E247B773CCE">
//         <omgdi:waypoint x="611" y="234" />
//         <omgdi:waypoint x="610.5" y="299" />
//         <omgdi:waypoint x="300.5" y="299" />
//         <omgdi:waypoint x="301" y="234" />
//         <bpmndi:BPMNLabel labelStyle="sid-e0502d32-f8d1-41cf-9c4a-cbb49fecf581">
//           <omgdc:Bounds x="585" y="236" width="21" height="12" />
//         </bpmndi:BPMNLabel>
//       </bpmndi:BPMNEdge>
//       <bpmndi:BPMNShape id="StartEvent_0l6sgn0_di" bpmnElement="sid-D7F237E8-56D0-4283-A3CE-4F0EFE446138">
//         <omgdc:Bounds x="187" y="192" width="36" height="36" />
//         <bpmndi:BPMNLabel>
//           <omgdc:Bounds x="182" y="229" width="46" height="24" />
//         </bpmndi:BPMNLabel>
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNShape id="EndEvent_0xwuvv5_di" bpmnElement="sid-E433566C-2289-4BEB-A19C-1697048900D2">
//         <omgdc:Bounds x="901" y="192" width="36" height="36" />
//         <bpmndi:BPMNLabel>
//           <omgdc:Bounds x="892" y="231" width="56" height="12" />
//         </bpmndi:BPMNLabel>
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNShape id="ExclusiveGateway_1g0eih2_di" bpmnElement="sid-5134932A-1863-4FFA-BB3C-A4B4078B11A9" isMarkerVisible="true">
//         <omgdc:Bounds x="275" y="185" width="50" height="50" />
//         <bpmndi:BPMNLabel>
//           <omgdc:Bounds x="210" y="160" width="90" height="12" />
//         </bpmndi:BPMNLabel>
//       </bpmndi:BPMNShape>
//       <bpmndi:BPMNShape id="ExclusiveGateway_0vci1x5_di" bpmnElement="SCAN_OK" isMarkerVisible="true">
//         <omgdc:Bounds x="585" y="185" width="50" height="50" />
//         <bpmndi:BPMNLabel>
//           <omgdc:Bounds x="568" y="157" width="88" height="24" />
//         </bpmndi:BPMNLabel>
//       </bpmndi:BPMNShape>
//     </bpmndi:BPMNPlane>
//     <bpmndi:BPMNLabelStyle id="sid-e0502d32-f8d1-41cf-9c4a-cbb49fecf581">
//       <omgdc:Font name="Arial" size="11" isBold="false" isItalic="false" isUnderline="false" isStrikeThrough="false" />
//     </bpmndi:BPMNLabelStyle>
//     <bpmndi:BPMNLabelStyle id="sid-84cb49fd-2f7c-44fb-8950-83c3fa153d3b">
//       <omgdc:Font name="Arial" size="12" isBold="false" isItalic="false" isUnderline="false" isStrikeThrough="false" />
//     </bpmndi:BPMNLabelStyle>
//   </bpmndi:BPMNDiagram>
// </definitions>`);

  useEffect(() => {
    // axios.get('/api/app/process-models/sample-id').then((res) => {
    //   setBpmnXml(res.data.xml);
    // });
  }, []);
const handleCustomAction = (elementId: string) => {
    alert(`Custom action triggered for element: ${elementId}`);
    // e.g., open QR scanner modal here
  };
  const saveHandler = async (xml: string) => {
    debugger;
    setBpmnXml(xml);
    // Here you would typically send the XML to your backend API to save it
    console.log('Saving BPMN XML:', xml);
    // await axios.post('/api/app/process-models/sample-id', { xml });
    alert('Saved!');
  };

  return <RdsCompBpmnEditor xml={bpmnXml} onSave={saveHandler} onCustomAction={handleCustomAction}  />;
};

export default ProcessModeler;
