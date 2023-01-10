// import { useMemo } from "react";
import { GalleryContainerProps } from "../typings/GalleryProps";
// import { ValueStatus } from "mendix";
import classNames from "classnames";

import "./ui/index.scss";

export default function (props: GalleryContainerProps) {
    console.log(props);
    // const value = useMemo(() => {
    //     if (props.attribute && props.attribute.status === ValueStatus.Available) {
    //         return props.attribute.value;
    //     }
    // }, [props.attribute]);

    return (
        <div style={props.style} className={classNames("mendixcn-graph", props.class)}>
            hello {props.sampleText} and your value is
        </div>
    );
}
