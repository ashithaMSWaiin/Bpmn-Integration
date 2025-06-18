import React, { Suspense } from "react";
                import BpmnModeler from "./BpmnModeler/BpmnModeler";
                
                const App = () => (
                    <Suspense>
                        <BpmnModeler></BpmnModeler>
                    </Suspense>
                );
                export default App;