let path = require("path");
const { execSync } = require('child_process');
const fs = require("fs");

const jsonPath = require(`./${process.argv[3]}.json`)
const jsonProp = jsonPath.Properties
const jsonNavProp = jsonPath.NavigationProperties
const sliceReducerName = jsonPath.Name
const pluralName = jsonPath.NamePlural

function convertToCamelCase(string) {
  const camelCaseString = string.replace(/[-_](\w)/g, (_, match) => match.toUpperCase());
  return camelCaseString.replace(/^\w/, (match) => match.toLowerCase());
}
function convertToPascalCase(str) {
  const camelCaseString = str.replace(/[-_](\w)/g, (_, match) => match.toUpperCase());
  return camelCaseString.replace(/^\w/, (match) => match.toUpperCase());
}


function convertToPascalCasewithSpace(str) {
  const displayCaseString = str.replace(/([a-z])([A-Z])/g, '$1 $2');
  return displayCaseString.charAt(0).toUpperCase() + displayCaseString.slice(1);
}

const propInfoForGeneration = jsonProp.map((prop) => {
  if (prop.Type.includes("int")) {
    return {
      name: prop.Name,
      format: prop.Type,
      element: "RdsInput",
      showincreatemodal: prop.ShowOnCreateModal,
      showineditmodal: prop.ShowOnEditModal,
      showintable: prop.ShowOnList,
      isRequired: prop.IsRequired,
      DefaultValue: prop.DefaultValue,
      IsTextArea: prop.IsTextArea,
      IsNullable: prop.IsNullable,
      MinValue: prop.MinValue,
      MaxValue: prop.MaxValue,
      Regex: prop.Regex,
      EmailValidation: prop.EmailValidation,
    }

  } else if (prop.Type.includes("string")) {
    return {
      name: prop.Name,
      format: prop.Type,
      element: "RdsInput",
      showincreatemodal: prop.ShowOnCreateModal,
      showineditmodal: prop.ShowOnEditModal,
      showintable: prop.ShowOnList,
      isRequired: prop.IsRequired,
      DefaultValue: prop.DefaultValue,
      IsTextArea: prop.IsTextArea,
      IsNullable: prop.IsNullable,
      MinValue: prop.MinValue,
      MaxValue: prop.MaxValue,
      Regex: prop.Regex,
      EmailValidation: prop.EmailValidation,
    }

  }
  else if (prop.Type == "enum") {
    return {
      name: prop.Name,
      format: prop.Type,
      element: "RdsSelectList",
      showincreatemodal: prop.ShowOnCreateModal,
      showineditmodal: prop.ShowOnEditModal,
      showintable: prop.ShowOnList,
      isRequired: prop.IsRequired,
      EnumValues: prop.EnumValues,
      DefaultValue: prop.DefaultValue,
      IsTextArea: prop.IsTextArea
    }

  }
  else if (prop.Type == "DateTime") {
    return {
      name: prop.Name,
      format: prop.Type,
      element: "RdsDatePicker",
      showincreatemodal: prop.ShowOnCreateModal,
      showineditmodal: prop.ShowOnEditModal,
      showintable: prop.ShowOnList,
      isRequired: prop.IsRequired,
      DefaultValue: prop.DefaultValue,
      IsTextArea: prop.IsTextArea
    }

  }
  else if (prop.Type == "bool") {

    return {
      name: prop.Name,
      format: prop.Type,
      element: "RdsCheckbox",
      showincreatemodal: prop.ShowOnCreateModal,
      showineditmodal: prop.ShowOnEditModal,
      showintable: prop.ShowOnList,
      isRequired: prop.IsRequired,
      DefaultValue: prop.DefaultValue,
      IsTextArea: prop.IsTextArea
    }


  } else {

    return {
      name: prop.Name,
      format: prop.Type,
      element: "RdsInput",
      showincreatemodal: prop.ShowOnCreateModal,
      showineditmodal: prop.ShowOnEditModal,
      showintable: prop.ShowOnList,
      isRequired: prop.IsRequired,
      DefaultValue: prop.DefaultValue,
      IsTextArea: prop.IsTextArea,
      IsNullable: prop.IsNullable,
      MinValue: prop.MinValue,
      MaxValue: prop.MaxValue,
      Regex: prop.Regex,
      EmailValidation: prop.EmailValidation,
    }
  }
})

const navPropInfoForGeneration = jsonNavProp.map((prop) => {
  return {
    DisplayName: prop.DisplayProperty,
    UiOption: prop.UiPickType,
    EntityName: prop.EntityName,
    IsRequired: prop.IsRequired,
    EntityDto: prop.DtoEntityName,
    propforcrud: prop.Name,
  }
})

const componentName = `Comp-${convertToCamelCase(`${sliceReducerName}`)}`;

