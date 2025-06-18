import React, { Suspense } from "react";
                import PropertyPanelExtensionModeler from "./PropertyPanelExtensionModeler/PropertyPanelExtensionModeler";
                
                const App = () => (
                    <Suspense>
                        <PropertyPanelExtensionModeler></PropertyPanelExtensionModeler>
                    </Suspense>
                );
                export default App;