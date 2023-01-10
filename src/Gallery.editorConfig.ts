import { StructurePreviewProps } from "./piw-utils-internal";
import { GalleryPreviewProps } from "../typings/GalleryProps";
import { Properties, transformGroupsIntoTabs } from "@mendix/pluggable-widgets-tools";

export function getProperties(
    values: GalleryPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    console.log(values);
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}
export function getPreview(values: GalleryPreviewProps): StructurePreviewProps | null {
    console.log(values);
    return null;
}
