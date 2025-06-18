import React, { Suspense } from "react";
                import TranslateBpmnModeler from "./translateBpmnModeler/TranslateBpmnModeler";
                
                const App = () => (
                    <Suspense>
                        <TranslateBpmnModeler></TranslateBpmnModeler>
                    </Suspense>
                );
                export default App;