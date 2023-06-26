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
        props.setCategory(categories[category]);
        props.setPage(0);
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

/*
    const iconStr = props.text as IconName;
    const options = {name: iconStr};
    return <FontAwesomeIcon icon={icon(options as {name: IconName})} />
*/
/*
    const camelCaseIcon = (str1: string) => 'fa' + str1.at(0)?.toUpperCase() + str1.substring(1);
    const iconStr = props.text as IconName;
    const Icon = React.lazy(() => import(`@fortawesome/free-solid-svg-icons/${camelCaseIcon(iconStr)}`).then(({definition}) => ({default: () => <FontAwesomeIcon icon={definition} />})));
    
    return <React.Suspense><Icon /></React.Suspense>;
*/