// template for generating component's imports  
const componentImport = `
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";   
import {RdsButton,RdsLabel,RdsInput,RdsSelectList,RdsDatePicker,RdsCheckbox, RdsTextArea} from "../rds-elements";
import { RdsCompAlertPopup } from "..";

export interface Rds${convertToPascalCase(`${componentName}`)}Props {
  ${propInfoForGeneration.map((element) => element.name + "Prop?:any;").join("\n  ")}
  ${navPropInfoForGeneration.map((element) => element.EntityName + element.DisplayName + "Prop?:any;").join("\n  ")}
  create?:boolean;
  update?:boolean;
  onSaveHandler?: any;
  offCanvasType?:any;
  ${navPropInfoForGeneration.map((element) => `${element.EntityName}${element.DisplayName}ListProp?:any;`).join("\n  ")}
  ${propInfoForGeneration
    .filter((element) => element?.EnumValues)
    .map((prop) => {
      return `${prop.name}EnumItems?:any;`;
    })}
}
`;

// template for generating component's JS Logic  
const componentLogic = `
const Rds${convertToPascalCase(`${componentName}`)} = (props: Rds${convertToPascalCase(`${componentName}`)}Props) => {
const { t } = useTranslation();
const {
  ${propInfoForGeneration.map((element) => element.name + "Prop").join(",\n")}, 
  ${navPropInfoForGeneration.map((element) => element.EntityName + element.DisplayName + "Prop,").join("\n")}
  ${propInfoForGeneration
    .filter((element) => element?.EnumValues)
    .map((prop) => {
      return `${prop.name}EnumItems,`;
    })}
    ${navPropInfoForGeneration.map((element) => `${element.EntityName}${element.DisplayName}ListProp,`).join(",\n")}
  offCanvasType, 
  onSaveHandler,
} = props;

const [formValid, setFormValid] = useState(true);
const [operation, setOperation] = useState(offCanvasType);
const [data, setData] = useState({
  ${propInfoForGeneration.map((element) => {
      if (element.format == "DateTime") {
        return (
          element.name +
          ":" +
          `${element.name}Prop ? new Date(${element.name}Prop): new Date()`
        );
      }
      else {
        return element.name + ":" + element.name + "Prop";
      }
    }
    )},
  ${navPropInfoForGeneration.map((info) => {
      return `${info.EntityName}${info.DisplayName}: ${info.EntityName}${info.DisplayName}Prop`
    })}
  });


useEffect(()=>{
setOperation(offCanvasType)
},[offCanvasType])

useEffect(() => {

  const isValid = ( data.${propInfoForGeneration[0].name}${propInfoForGeneration
    .map((element, i) => {
      if (element.isRequired && i >= 1) {
        return ` && data.${element.name}`;
      } else {
        return ''
      }
    }).join(" ")}  ${navPropInfoForGeneration.map((element, i) => {
      if (element.IsRequired) {
        return `&& data.${element.EntityName}${element.DisplayName}`
      } else {
        return ''
      }
    }).join(" ")})
    
  setFormValid(!isValid);
}, [data]);



useEffect(() => {
  setData({ ${propInfoForGeneration.map((element) => {
      if (element.format != "DateTime") {
        return element.name + ":" + element.name + "Prop";
      } else {
        {
          return (
            element.name +
            ":" +
            `${element.name}Prop ? new Date(${element.name}Prop): new Date()`
          );
        }
      }
    })},
${navPropInfoForGeneration.map((info) => {
      return `${info.EntityName}${info.DisplayName}: ${info.EntityName}${info.DisplayName}Prop `
    })}
  });

}, [${propInfoForGeneration.map((element) => element.name + "Prop")},${navPropInfoForGeneration.map((info) => {
      return `${info.DisplayName}Prop `
    })}    ]);

  const displayCase = ${propInfoForGeneration
    .map((prop, index) => {
      const key = prop.name;
      return [key, { create: prop.showincreatemodal, update: prop.showineditmodal }];
    })
    .reduce((acc, [key, value], index) => {
      return acc + (index === 0 ? "" : ",") + `${key}:{create:${value.create},update:${value.update}}`;
    }, "{")}}

${propInfoForGeneration
    .map((element) => {
      if (element.format === "enum") {
        return `const selectHandler${element.name} = (e:any)=>{
    setData((prevData)=>({...prevData, ${element.name}:e.value}))
  }`;
      }
    })
    .join("")}


${navPropInfoForGeneration
    .map((element) => {
      return `const selectHandler${element.EntityName}${element.DisplayName} = (e:any)=>{
    setData((prevData)=>({...prevData, ${element.EntityName}${element.DisplayName}:e.value}))
  }`;
    })
    .join("")}


${propInfoForGeneration
    .map((element) => {
      if (element.format == "DateTime") {
        return `const onDateChange${element.name} = (e:any)=>{
        setData((prevData)=>({...prevData,${element.name}:e}))
  }`;
      }
    })
    .join("")}

  ${propInfoForGeneration
    .map((element) => {
      if (element.format == "bool") {
        return `
          const checkboxHandler${element.name} = (event: any)=>{
          setData((prevData)=>({...prevData,${element.name}:event.target.checked}))
    }`
          ;
      }
    })
    .join("")}

const handleSave = () => {
  onSaveHandler({
    data
  });
  
  
  setData({${propInfoForGeneration
    .map((element) => {
      if (element.format == "int") {
        return (
          element.name +
          ":" +
          `${element.name}Prop`
        );

      } else if (element.format == "string") {
        return (
          element.name +
          ":" +
          `${element.name}Prop`
        );

      }
      else if (element.format == "bool") {
        return (
          element.name +
          ":" +
          `${element.name}Prop`
        );
      }
      else {
        return `${element.name}: new Date()`;
      }
      // if (element.format != "DateTime") {
      //   return `${element.name}: "${""}"`;
      // } else if (element.format == "bool") {
      //   return `${element.name} : false`
      // }
      // else {
      //   return `${element.name}: new Date()`;
      // }
    })
    .join(", ")},
    ${navPropInfoForGeneration
    .map((element) => {

      return `${element.EntityName}${element.DisplayName}: ""`;
    })
    .join(", ")}});

};

return(

`;

