import React,{ useEffect, useRef } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import { debounce } from 'min-dash';

// import { BpmnPropertiesPanelModule, BpmnPropertiesProviderModule } from 'bpmn-js-properties-panel';
const BpmnPropertiesPanelModule: any = require('bpmn-js-properties-panel').BpmnPropertiesPanelModule;
const BpmnPropertiesProviderModule: any = require('bpmn-js-properties-panel').BpmnPropertiesProviderModule;
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import '@bpmn-io/properties-panel/assets/properties-panel.css';

const DIAGRAM_URL = 'https://cdn.statically.io/gh/bpmn-io/bpmn-js-examples/main/properties-panel/resources/newDiagram.bpmn';

//  '../resources/newDiagram.bpmn?raw'; // using ?raw if using Vite/Webpack loader

// Add missing type declaration for bpmn-js-properties-panel
// Place this in a .d.ts file in your project, e.g., src/types/bpmn-js-properties-panel.d.ts
// declare module 'bpmn-js-properties-panel';

type ModelerType = typeof BpmnModeler;

const PropertyPanelModeler = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const propertiesPanelRef = useRef<HTMLDivElement | null>(null);
  const downloadRef = useRef<HTMLAnchorElement | null>(null);
  const downloadSvgRef = useRef<HTMLAnchorElement | null>(null);
  const modelerRef = useRef<InstanceType<ModelerType> | null>(null);

  useEffect(() => {
    const modeler = new BpmnModeler({
      container: canvasRef.current as unknown as HTMLElement,
      propertiesPanel: {
        parent: propertiesPanelRef.current as unknown as HTMLElement
      },
      additionalModules: [
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule
      ]
    });

    modelerRef.current = modeler;

    // Fetch the BPMN XML at runtime
    fetch(DIAGRAM_URL)
      .then(response => response.text())
      .then((xml: string) => openDiagram(xml))
      .catch(err => console.error('Failed to fetch diagram XML', err));

    const exportArtifacts = debounce(async () => {
      try {
        const { svg } = await modeler.saveSVG();
        setEncoded(downloadSvgRef.current, 'diagram.svg', svg);
      } catch (err) {
        console.error('Error saving SVG: ', err);
      }

      try {
        const { xml } = await modeler.saveXML({ format: true });
        setEncoded(downloadRef.current, 'diagram.bpmn', xml ?? '');
      } catch (err) {
        console.error('Error saving XML: ', err);
      }
    }, 500);

    modeler.on('commandStack.changed', exportArtifacts);

    return () => {
      modeler.destroy();
    };
  }, []);

  const openDiagram = async (xml: string) => {
    try {
      if (modelerRef.current) {
        await modelerRef.current.importXML(xml);
      }
    } catch (err) {
      console.error('Failed to open diagram', err);
    }
  };

  const setEncoded = (link: HTMLAnchorElement | null, name: string, data: string) => {
    if (!link) return;
    const encodedData = encodeURIComponent(data);
    if (data) {
      link.classList.add('active');
      link.setAttribute('href', 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData);
      link.setAttribute('download', name);
    } else {
      link.classList.remove('active');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div id="js-canvas" ref={canvasRef} style={{ flex: 1, height: '100%' }}></div>
      <div
        id="js-properties-panel"
        ref={propertiesPanelRef}
        style={{ width: '300px', borderLeft: '1px solid #ccc', overflow: 'auto' }}
      ></div>

      <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
        <a ref={downloadRef} className="button" href="#" tabIndex={0}>Download BPMN</a> &nbsp;
        <a ref={downloadSvgRef} className="button" href="#" tabIndex={0}>Download SVG</a>
      </div>
    </div>
  );
};

export default PropertyPanelModeler;