import React, { useEffect, useRef } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';

const diagramUrl = 'https://cdn.statically.io/gh/bpmn-io/bpmn-js-examples/main/colors/resources/pizza-collaboration.bpmn';

const ColorModeler: React.FC = () => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const modelerRef = useRef<BpmnModeler | null>(null);

	const showDiagram = async (modeler: BpmnModeler, diagramXML: string) => {
		try {
			await modeler.importXML(diagramXML);
			const overlays = modeler.get('overlays') as any;
			const canvas = modeler.get('canvas') as any;
			const elementRegistry = modeler.get('elementRegistry') as any;
			const modeling = modeler.get('modeling') as any;

			canvas.zoom('fit-viewport');

			// Option 1: Overlay highlight on CalmCustomerTask
			const calmShape = elementRegistry.get('CalmCustomerTask');
			if (calmShape) {
				const olDiv = document.createElement('div');
				olDiv.className = 'highlight-overlay';
				olDiv.style.width = `${calmShape.width}px`;
				olDiv.style.height = `${calmShape.height}px`;
				overlays.add('CalmCustomerTask', {
					position: { top: 0, left: 0 },
					html: olDiv
				});
			}
			// Option 2: Color via modeling on SelectAPizzaTask
			const selectShape = elementRegistry.get('SelectAPizzaTask');
			if (selectShape) {
				modeling.setColor([selectShape], {
					stroke: 'green',
					fill: 'rgb(152, 203, 152)'
				});
			}
			// Option 3: Marker + CSS highlight for OrderReceivedEvent
			canvas.addMarker('OrderReceivedEvent', 'highlight');

		} catch (err) {
			console.error('Error importing BPMN diagram', err);
		}
	};

	useEffect(() => {
		let modeler: BpmnModeler | null = null;
		if (containerRef.current) {
			modeler = new BpmnModeler({ container: containerRef.current });
			modelerRef.current = modeler;
			fetch(diagramUrl)
				.then(res => res.text())
				.then(diagramXML => showDiagram(modeler!, diagramXML))
				.catch((err: any) => console.error('Failed to load BPMN XML', err));
		}
		return () => {
			if (modeler) {
				modeler.destroy();
			}
		};
	}, []);

	return (
		<div style={{ height: '100vh', width: '100%' }}>
			<div
				ref={containerRef}
				id="diagram"
				style={{ height: '90%', width: '100%', border: '1px solid #ccc' }}
			/>
			{/* Inline highlight styles */}
			<style>{`
				.highlight:not(.djs-connection) .djs-visual > :nth-child(1) {
					fill: green !important;
				}
				.highlight-overlay {
					background-color: green;
					opacity: 0.4;
					pointer-events: none;
					border-radius: 10px;
				}
			`}</style>
		</div>
	);
};

export default ColorModeler;
