import React, { Suspense } from "react";
                import BpmnExampleModeler from "./BpmnExampleModeler/BpmnExampleModeler";
                
                const App = () => (
                    <Suspense>
                        <BpmnExampleModeler></BpmnExampleModeler>
                    </Suspense>
                );
                export default App;