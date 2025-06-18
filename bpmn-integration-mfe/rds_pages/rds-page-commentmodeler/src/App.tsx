import React, { Suspense } from "react";
                import CommentModeler from "./CommentModeler/CommentModeler";
                
                const App = () => (
                    <Suspense>
                        <CommentModeler></CommentModeler>
                    </Suspense>
                );
                export default App;