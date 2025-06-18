import React, { Suspense } from "react";
                import OverlayModeler from "./overlayModeler/OverlayModeler";
                
                const App = () => (
                    <Suspense>
                        <OverlayModeler></OverlayModeler>
                    </Suspense>
                );
                export default App;