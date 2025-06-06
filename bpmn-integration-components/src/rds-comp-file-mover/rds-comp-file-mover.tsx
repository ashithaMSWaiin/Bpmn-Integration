

import { RdsIcon } from "../rds-elements";
import React, { useState } from "react";

export interface FileItem {
    id: string;
    name: string;
    hasChildren?: boolean;
    children?: FileItem[];
}

export interface RdsCompFileMoverProps {
    items: any;
    path: any;
    selectedItemId?: string;
    isTopLevel?: boolean; 


}

export const RdsCompFileMover = ({
    items,
    path,
    selectedItemId,
    isTopLevel = true,
}: RdsCompFileMoverProps) => {
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    const handleClick = (id: string, name: string) => () => {
        if (expandedItems.includes(id)) {
            setExpandedItems(expandedItems.filter((item) => item !== id));
        } else {
            setExpandedItems([...expandedItems, id]);
        }
        path({ id });
    };

    const renderFileItem = (item: FileItem) => (
        <>
            <div key={item.name}>
                <div className="d-flex align-items-center pt-2 me-3 cursor-pointer" onClick={handleClick(item.id, item.name)}>
                    {item.hasChildren && (
                        <span className="me-2"> <RdsIcon
                            name={
                                expandedItems.includes(item.id)
                                    ? "chevron_down"
                                    : "chevron_right"
                            }
                            height="12px"
                            width="12px"
                            fill={false}
                            stroke={true}

                        />
                        </span>
                    )}
                    <RdsIcon
                        name="folder"
                        height="15px"
                        width="15px"
                        fill={true}
                        stroke={true}
                        colorVariant={selectedItemId === item.id ? "warning" : "warning"}
                        onClick={handleClick(item.id, item.name)}
                    />
                    <span className="ms-2">{item.name}   {item.children && ` (${item.children.length})`}</span>
                </div>
                {item.children && expandedItems.includes(item.id) && (
                    <div className="ms-4">
                        <RdsCompFileMover
                            items={item.children}
                            path={path}
                            selectedItemId={selectedItemId}
                            isTopLevel={false} 

                        />
                    </div>
                )}
            </div>
        </>
    );

    const renderFileItems = (items: FileItem[]) => {
        return items?.map(renderFileItem);
    };

    return <>{renderFileItems(items)}   {isTopLevel && (<div className="mt-5 text-muted">
    Showing 1 to {items[0].children && ` ${items[0].children.length}`} of {items[0].children && ` ${items[0].children.length}`} entries
  </div> )}</>;
};

export default RdsCompFileMover;