// template for generating component's Html
const componentElements =
  `
    ${propInfoForGeneration.map((property) => {
    const upperHtml = `<div className="col-md-12 mb-3">
                   <div className="form-group">`;
    const lowerHtml = `</div>
                   </div>`;
    const upperCreateCondition = `(displayCase.${property.name}.create && operation=="create") && `
    const upperUpdateCondition = `(displayCase.${property.name}.update && operation=="update") && `

    if (property.element == "RdsInput") {
      const convertedString = property.name.replace(/([A-Z])/g, " $1");
      const finalString =
        convertedString.charAt(0).toUpperCase() + convertedString.slice(1);
      if (property.IsTextArea) {

        return `
                  { ${property.showincreatemodal && property.showineditmodal ? "" : (property.showincreatemodal ? upperCreateCondition : (property.showineditmodal ? upperUpdateCondition : ""))}
                      ${upperHtml}
                    <RdsTextArea
                    placeholder="${property.name}"
                    readonly={false}
                    label={t("${finalString}")||""}  
                    rows={4}
                    value={data.${property.name}}
                    onChange={(e:any) =>
                      setData((prevData) => ({ ...prevData, ${property.name}: e.target.value }))}
                    ></RdsTextArea> 
                    ${lowerHtml}
                  }`
      } else {
        return `
{ ${property.showincreatemodal && property.showineditmodal ? "" : (property.showincreatemodal ? upperCreateCondition : (property.showineditmodal ? upperUpdateCondition : ""))}
    ${upperHtml}
            <RdsInput
                      inputType={${property.Type == `"int"` ? `"number"` : `"string"`}}
                      label="${finalString}"
                      placeholder="${property.name}"
                      minValue={${property.MinValue}}
                      maxValue={${property.MaxValue}}
                      minLength={${property.MinLength}}
                      maxLength={${property.MaxLength}}
                      value={data.${property.name}}
                      ${(property.EmailValidation != "" || property.Regex != "") || `
                      validatonPattern={${property.EmailValidation ? `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/` : `${property.Regex == "" ? undefined : property.Regex}`}}
                      validationMsg={${property.EmailValidation ? `"Invalid pattern for a email. "` : `"Invalid pattern. Please review your input."`}}`}
                      onChange={(e:any) =>
                        setData((prevData) => ({ ...prevData, ${property.name}: e.target.value }))
                      }
                      required={${property.IsRequired}}
  ></RdsInput>
  ${lowerHtml}
}
  
  `
      }

      ;
    } else if (property.element == "RdsSelectList") {
      const convertedString = property.name.replace(/([A-Z])/g, " $1");
      const finalString =
        convertedString.charAt(0).toUpperCase() + convertedString.slice(1);
      return `
    {  ${property.showincreatemodal && property.showineditmodal ? "" : (property.showincreatemodal ? upperCreateCondition : (property.showineditmodal ? upperUpdateCondition : ""))}
    ${upperHtml}
  <RdsSelectList
    id={"${finalString}"}
    label={"${finalString}"}
    placeholder={t("Select ${finalString}") || ""}
    isSearchable={true}
    required={${property.IsRequired}}
    selectItems={${property.name}EnumItems}
    onChange={selectHandler${property.name}}
    selectedValue={${property.name}Prop}
  ></RdsSelectList>
  ${lowerHtml}
  }
  `;
    } else if (property.element == "RdsDatePicker") {
      const convertedString = property.name.replace(/([A-Z])/g, " $1");
      const finalString =
        convertedString.charAt(0).toUpperCase() + convertedString.slice(1);
      return `
    {  ${property.showincreatemodal && property.showineditmodal ? "" : (property.showincreatemodal ? upperCreateCondition : (property.showineditmodal ? upperUpdateCondition : ""))}
    ${upperHtml}
    <div className="mb-2">
            <RdsLabel label="${finalString}" required={true}></RdsLabel>
            </div>
            <RdsDatePicker
            type="default"
            selectedDate={onDateChange${property.name}}
            dateForEdit={data.${property.name}}
            onDatePicker={function (start: any, end?: any) {
            return " ";
            }} isDropdownOpen={false}
            ></RdsDatePicker>
            ${lowerHtml}
          }`;
    } else if (property.element == "RdsCheckbox") {

      const convertedString = property.name.replace(/([A-Z])/g, " $1");
      const finalString =
        convertedString.charAt(0).toUpperCase() + convertedString.slice(1);
      return `
    {  ${property.showincreatemodal && property.showineditmodal ? "" : (property.showincreatemodal ? upperCreateCondition : (property.showineditmodal ? upperUpdateCondition : ""))}
    ${upperHtml}
    <RdsCheckbox
    label="${finalString}"
    checked={data.${property.name}}
    onChange={checkboxHandler${property.name}}
  ></RdsCheckbox>
  ${lowerHtml}}`
    }
  }).join("")}
  ${navPropInfoForGeneration.map((info) => {
    const upperHtml = `<div className="col-md-12">
    <div className="form-group">`;
    const lowerHtml = `</div>
    </div>`;

    const convertedString = info.DisplayName.replace(/([A-Z])/g, " $1");
    const finalString =
      convertedString.charAt(0).toUpperCase() + convertedString.slice(1);
    return `
