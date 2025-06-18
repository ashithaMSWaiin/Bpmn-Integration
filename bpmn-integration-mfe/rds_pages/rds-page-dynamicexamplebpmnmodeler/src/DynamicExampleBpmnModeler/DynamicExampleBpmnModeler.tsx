import React,{ useEffect, useRef } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
type TypeMapKey = 'flowactivity' | 'flowdecision' | 'flowterminator';
const DynamicExampleBpmnModeler = () => {
  const bpmnRef = useRef<HTMLDivElement | null>(null);
  const modelerRef = useRef<BpmnModeler | null>(null);

  useEffect(() => {


  const inputData: Array<{
    id: string;
    type: TypeMapKey;
    label: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }> = [
    { id: "21245", type: "flowactivity", label: "Step 1", x: 2500, y: 1775, width: 2500, height: 1250 },
    { id: "21246", type: "flowdecision", label: "Cond 1", x: 2500, y: 4525, width: 2500, height: 1250 },
    { id: "21247", type: "flowactivity", label: "Step 2", x: 6250, y: 4525, width: 2500, height: 1250 },
    { id: "21248", type: "flowterminator", label: "End", x: 2500, y: 6775, width: 2500, height: 750 },
    { id: "21249", type: "flowterminator", label: "End", x: 6250, y: 8025, width: 2500, height: 750 }
  ];

  const connectionData = [
    { id: "15330", from: "21245", to: "21246", label: "", color: "#000000" },
    { id: "15331", from: "21246", to: "21247", label: "Yes", color: "#FF7F27" },
    { id: "15332", from: "21247", to: "21249", label: "", color: "#000000" },
    { id: "15333", from: "21246", to: "21248", label: "No", color: "#000000" }
  ];

  const typeMap = {
    flowactivity: 'bpmn:Task',
    flowdecision: 'bpmn:ExclusiveGateway',
    flowterminator: 'bpmn:EndEvent'
  };

  type DiagramElement = {
    id: string;
    type: TypeMapKey | string;
    label: string;
    x: number;
    y: number;
    width: number;
    height: number;
  };

  function getConnectionPoint(
    el: DiagramElement,
    target: DiagramElement,
    isSource: boolean
  ): { x: number; y: number } {
    const reduceFactor = 0.85;

    const { x, y, width, height } = scalePosition(el.x, el.y);
    const { x: tx, y: ty, width: tw, height: th } = scalePosition(target.x, target.y);

    const cx = x + width / 2;
    const cy = y + height / 2;
    const tcx = tx + tw / 2;
    const tcy = ty + th / 2;

    const dx = tcx - cx;
    const dy = tcy - cy;

    if (el.type === 'flowactivity') {
      if (Math.abs(dx) > Math.abs(dy)) {
        return {
          x: Math.round(cx + reduceFactor * (dx > 0 ? width / 2 : -width / 2)),
          y: Math.round(cy)
        };
      } else {
        return {
          x: Math.round(cx),
          y: Math.round(cy + reduceFactor * (dy > 0 ? height / 2 : -height / 2))
        };
      }
    }

    if (el.type === 'flowdecision') {
      const hw = width / 2;
      const hh = height / 2;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      let px = cx, py = cy;

      if (absDx * hh > absDy * hw) {
        const offsetX = (dx > 0 ? hw : -hw) * reduceFactor;
        px += offsetX;
        py += offsetX * (dy / dx);
      } else {
        const offsetY = (dy > 0 ? hh : -hh) * reduceFactor;
        px += offsetY * (dx / dy);
        py += offsetY;
      }
      return { x: Math.round(px), y: Math.round(py) };
    }

    if (el.type === 'flowterminator') {
      const r = (width / 2) * reduceFactor;
      const length = Math.sqrt(dx * dx + dy * dy);
      return {
        x: Math.round(cx + (dx / length) * r),
        y: Math.round(cy + (dy / length) * r)
      };
    }

    return { x: Math.round(cx), y: Math.round(cy) };
  }

  function scalePosition(x: number, y: number) {
    const minX = 2500, maxX = 6250;
    const minY = 1775, maxY = 8025;
    const targetMinX = 295, targetMaxX = 480;
    const targetMinY = 20, targetMaxY = 390;

    const scaledX = ((x - minX) / (maxX - minX)) * (targetMaxX - targetMinX) + targetMinX;
    const scaledY = ((y - minY) / (maxY - minY)) * (targetMaxY - targetMinY) + targetMinY;

    const scaleW = 100;
    const scaleH = 80;

    return {
      x: Math.round(scaledX),
      y: Math.round(scaledY),
      width: scaleW,
      height: scaleH
    };
  }

  function shortenLine(
    source: { x: number; y: number },
    target: { x: number; y: number },
    factor = 0.85
  ) {
    const dx = target.x - source.x;
    const dy = target.y - source.y;

    const adjustX = (1 - factor) * dx / 2;
    const adjustY = (1 - factor) * dy / 2;

    return {
      newSource: {
        x: Math.round(source.x + adjustX),
        y: Math.round(source.y + adjustY)
      },
      newTarget: {
        x: Math.round(target.x - adjustX),
        y: Math.round(target.y - adjustY)
      }
    };
  }

    const generateXML = () => {
  
    const elementMap = Object.fromEntries(
      inputData.map((el) => [el.id, el])
    );

    const shapes = inputData.map(el => {
      const bpmnType = typeMap[el.type];
      const bpmnId = `${bpmnType.split(':')[1]}_${el.id}`;
      return `
        <${bpmnType} id="${bpmnId}" name="${el.label}" />
      `;
    }).join('\n');

    const sequenceFlows = connectionData.map((conn, idx) => {
      const sourceEl = elementMap[conn.from];
      const targetEl = elementMap[conn.to];

      const sourceId = `${typeMap[sourceEl.type].split(':')[1]}_${sourceEl.id}`;
      const targetId = `${typeMap[targetEl.type].split(':')[1]}_${targetEl.id}`;
      const flowId = `Flow_${idx + 1}`;

      return `<bpmn:sequenceFlow id="${flowId}" sourceRef="${sourceId}" targetRef="${targetId}" name="${conn.label}" />`;
    }).join('\n');

    const shapeDi = inputData.map(el => {
      const bpmnType = typeMap[el.type];
      const bpmnId = `${bpmnType.split(':')[1]}_${el.id}`;
      const { x, y, width, height } = scalePosition(el.x, el.y);
      return `
        <bpmndi:BPMNShape id="${bpmnId}_di" bpmnElement="${bpmnId}">
          <omgdc:Bounds x="${x}" y="${y}" width="${width}" height="${height}" />
        </bpmndi:BPMNShape>
      `;
    }).join('\n');

    const edgeDi = connectionData.map((conn, idx) => {
      const sourceEl = elementMap[conn.from];
      const targetEl = elementMap[conn.to];

      const sourcePoint = getConnectionPoint(sourceEl, targetEl, true);
      const targetPoint = getConnectionPoint(targetEl, sourceEl, false);
      const { newSource, newTarget } = shortenLine(sourcePoint, targetPoint, 0.85);
      return `
        <bpmndi:BPMNEdge id="Flow_${idx + 1}_di" bpmnElement="Flow_${idx + 1}">
          <omgdi:waypoint x="${newSource.x}" y="${newSource.y}" />
          <omgdi:waypoint x="${newTarget.x}" y="${newTarget.y}" />
        </bpmndi:BPMNEdge>
      `;
    }).join('\n');


    return `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
                  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                  xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
                  xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
                  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                  id="Definitions_1"
                  targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
    ${shapes}
    ${sequenceFlows}
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      ${shapeDi}
      ${edgeDi}
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;
    };

    if (bpmnRef.current) {
      modelerRef.current = new BpmnModeler({ container: bpmnRef.current });
      const xml = generateXML();
	  console.log(xml); // Log the generated XML for debugging
      if (modelerRef.current) {
        modelerRef.current.importXML(xml).then(() => {
    if (!modelerRef.current) return;
    const elementRegistry = modelerRef.current.get('elementRegistry') as { filter: (fn: (element: any) => boolean) => any[]; get: (id: string) => any; };
    const modeling = modelerRef.current.get('modeling') as any;
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
     const conditnGateway = elementRegistry
      .filter((element: any) => element.businessObject && element.businessObject.name === 'Cond 1' && element.type === 'bpmn:ExclusiveGateway')
      .find(() => true);

// // const conditnGateway = conditnGateways.find((element: any) => element.type === 'bpmn:ExclusiveGateway');
    // Set color for the condition gateway
    if (conditnGateway) {
       modeling.setColor([conditnGateway], {
          stroke: 'blue',
          fill: 'rgb(85, 208, 241)'
        });
    }

  }).catch((err: unknown) => console.error(err));
      }
    }
    return () => {
      if (modelerRef.current) {
        modelerRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <style>
          {`
          table {
            width: 100%;
            border-collapse: collapse;
          }
          table, th, td {
            border: 1px solid black;
          }
          th, td {
            padding: 10px;
            text-align: left;
          }
            

  .bpmn-container {
    width: 100%;
    height: 600px !important; /* Adjust height as needed */
    overflow: auto;
    border: 1px solid #ccc;
  }

          `}
      </style>
      <table>
        <thead>
          <tr>
            <th>Workflow / Activity</th>
            <th>Description</th>
            <th>Tools</th>
            <th>Request</th>
            <th>Norms</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2} style={{ width: '70%', height: '600px' }}>
              <div style={{ width: '100%', height: '600px', overflow: 'auto' }} ref={bpmnRef}></div>
              <div>Step &amp; desc.</div>
            </td>
            <td rowSpan={2} style={{ width: '10%' }}>
              A2<br /><br /><br /><br /><br /><br /><br /><br />
              0511123<br />Test PDF<br />Issue Q21
            </td>
            <td rowSpan={2} style={{ width: '10%' }}></td>
            <td rowSpan={2} style={{ width: '10%' }}></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default DynamicExampleBpmnModeler;
