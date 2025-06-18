import React, { Suspense } from "react";
                import TransactionBoundaryModeler from "./transactionBoundaryModeler/TransactionBoundaryModeler";
                
                const App = () => (
                    <Suspense>
                        <TransactionBoundaryModeler></TransactionBoundaryModeler>
                    </Suspense>
                );
                export default App;