import React, { Suspense } from "react";
                import ExampleBpmnModeler from "./ExampleBpmnModeler/ExampleBpmnModeler";
                
                const App = () => (
                    <Suspense>
                        <ExampleBpmnModeler></ExampleBpmnModeler>
                    </Suspense>
                );
                export default App;