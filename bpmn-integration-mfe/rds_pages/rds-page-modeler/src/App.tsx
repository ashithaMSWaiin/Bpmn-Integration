import React, { Suspense } from "react";
                import Modeler from "./modeler/Modeler";
                
                const App = () => (
                    <Suspense>
                        <Modeler></Modeler>
                    </Suspense>
                );
                export default App;