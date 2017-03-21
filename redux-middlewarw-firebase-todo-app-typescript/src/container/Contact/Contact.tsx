import * as React from "react";
import { Back } from "../../component/Back/Back";

// note: React.Component<props, state>
class Contact extends React.Component<any, any> {

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h1>
                    Contact Page
                </h1>
                <Back />
            </div>
        )
    }
}
export default Contact;