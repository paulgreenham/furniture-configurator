// import {func} from "./Firebase";
import {useState} from "react";
// import {responseEnum} from "./enums";

const letters = "0123456789abcdef";

// const colors = [
//     "#63b598", "#ce7d78", "#ea9e70", "#a48a9e", "#c6e1e8", "#648177" ,"#0d5ac1" ,
//     "#f205e6" ,"#1c0365" ,"#14a9ad" ,"#4ca2f9" ,"#a4e43f" ,"#d298e2" ,"#6119d0",
//     "#d2737d" ,"#c0a43c" ,"#f2510e" ,"#651be6" ,"#79806e" ,"#61da5e" ,"#cd2f00" ,
//     "#9348af" ,"#01ac53" ,"#c5a4fb" ,"#996635","#b11573" ,"#4bb473" ,"#75d89e" ,
//     "#2f3f94" ,"#2f7b99" ,"#da967d" ,"#34891f" ,"#b0d87b" ,"#ca4751" ,"#7e50a8" ,
//     "#c4d647" ,"#e0eeb8" ,"#11dec1" ,"#289812" ,"#566ca0"
// ];

export class Utility {

    static objIsEmpty(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object
    }

    static roundByDecimal(num, decPlaces) {
        const factor = Math.pow(10, decPlaces);
        return Math.round((Number(num) + Number.EPSILON) * factor) / factor
    }

    static capitalize(str) {
        let newStr = str[0].toUpperCase();
        return newStr + str.slice(1)
    }

    static getInitials(firstName, lastName) {
        let initials = firstName ? firstName[0] : "";
        initials += lastName ? lastName[0].slice(-1) : "";
        initials = initials.toUpperCase();
        return initials;
    }

    static parseName(fullName) {
        const names = fullName.split(" ");
        const lastName = names.pop();
        const firstName = names.join(" ");
        return {
            firstName,
            lastName
        }
    }

    static makeId(len) {
        let id = "";
        for (let i = 0; i < len; i++) {
            id += letters[Math.floor(Math.random() * letters.length)]
        }
        return id
    };

    static renderDate(dateStr, isUSStyle = false) {
        if (!dateStr) {
            return '';
        }
        const date = new Date(dateStr);
        const dayNumber = date.getDate();
        const monthNumber = date.getMonth() + 1;

        const day = dayNumber < 10 ? '0' + dayNumber : dayNumber;
        const month = monthNumber < 10 ? '0' + monthNumber : monthNumber;
        const year = date.getFullYear();
        return isUSStyle ? `${month}/${day}/${year}` : `${day}.${month}.${year}`
    }

    static renderDateTime(dateStr, isUSStyle = false) {

        if (!dateStr) {
            return '';
        }
        const date = new Date(dateStr);
        return `${Utility.renderDate(dateStr, isUSStyle)} ${Utility.renderTime(date)}`;
    }

    static renderTime(date) {
        const hoursNumber = date.getHours();
        const minutesStr = date.getMinutes();

        const hours = hoursNumber < 10 ? '0' + hoursNumber : hoursNumber;
        const minutes = minutesStr < 10 ? '0' + minutesStr : minutesStr;

        return `${hours}:${minutes}`;
    }

    static renderDate_YYYYMMDD(dateStr) {
        if (!dateStr) {
            return ""
        }
        const date = new Date(dateStr);
        const dayNumber = date.getDate();
        const monthNumber = date.getMonth() + 1;

        const day = dayNumber < 10 ? '0' + dayNumber : dayNumber;
        const month = monthNumber < 10 ? '0' + monthNumber : monthNumber;
        const year = date.getFullYear();
        return `${year}-${month}-${day}`
    }

    static dateFromNativeStr(dateStr) {
        if (!dateStr) {
            return new Date()
        }
        const year = Number(dateStr.slice(0, 4));
        const month = Number(dateStr.slice(5, 7)) - 1;
        const day = Number(dateStr.slice(8, 10));

        return new Date(year, month, day);
    }

    static getPathArray() {
        let pathStr = window.location.pathname;
        if (pathStr[pathStr.length - 1] === '/') {
            pathStr = pathStr.substring(0, pathStr.length - 1); // remove redundant last '/'
        }
        // noinspection UnnecessaryLocalVariableJS
        const pathArray = pathStr.split('/');
        return pathArray
    }

    static buildSortMethod(sortAscending, firstProp, type = 0) {   // 0 - normal, 1 - date, 2 - array
        switch (type) {
            case 0:
                return (listItemA, listItemB) => {
                    let itemA = listItemA[firstProp];
                    let itemB = listItemB[firstProp];
                    if (typeof itemA !== typeof itemB) {
                        itemA = String(itemA);
                        itemB = String(itemB);
                    }
                    if (itemA < itemB) {
                        return sortAscending ? -1 : 1;
                    }
                    if (itemA > itemB) {
                        return sortAscending ? 1 : -1;
                    }
                    return 0;
                }
            case 1:
                return (listItemA, listItemB) => sortAscending
                    ? new Date(listItemA[firstProp] || 0) - new Date(listItemB[firstProp] || 0)
                    : new Date(listItemB[firstProp] || 0) - new Date(listItemA[firstProp] || 0);
            case 2:
                return (listItemA, listItemB) => sortAscending
                    ? listItemA[firstProp].length - listItemB[firstProp].length
                    : listItemB[firstProp].length - listItemA[firstProp].length
            default:
                return () => {
                };
        }
    }

    static getNewDimensionIncrement = (currentDimensionInInches, isAdd, allowedDimension) => {
        let newDimension;
        if (isAdd) {
            newDimension = Math.min(currentDimensionInInches + 1, allowedDimension.max * 12);
        } else newDimension = Math.max(currentDimensionInInches - 1, allowedDimension.min * 12);
        return newDimension / 12;
    }

    // static async httpCall(functionName, params) {
    //     try {
    //         const response = await func.httpsCallable(functionName)(params);
    //
    //         if (!!response?.data && response.data.code === responseEnum.OK) {
    //             return JSON.parse(response.data.data || "true");
    //         } else {
    //             console.error(response?.data?.message);
    //             return null
    //         }
    //     } catch (err) {
    //         console.error(err.message)
    //     }
    // }
}

export const useForceUpdate = () => {
    const [, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}
