import React, { Suspense } from "react";
                import PropertyPanelModeler from "./PropertyPanelModeler/PropertyPanelModeler";
                
                const App = () => (
                    <Suspense>
                        <PropertyPanelModeler></PropertyPanelModeler>
                    </Suspense>
                );
                export default App;