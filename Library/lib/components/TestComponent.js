import * as React from "react";
import isEqual from "lodash/isEqual";
export class TestComponentState {
    constructor() { }
}
export default class TestComponent extends React.Component {
    constructor(props) {
        super(props);
        this.LOG_SOURCE = "🔶TestComponent";
        this.state = new TestComponentState();
    }
    shouldComponentUpdate(nextProps, nextState) {
        if ((isEqual(nextState, this.state) && isEqual(nextProps, this.props)))
            return false;
        return true;
    }
    render() {
        try {
            return (React.createElement("div", { "data-component": this.LOG_SOURCE },
                "This is my test property: ",
                this.props.testProperty));
        }
        catch (err) {
            console.log(`${this.LOG_SOURCE} (render) - ${err}`);
            return null;
        }
    }
}
