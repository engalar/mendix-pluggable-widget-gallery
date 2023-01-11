import { ReactElement, ReactNode, useState } from "react";
import { InfiniteBody, Pagination } from "../piw-utils-internal/components/web";
import { ObjectItem } from "mendix";
import classNames from "classnames";

export interface GalleryProps<T extends ObjectItem> {
    className?: string;
    desktopItems: number;
    emptyPlaceholderRenderer?: (renderWrapper: (children: ReactNode) => ReactElement) => ReactElement;
    emptyMessageTitle?: string;
    filters?: ReactNode;
    filtersTitle?: string;
    hasFilters: boolean;
    hasMoreItems: boolean;
    items: T[];
    itemRenderer: (
        renderWrapper: (children: ReactNode, className?: string, onClick?: () => void) => ReactElement,
        item: T
    ) => ReactNode;
    numberOfItems?: number;
    paging: boolean;
    page: number;
    itemHeight: number;
    pageSize: number;
    paginationPosition?: "below" | "above";
    preview?: boolean;
    phoneItems: number;
    setPage?: (computePage: (prevPage: number) => number) => void;
    tabletItems: number;
    tabIndex?: number;
}

export function Gallery<T extends ObjectItem>(props: GalleryProps<T>): ReactElement {
    const [offset, setOffset] = useState(0);
    const pagination = props.paging ? (
        <div className="widget-gallery-pagination">
            <Pagination
                canNextPage={props.hasMoreItems}
                canPreviousPage={props.page !== 0}
                gotoPage={(page: number) => props.setPage && props.setPage(() => page)}
                nextPage={() => props.setPage && props.setPage(prev => prev + 1)}
                numberOfItems={props.numberOfItems}
                page={props.page}
                pageSize={props.pageSize}
                previousPage={() => props.setPage && props.setPage(prev => prev - 1)}
            />
        </div>
    ) : null;

    return (
        <div className={classNames("widget-gallery", props.className)} data-focusindex={props.tabIndex || 0}>
            {props.paginationPosition === "above" && pagination}
            {props.hasFilters ? (
                <div className="widget-gallery-filter" role="section" aria-label={props.filtersTitle}>
                    {props.filters}
                </div>
            ) : null}

            {props.items.length > 0 && props.itemRenderer && (
                <InfiniteBody
                    className={classNames(
                        "widget-gallery-items",
                        `widget-gallery-lg-${props.desktopItems}`,
                        `widget-gallery-md-${props.tabletItems}`,
                        `widget-gallery-sm-${props.phoneItems}`
                    )}
                    hasMoreItems={props.hasMoreItems}
                    setPage={props.setPage}
                    setOffset={setOffset}
                    isInfinite={!props.paging}
                    role="list"
                >
                    <div style={{ height: offset * props.itemHeight + 'px' }}></div>
                    {props.items.slice(offset, offset + props.pageSize).map(item =>
                        props.itemRenderer((children, className, onClick) => {
                            return (
                                <div
                                    key={`item_${item.id}`}
                                    className={classNames("widget-gallery-item", className, {
                                        "widget-gallery-clickable": !!onClick
                                    })}
                                    onClick={onClick}
                                    onKeyDown={
                                        onClick
                                            ? e => {
                                                if (e.key === "Enter" || e.key === " ") {
                                                    e.preventDefault();
                                                    onClick();
                                                }
                                            }
                                            : undefined
                                    }
                                    role={onClick ? "button" : "listitem"}
                                    tabIndex={onClick ? 0 : undefined}
                                >
                                    {children}
                                </div>
                            );
                        }, item)
                    )}
                    <div style={{ height: (props.items.length - offset - props.pageSize) * props.itemHeight + 'px' }}></div>
                </InfiniteBody>
            )}
            {(props.items.length === 0 || props.preview) &&
                props.emptyPlaceholderRenderer &&
                props.emptyPlaceholderRenderer(children => (
                    <div className="widget-gallery-empty" role="section" aria-label={props.emptyMessageTitle}>
                        <div className="empty-placeholder">{children}</div>
                    </div>
                ))}
            {props.paginationPosition === "below" && pagination}
        </div>
    );
}