${upperHtml}
<RdsSelectList
${info.UiOption != "Dropdown" ? "isSearchable={true}" : ""}
  id={"${info.DisplayProperty}"}
  label={"${info.DisplayProperty}"}
  placeholder={t("Select ${info.DisplayProperty}") || ""}
  required={${info.IsRequired}}
  selectItems={${info.EntityName}${info.DisplayName}ListProp}
  onChange={selectHandler${info.EntityName}${info.DisplayName}}
  selectedValue={${info.EntityName}${info.DisplayName}Prop}
></RdsSelectList>
${lowerHtml}
`;
  })}
  `;
const componentReturn = `
  <>



            <div className="row">

              ${componentElements}

            </div>
            
          <div className="footer-buttons my-2">
            <div className="row">
              <div className="col-md-12 d-flex">
                <div>
                  <RdsButton
                    label={("Close")}
                    type="button"
                    colorVariant="primary"
                    size="small"
                    databsdismiss="offcanvas"
                    isOutline={true}
                  ></RdsButton>
                </div>
                <div className="ms-2">
                  <RdsButton
                    label="Save"
                    type="button"
                    size="small"
                    isDisabled={formValid}
                    class="ms-2"
                    colorVariant="primary"
                    databsdismiss="offcanvas"
                    onClick={handleSave}
                  ></RdsButton>
                </div>
              </div>
            </div>
          </div>
          </>
          )}
          export default Rds${convertToPascalCase(`${componentName}`)};
  `;

const componentFile = `
          ${componentImport}
          ${componentLogic}
          ${componentReturn}
`


function createComponent(componentName) {
  componentName = componentName.toLowerCase();
  const command = `npm run create:component --name=rds-${componentName}`;
  const componentPath = path.join(
    __dirname,
    `../bpmn-integration-components/src/rds-${componentName}`,
    `rds-${componentName}.tsx`
  );
  try {
    if (!fs.existsSync(componentPath)) {
      const componentpathres = path.resolve(componentPath);
      execSync(command, { stdio: 'inherit' });
      fs.writeFileSync(componentpathres, componentFile, 'utf-8');
      console.log(`Component "${componentName}" created successfully.`);
    } else {
      const componentpathres = path.resolve(componentPath);
      fs.writeFileSync(componentpathres, componentFile, 'utf-8');
      console.log(`Component "${componentName}" edited successfully.`);
    }


  } catch (error) {
    console.error(`Error creating component "${componentName}": ${error.message}`);
  }
}
createComponent(componentName);

const dataToShowOnTable = propInfoForGeneration.filter((tableProps) => {
  if (tableProps.showintable) {
    return true
  }
})


const basicTableHeaders = dataToShowOnTable.map((tableProps) => {
  return {
    displayName: `${tableProps.name}`.toUpperCase(),
    name: `${tableProps.name}`,
    key: convertToCamelCase(`${tableProps.name}`),
    datatype: "text",
    sortable: true,
    element: tableProps.element,
    display: `${tableProps.name}`
  };
});

const NavTableHeaders = navPropInfoForGeneration.map((tableProps) => {
  return {
    displayName: `${tableProps.EntityName}`.toUpperCase(),
    key: convertToCamelCase(`${tableProps.DisplayName}`),
    headerkey: `${tableProps.EntityName}${tableProps.DisplayName}`,
    pascalCaseDisplayName: `${tableProps.DisplayName}`,
    datatype: "text",
    sortable: true,
    element: tableProps.UiOption,
    name: `${tableProps}`,
    type: tableProps.Type,
    entityName: convertToCamelCase(`${tableProps.EntityName}`),
    pascalCaseEntityName: tableProps.EntityName
  }
})

const finalNavProp = NavTableHeaders.map((item) => {
  return {
    displayName: convertToPascalCasewithSpace(`${item.pascalCaseEntityName}`).toUpperCase(),
    key: item.headerkey,
    datatype: "text",
    sortable: true
  }
})


const finalProp = basicTableHeaders.map((item => {
  return {
    displayName: convertToPascalCasewithSpace(`${item.display}`).toUpperCase(),
    key: item.key,
    datatype: "text",
    sortable: true
  }
}))
let listTableHeaders
if (propInfoForGeneration.length < 5) {
  listTableHeaders = finalProp.concat(finalNavProp)
} else {
  listTableHeaders = finalProp
}


