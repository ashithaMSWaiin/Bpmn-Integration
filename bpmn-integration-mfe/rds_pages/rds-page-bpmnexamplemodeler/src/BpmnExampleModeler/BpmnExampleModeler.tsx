import React, { useEffect, useRef, useState } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import {
    RdsModal
} from  "../../../rds-elements"
type TypeMapKey = 'flowactivity' | 'flowdecision' | 'flowterminator';
              const BpmnExampleModeler = ()=>{
                      const bpmnRef = useRef<HTMLDivElement | null>(null);
const modelerRef = useRef<BpmnModeler | null>(null);
 const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTaskData, setSelectedTaskData] = useState<Array<{ tools: string; response: string; norm: string }>>([]);
 const [taskName, setTaskName] = useState<string>('');

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

  const generateBPMN = () => {
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
{/* <bpmn:subProcess id="SubProcess_1" name="Box" triggeredByEvent="false"> */}
    //  </bpmn:subProcess>
//      
// <bpmndi:BPMNShape id="SubProcess_1_di" bpmnElement="SubProcess_1" isExpanded="true">
//         <omgdc:Bounds x="150" y="150" width="850" height="400"/>
//       </bpmndi:BPMNShape>

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
 // Function to open modal with data
  const handleShapeClick = (taskShape:any,taskName:any) => {
    // Example: populate with your data
    const data = [
      { tools: 'Tool 1', response: 'Response 1', norm: 'Norm 1' },
      { tools: 'Tool 2', response: 'Response 2', norm: 'Norm 2' },
    ];
    setSelectedTaskData(data);
    setTaskName(taskName);
    setModalOpen(true);
  };

  useEffect(() => {
    if (!bpmnRef.current) return;
    const bpmnModeler = new BpmnModeler({ container: bpmnRef.current as HTMLElement});
    modelerRef.current = bpmnModeler;
    const diagramXML = generateBPMN();
    console.log('Generated BPMN XML:', diagramXML);
    bpmnModeler.importXML(diagramXML).then(() => {

if (!modelerRef.current) return;
    const elementRegistry = modelerRef.current.get('elementRegistry') as { filter: (fn: (element: any) => boolean) => any[]; get: (id: string) => any; };
    const modeling = modelerRef.current.get('modeling') as any;
       const eventBus = modelerRef.current.get('eventBus') as {
   on: (event: string, callback: (e: any) => void) => void;
 };

 // Single click handler with delay
eventBus.on('element.click', function (event:any) {
  debugger;
    const element = event.element;
    const businessObject = element.businessObject;

    // Check if the clicked shape is the specific task
    if (businessObject && element.type ==='bpmn:Task') {
   handleShapeClick(event,element.businessObject.name);
    }
  });
    const shapesWithNameTask = elementRegistry.filter(
      (element: any) => element.businessObject && element.type ==='bpmn:Task');

    if (shapesWithNameTask.length > 0) {
      shapesWithNameTask.forEach((selectShape: any) => {
 
//  selectShape.$on('click', () => handleShapeClick(selectShape));
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
          fill: 'rgb(136, 136, 135)'
        });
      });
    }
     const conditnGateway = elementRegistry
      .filter((element: any) => element.businessObject && element.businessObject.name === 'Cond 1' && element.type === 'bpmn:ExclusiveGateway')
      .find(() => true);

 // Set color for the condition gateway
    if (conditnGateway) {
       modeling.setColor([conditnGateway], {
          stroke: 'blue',
          fill: 'rgb(85, 208, 241)'
        });
      }

    }).catch(err => console.error('Failed to load diagram', err));
  }, []);
const handleSave = async () => {
    if (modelerRef.current) {
      try {
        const { xml } = await modelerRef.current.saveXML({ format: true });
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
    <h2>Dynamic BPMN Diagram</h2>
    <div ref={bpmnRef} style={{ height: '600px', border: '1px solid #ccc' }}></div>
    <button onClick={handleSave}>Save BPMN</button>
    <style>
      {`
  
        .djs-context-pad {
          display: none !important;
        }
        .djs-palette {
          display: none !important;
        }
      ` }
      </style>
{isModalOpen && (
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
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 50%;
        }
          

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px; /* Add some space below the header */
  }
  .modal-header h3 {
    margin: 0; /* Remove default margin */
  }
  .modal-header button {
    padding: 10px 20px; /* Adjust padding as needed */
    background-color: #007BFF; /* Button background color */
    color: white; /* Button text color */
    border: none; /* Remove border */
    border-radius: 4px; /* Rounded corners */
    cursor: pointer; /* Pointer cursor on hover */
  }
  .modal-header button:hover {
    background-color: #0056b3; /* Darker background on hover */
  }

      `}
    </style>
    <div className="modal-overlay">
      <div className="modal-content">
       
<div className="modal-header">
  <h3>Task Details - {taskName}</h3>
  <button style={{ marginLeft: 'auto' }} onClick={() => setModalOpen(false)}>
    x
  </button>
</div>

        <table>
          <thead>
            <tr>
              <th>Tools</th>
              <th>Response</th>
              <th>Norm</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan={2} style={{ width: '10%' }}>
                <a href="#" style={{ color: 'blue', textDecoration: 'underline' }}>0511123</a><br />
                <a href="#" style={{ color: 'blue', textDecoration: 'underline' }}>Test PDF</a><br />
                <a href="#" style={{ color: 'blue', textDecoration: 'underline' }}>Issue Q21</a>
              </td>
              <td rowSpan={2} style={{ width: '10%' }}>AZ</td>
              <td rowSpan={2} style={{ width: '10%' }}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </>
)}
  </div>
);
};
                export default BpmnExampleModeler;