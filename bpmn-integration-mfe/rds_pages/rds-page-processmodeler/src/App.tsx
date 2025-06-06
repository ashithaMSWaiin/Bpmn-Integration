import React,{ Suspense } from "react";
import ProcessModeler from "./processModeler/ProcessModeler";
                const App = () => (
                    <Suspense>
                        <ProcessModeler/>
                    </Suspense>
                );
                export default App;