const pageimports = `
import { get${pluralName}Request,put${pluralName}Request,post${pluralName}Request,delete${pluralName}Request
${(navPropInfoForGeneration != 0) ? (navPropInfoForGeneration.map((info) => {
  return `,get${pluralName}${info.EntityName}LookupRequest`
})) : ""}


} from "../../../../libs/state-management/public.api"
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    useAppDispatch,
    useAppSelector,
  } from "../../../../libs/state-management/hooks";
  import {
    isgrantedpolicies
} from "../../../../../bpmn-integration-react-core/src/index";
  import {
    RdsAlert,
    RdsButton,
    RdsDatePicker,
    RdsInput,
    RdsLabel,
    RdsOffcanvas,
    RdsSelectList,
  } from "../../../rds-elements";
  import { RdsCompAlertPopup, RdsCompDatatable, Rds${convertToPascalCase(`${componentName}`)} } from "../../../rds-components";

  const tableHeaders = ${JSON.stringify(listTableHeaders)}
  ${propInfoForGeneration
    .filter((element) => element?.EnumValues)
    .map((prop) => {
      const options = Object.entries(prop.EnumValues).map(([key, value]) => ({
        option: key,
        value: value,
      }));
      return `const ${prop.name}Enum = ${JSON.stringify(options)}`;
    })}

`;

const pageLogic = `
const ${convertToPascalCase(`${sliceReducerName}`)} = () => {
 const data${sliceReducerName.toLowerCase()} = useAppSelector(
  (state:any) => state.persistedReducer.${convertToCamelCase(`${sliceReducerName}`)});
 const dispatch = useAppDispatch();
 const { t } = useTranslation();
 const [Data, setData] = useState<any>([{}]);
 const [Alert, setAlert] = useState({ show: false, message: "", color: "" });
 const configData = useAppSelector((state) => state.persistedReducer?.configureStore?.configuration?.auth?.grantedPolicies || {});
 const [dataEmit, setdataEmit] = useState<any>([{}]);
 const [actions, setActions] = useState<any>([]);
 const [pagePermission, setPagePermission] = useState<any>({
  create: false
})
 ${navPropInfoForGeneration.map((property) => {
  return `const [${property.DisplayName}List ,set${property.DisplayName}List] =  useState([{}])`
})}
useEffect(() => {
  const timer = setTimeout(() => {
    setAlert({ ...Alert, show: false });
  }, 3000);
  return () => clearTimeout(timer);
}, [Alert.message,data${sliceReducerName.toLowerCase()}?.get${pluralName}]);


 ${navPropInfoForGeneration.length != 0 ? (
    `useEffect(()=>{

    ${navPropInfoForGeneration.map((property) => {
      return `dispatch(get${pluralName}${property.EntityName}LookupRequest({}) as any);`
    })}},[]);`
  ) : ""}


  
 ${navPropInfoForGeneration.length != 0 ? (
    `useEffect(()=>{
      ${navPropInfoForGeneration.map((property) => {
      return `if(JSON.stringify(data${sliceReducerName.toLowerCase()}.get${pluralName}${property.EntityName}Lookup)!=="{}"){
    const tempNavList = data${sliceReducerName.toLowerCase()}.get${pluralName}${property.EntityName}Lookup?.items?.map((data:any)=>{
    return {
    option: data.displayName, 
    value: data.id
    }})
    set${property.DisplayName}List(tempNavList)
    }`
    })}},[
      ${navPropInfoForGeneration.map((property) => {
      return `data${sliceReducerName.toLowerCase()}.get${pluralName}${property.EntityName}Lookup`
    })}
    ]);`
  ) : ""}

 useEffect(() => {
  dispatch(get${pluralName}Request({}) as any);
}, []);

useEffect(() => {
  if (data${sliceReducerName.toLowerCase()}?.get${pluralName}
  ?.items != null) {
   ${navPropInfoForGeneration.length == 0 ?
    ` const tempData = data${sliceReducerName.toLowerCase()}?.get${pluralName}?.items?.map(
    (item: any) => 
    {
    function getDatefortable (inputDate:any){
      const dateTimeString = inputDate;
      const date = new Date(dateTimeString);
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(date);
      return formattedDate
    }
      return{id:item.id,
        concurrencyStamp:item.concurrencyStamp,
        ${listTableHeaders.map((element) => {
      if (element.element == "RdsDatePicker") {
        return `${element.key}:getDatefortable(item.${element.key})`
      } else if (element.element == "RdsSelectList") {
        return `${element.key}: ${element.name}Enum[item.${element.key}].option`
      } else if (element.element == "RdsCheckbox") {
        return `${element.key}:item.${element.key}.toString()`
      }
      else {
        return `${element.key}:item.${element.key}`
      }

    })}
      }
  });
