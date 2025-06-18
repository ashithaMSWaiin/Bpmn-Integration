import React, { Suspense } from "react";
                import ColorModeler from "./ColorModeler/ColorModeler";
                
                const App = () => (
                    <Suspense>
                        <ColorModeler></ColorModeler>
                    </Suspense>
                );
                export default App;