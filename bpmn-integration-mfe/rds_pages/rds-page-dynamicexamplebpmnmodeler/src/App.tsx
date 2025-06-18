import React, { Suspense } from "react";
                import DynamicExampleBpmnModeler from "./DynamicExampleBpmnModeler/DynamicExampleBpmnModeler";
                
                const App = () => (
                    <Suspense>
                        <DynamicExampleBpmnModeler></DynamicExampleBpmnModeler>
                    </Suspense>
                );
                export default App;