`: `
  const tempData =data${sliceReducerName.toLowerCase()}?.get${pluralName}?.items?.map((data:any)=>{
      function getDatefortable (inputDate:any){
        const dateTimeString = inputDate;
        const date = new Date(dateTimeString);
        const formattedDate = new Intl.DateTimeFormat("en-US", {
          month:  "short",
          day:  "numeric",
          year: "numeric",
        }).format(date);
        return formattedDate
      }

  return {
    id:data.${convertToCamelCase(`${sliceReducerName}`)}.id,
    concurrencyStamp:data.${convertToCamelCase(`${sliceReducerName}`)}.concurrencyStamp,
    ${basicTableHeaders.map((data) => {
      if (data.element == "RdsDatePicker") {
        return `${data.key}:getDatefortable(data.${convertToCamelCase(`${sliceReducerName}`)}.${data.key})`
      } else if (data.element == "RdsSelectList") {
        // return `${data.key}:data.${convertToCamelCase(`${sliceReducerName}`)}.${data.key}`
        return `${data.key}: ${data.name}Enum[item.${data.key}].option,${data.key}value: ${data.name}Enum[item.${data.key}].value`
      } else if (data.element == "RdsCheckbox") {
        return `${data.key}:data.${convertToCamelCase(`${sliceReducerName}`)}.${data.key}.toString()`
      }
      else {
        return `${data.key}:data.${convertToCamelCase(`${sliceReducerName}`)}.${data.key}`
      }

    })},
    ${NavTableHeaders.map((data) => {
      return `${data.headerkey}:data.${convertToCamelCase(`${data.entityName}`)}?.${data.key},
      ${convertToCamelCase(`${data.entityName}`)}id:data.${convertToCamelCase(`${data.entityName}`)}?.id,
      `
    })}
  }})`
  }

    setData(tempData);
  }
}, [data${sliceReducerName.toLowerCase()}?.get${pluralName}]); 
  ${propInfoForGeneration
    .filter((element) => element?.extraProp)
    .map((prop) => {
      const options = Object.entries(prop.extraProp).map(([key, value]) => ({
        option: key,
        value: value,
      }));
      return `const ${prop.name}Enum = ${JSON.stringify(options)}`;
    })}
    const onNewCreate = (datafromcomponent: any) => {
      ${propInfoForGeneration.map((element) => {
      if (element.element == "RdsSelectList" && element.showincreatemodal) {
        return ` let ${element.name}Index = datafromcomponent.data.${element.name}`
      }
    }).join(" ")}
      ${NavTableHeaders.map((element) => {
      return ` let ${`${element.pascalCaseEntityName}${element.pascalCaseDisplayName}`}Index = datafromcomponent.data.${element.pascalCaseEntityName}${element.pascalCaseDisplayName}
        `
    }).join(" ")}


      const data = {\n${propInfoForGeneration.map((element) => {
      if (element.format == "DateTime" && element.showincreatemodal) {
        return `${convertToCamelCase(`${element.name}`)}: datafromcomponent.data.${element.name}.toISOString().substring(0, 19)`
      } else if (element.element == "RdsSelectList" && element.showincreatemodal) {
        return `${convertToCamelCase(`${element.name}`)}:${element.name}Index`
      }
      else {
        if (element.showincreatemodal) {
          return `${convertToCamelCase(`${element.name}`)}: datafromcomponent.data.${element.name}`
        } else {
          // Add a return statement to handle the case when none of the conditions are met
          return '';
        }

      }
    }).filter((item) => item.trim() !== '').join(",\n")}

      ${navPropInfoForGeneration.map((element) => {
      return `,${convertToCamelCase(`${element.propforcrud}`)} : ${convertToPascalCase(`${element.EntityName}${element.DisplayName}`)}Index.toString()`
    })}
    }
      dispatch(post${pluralName}Request({requestBody:data}) as any).then((res: any) => {
        if (res.type.includes("rejected")) {
          setAlert({
            ...Alert,
            show: true,
            message: "Something went wrong",
            color: "danger",
          });
        } else {
          setAlert({
            ...Alert,
            show: true,
            message: "Added Successfully",
            color: "success",
          });
        }
        dispatch(get${pluralName}Request({}) as any);
      }).catch((error: any) => {
        setAlert({
          ...Alert,
          show: true,
          message: "Something went wrong",
          color: "danger",
        });
        console.error(error);
      });
    };


  //   const actions = [{ id: "edit", displayName: t("Edit"), offId: "${sliceReducerName}Edit"},
  // {id: "delete", displayName: t("Delete"), modalId: "${sliceReducerName}Del"}]


  useEffect(() => {
    setPagePermission({ ...pagePermission, create: isgrantedpolicies('${process.argv[2]}.${pluralName}.Create', configData), })
    const IsEdit = isgrantedpolicies('${process.argv[2]}.${pluralName}.Edit', configData);
    const IsDelete = isgrantedpolicies('${process.argv[2]}.${pluralName}.Delete', configData);
    let resultArray = [];

    if (IsEdit) {
        resultArray.push({ id: "edit", displayName: t("AbpUi.Edit"), offId: "${sliceReducerName}Edit" })
    }
    if (IsDelete) {
        resultArray.push({ id: "delete", displayName: t("AbpUi.Delete"), modalId: "${sliceReducerName}Del" })
    }

    setActions(resultArray)
}, [configData]);



    const onActionSelection = (rowData: any, actionId: any) => {
      ${listTableHeaders.map((element) => {
      if (element.element == "RdsSelectList") {
        return ` let ${element.name}Index = rowData.${element.key}
          `
      }
    }).join(" ")}
      setdataEmit({
        ${basicTableHeaders.map((element) => {
      if (element.element == "RdsSelectList") {
        return `${element.key}: ${element.name}Index`
      } else {
        return ` ${element.key} : rowData.${element.key}`
      }

    }).join(",\n")
  }


  


        ${NavTableHeaders.map((element) => {
    return `, ${element.pascalCaseEntityName}${element.pascalCaseDisplayName} : rowData.${element.headerkey},\n
        ${convertToCamelCase(`${element.entityName}`)}id: rowData.${convertToCamelCase(`${element.entityName}`)}id,\n
        concurrencyStamp:rowData.concurrencyStamp`
  }).join(",\n")},
        id: rowData.id,
      });
    };
    const onEdithandler = (datafromcomponent: any) => {
      const id = dataEmit.id;
      ${propInfoForGeneration.map((element) => {
    if (element.element == "RdsSelectList" && element.showineditmodal) {
      return ` let ${element.name}Index = datafromcomponent.data.${element.name}`
    }
  }).join(" ")}
    ${NavTableHeaders.map((element) => {
    return ` let ${`${element.pascalCaseEntityName}${element.pascalCaseDisplayName}`}Index = datafromcomponent.data.${element.pascalCaseEntityName}${element.pascalCaseDisplayName}
  `
  }).join(" ")}
       function dateChange (inputdate:any){
        const date = new Date(inputdate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");
        const formattedDate = \`\${year}-\${month}-\${day}T\${hours}:\${minutes}:\${seconds}\`;
        return formattedDate
       }
      const data = {\n
        concurrencyStamp : dataEmit.concurrencyStamp,
        ${propInfoForGeneration.map((element) => {
    if (element.format == "DateTime" && element.showineditmodal) {
      return `${convertToCamelCase(`${element.name}`)}: dateChange(datafromcomponent.data.${element.name})`
    } else if (element.element == "RdsSelectList" && element.showineditmodal) {
      return `${convertToCamelCase(`${element.name}`)}:${element.name}Index`
    }
    else {
      if (element.showincreatemodal) {
        return `${convertToCamelCase(`${element.name}`)}: datafromcomponent.data.${element.name}`
      } else {
        // Add a return statement to handle the case when none of the conditions are met
        return '';
      }
    }
  }).filter((item) => item.trim() !== '').join(",\n")}
      ${navPropInfoForGeneration.map((element) => {
    return `,${convertToCamelCase(`${element.propforcrud}`)} : ${convertToPascalCase(`${element.EntityName}${element.DisplayName}`)}Index.toString()`
  })}
    }
    // this is for Edit 
      dispatch(put${pluralName}Request({ id: id ,requestBody: data }) as any)
        .then((res: any) => {
          setdataEmit([{}]);
          if (res.type.includes("rejected")){
            setAlert({
              ...Alert,
              show: true,
              message: "Error while updating",
              color: "danger",
            });
          }else{
            dispatch(get${pluralName}Request({}) as any);
            setAlert({
              ...Alert,
              show: true,
              message: "Updated Succesfully",
              color: "success",
            });
          }  
        })
        .catch((error: any) => {
          setAlert({
            ...Alert,
            show: true,
            message: "Something went wrong",
            color: "danger",
          });
          console.error(error);
        });
    };
    const onDeleteHandler = () => {
      dispatch(delete${pluralName}Request({id:dataEmit.id}) as any)
        .then((res: any) => {
          if (res.type.includes("rejected")){
            setAlert({
              ...Alert,
              show: true,
              message: "Error while deleting",
              color: "danger",
            });
    
          }else{

            dispatch(get${pluralName}Request({}) as any);
            setAlert({
              ...Alert,
              show: true,
              message: "Deleted Successfully",
              color: "success",
            });
          }
        })
        .catch((error: any) => {
          setAlert({
            ...Alert,
            show: true,
            message: "Something went wrong",
            color: "danger",
          });
          console.error(error);
        });
      setdataEmit([{}]);
    };
 `;
