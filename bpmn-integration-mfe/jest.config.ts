import type { Config } from "@jest/types";
import { defaults } from "jest-config";
// Sync object
const config: Config.InitialOptions = {
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", ...defaults.moduleFileExtensions],
    preset: "ts-jest",
    testEnvironment: "jsdom",
  moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.ts",
        "^raaghu-react-elements$": "<rootDir>/node_modules/raaghu-react-elements/dist/types/index.d.ts",
        "^raaghu-react-components$": "<rootDir>/node_modules/raaghu-react-components/dist/types/index.d.ts"
    },
    moduleDirectories: ["node_modules", "../../../bpmn-integration-elements/src","../../../bpmn-integration-components/src","../../../bpmn-integration-react-core/src/index.tsx","../../libs/state-management/hooks.ts"],
   transform: {
    "^.+\\.tsx?$": "ts-jest",
},    
    transformIgnorePatterns: ["<rootDir>/node_modules/(?!(lodash-es)/)"]
};
export default config;