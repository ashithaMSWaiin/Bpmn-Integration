import type { Config } from "@jest/types";
import { defaults } from "jest-config";
// Sync object
const config: Config.InitialOptions = {
    moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx", "js", "jsx", "mts"],
    preset: "ts-jest",
    testEnvironment: "jsdom",
  moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/emptyMock.js",
        "^raaghu-react-elements$": "<rootDir>/node_modules/raaghu-react-elements/dist/types/index.d.ts"
    },
    moduleDirectories: ["node_modules", "../../../bpmn-integration-elements/src","../../../bpmn-integration-components/src","../../../bpmn-integration-react-core/src/index.tsx","../../libs/state-management/hooks.ts"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.jsx?$": "babel-jest"
    },    
    transformIgnorePatterns: [
        ...defaults.transformIgnorePatterns,
        '<rootDir>/node_modules/(?!(lodash-es)/)', // Your existing pattern
        '/node_modules/(?!.*\\.css$)', // Ignore CSS files
      ],
};
export default config;