import { parseStyle } from "./piw-utils-internal";
import { GalleryPreviewProps } from "../typings/GalleryProps";

declare function require(name: string): string;

export function preview(props: GalleryPreviewProps) {
    return <div style={parseStyle(props.style)}></div>;
}

export function getPreviewCss(): string {
    return require("./ui/index.scss");
}
