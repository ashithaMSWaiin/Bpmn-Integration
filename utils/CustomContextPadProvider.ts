export default class CustomContextPadProvider {
  static $inject = ['modeling'];

  modeling: any;

  constructor(modeling: any) {
    this.modeling = modeling;
  }

  getContextPadEntries(element: any) {
    return {
      'custom-properties': {
        group: 'edit',
        className: 'bpmn-icon-properties',
        title: 'Add Custom Properties',
        action: {
          click: () => {
            const label = prompt("Enter label:");
            const action = prompt("Enter action:");
            const style = prompt("Enter style:");

            this.modeling.updateProperties(element, {
              customLabel: label,
              customAction: action,
              customStyle: style
            });

            alert('Properties set!');
          }
        }
      }
    };
  }
}
