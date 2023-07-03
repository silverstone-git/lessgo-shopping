import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Category } from "../../../models/models";
export function CategoryIconFromString(props: any) {
    const iconn = props.icon;
    const text = props.text;
    const categories = Category;
    let category: keyof typeof categories = text;
    const categoryIconOnclick = () => {
        props.setListOfItems([]);
        props.setNoOfItems(new Map());
        props.setCategory(categories[category]);
        props.setPage(0);
        props.setExploreEnd(false);
        props.setMoreVis(false);
    }
    if(props.category === categories[category])
    return (
        <div onClick={categoryIconOnclick} className='underline text-green-500 dark:text-green-300 cursor-pointer'>
            <FontAwesomeIcon icon={iconn} />
        </div>)
    else {
        return (
            //
            <div onClick={categoryIconOnclick} className='cursor-pointer'>
                <FontAwesomeIcon icon={iconn} />
            </div>
        );
    }
}