const pagereturnContent = `
return <>
<div className="container-fluid m-0 p-0">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch">
                                <div className="mb-3 d-flex justify-content-end">
                                    {pagePermission.create &&
                                        <RdsOffcanvas
                                        offcanvasbutton={
                                          <div>
                                            <RdsButton
                                              type={"button"}
                                              label={"New ${sliceReducerName}"}
                                              iconColorVariant="light"
                                              size="small"
                                              colorVariant="primary"
                                              icon="plus"
                                              iconFill={false}
                                              iconStroke={true}
                                              iconHeight="12px"
                                              iconWidth="12px"
                                            ></RdsButton>
                                          </div>
                                        }
                                        placement={"end"}
                                        backDrop={true}
                                        scrolling={false}
                                        preventEscapeKey={false}
                                        offId={"new${sliceReducerName}"}
                                        canvasTitle={"New ${sliceReducerName}"}
                                        offcanvaswidth={550}
                                      >
                                        <Rds${convertToPascalCase(`${componentName}`)}
                                        ${propInfoForGeneration.map((element) => {
                          if (element.format == "bool") {
                            return `${element.name}Prop =  ${element.DefaultValue ? `{${element.DefaultValue}}` : "{false}"}`
                          } else if (element.format == "string") {
                            return `${element.name}Prop = ${element.DefaultValue ? `{"${element.DefaultValue}"}` : `{""}`}`
                          } else if (element.format == "int") {
                            return `${element.name}Prop = ${element.DefaultValue ? `{${element.DefaultValue}}` : `{""}`}`
                          }
                          else {
                            return `${element.name}Prop = {""}`
                          }
                        }).join("\n")}
                                        ${navPropInfoForGeneration.map((element) => element.EntityName + element.DisplayName + `Prop={""} \n  ${element.EntityName}${element.DisplayName}ListProp={${element.DisplayName}List}`).join("\n  ")}
                                        onSaveHandler={onNewCreate}
                                        offCanvasType={"create"}
                                        ${propInfoForGeneration
                            .filter((element) => element?.EnumValues)
                            .map((prop) => {
                              return `${prop.name}EnumItems={${prop.name}Enum}`;
                            })}
                                        ></Rds${convertToPascalCase(`${componentName}`)}>
                                      </RdsOffcanvas>
                                      }
                                </div>
                               
                                <RdsCompDatatable
                                actionPosition="right"
                                classes="table__userTable"
                                tableHeaders={tableHeaders}
                                pagination={true}
                                tableData={Data} // data
                                actions={actions} // add action={[ add array of actions you require]} here to have action dropdown
                                onActionSelection={onActionSelection}
                                // add onActionSelction here for what function you want to call
                                recordsPerPage={10}
                                recordsPerPageSelectListOption={true}
                              ></RdsCompDatatable>
 
                              <div className="offset-md-4 col-md-4 mt-3 col-12 position-absolute bottom-0 mb-3 position-lg-relative custom-responsive-alert"
                              role="alert">
                                    {Alert.show && (
                                        <RdsAlert
                                        alertmessage={Alert.message}
                                        colorVariant={Alert.color}
                                        ></RdsAlert>
                                    )}
                                </div>
                             
                                {/* add edit offcanvas here  */}
                                <RdsOffcanvas
                                  placement={"end"}
                                  backDrop={true}
                                  scrolling={false}
                                  preventEscapeKey={false}
                                  offId={"${sliceReducerName}Edit"}
                                  canvasTitle={"Edit"}
                                  offcanvaswidth={550}
                                >
                                  <>
                                  <Rds${convertToPascalCase(`${componentName}`)}
                                    ${propInfoForGeneration.map((element) => {
                          if (element.format == "bool") {
                            return `${element.name}Prop = {dataEmit.${convertToCamelCase(`${element.name}`)} == "true" ?true:false}`
                          } else {
                            return `${element.name}Prop = {dataEmit.${convertToCamelCase(`${element.name}`)}}`
                          }
                        }).join("\n")}
                                  ${navPropInfoForGeneration.map((element) => element.EntityName + element.DisplayName + `Prop={dataEmit.${convertToPascalCase(`${element.EntityName}${element.DisplayName}`)}} \n  ${element.EntityName}${element.DisplayName}ListProp={${element.DisplayName}List}`).join("\n  ")}
                                  offCanvasType={"update"}
                                  ${propInfoForGeneration
                        .filter((element) => element?.EnumValues)
                        .map((prop) => {
                          return `${prop.name}EnumItems={${prop.name}Enum}`;
                        })}
                                    onSaveHandler={onEdithandler}
                                    ></Rds${convertToPascalCase(`${componentName}`)}>
                                  </>
                                </RdsOffcanvas>
                                {/* add alert pop up here */}
                                <RdsCompAlertPopup
                                  alertID={"${sliceReducerName}Del"}
                                  onSuccess={onDeleteHandler}
                                ></RdsCompAlertPopup>                          
                            </div>          
                        </div>
                    </div>
                </div>
      </>
              }
export default ${convertToPascalCase(`${sliceReducerName}`)};
`;

// console.log(pageimports)
// console.log(pageLogic)
// console.log(pagereturnContent)

const pageContent = ` ${pageimports}
 ${pageLogic}
 ${pagereturnContent}`

function createPage(pageName, moduleName) {
  const command = `npm run create:page --moduleName=${moduleName} --pageName=${pageName} --projectName=${process.argv[2]}`
  const pagePath = path.join(
    __dirname,
    `../bpmn-integration-mfe/rds_pages/rds-page-${pageName}/src/${pageName}`,
    `${pageName}.tsx`
  );

  const pagepathres = path.resolve(pagePath);
  try {
    if (!fs.existsSync(pagePath)) {
      execSync(command, { stdio: 'inherit' });
      fs.writeFileSync(pagepathres, pageContent, 'utf-8');
      console.log(`Page "${pageName}" created successfully.`);
    } else {
      fs.writeFileSync(pagepathres, pageContent, 'utf-8');
      console.log(`Page "${pageName}" edited successfully.`);
    }

  } catch (error) {
    console.error(`Error creating Page "${pageName}": ${error.message}`);
  }
}

createPage(`${pluralName}`, `${pluralName}`)


// const componentFile = `
//           ${componentImport}
//           ${componentLogic}
//           ${componentReturn}
// `
// console.log(pageContent)
// console.log(componentFile)