// list of items suggested from the back end 
// table of items with an add button
// items could be split into categories 
// rendered file, fetching in packinglistAPI 
// import React, { useEffect, useState } from "react";
// import { loadItemsList } from "./PackingListApi";


const UseItemsList = (condition) => {
     const [itemCondition, setItemList] = useState("");
  
     useEffect(() => {
      async function fetchData() {
        const item_list_response = await loadItemsList(
           condition
         );
         setItemList(item_list_response);
       }
       fetchData();
     }, [condition]);
  
    return itemCondition;
   };
  
<table class="PackingListItems">
    <tbody>
    <tr>
      <td>{suggested_item}</td>
    </tr>
    </tbody>
    <tbody>
    <tr>
      <td>{created_item}</td>
    </tr>
    </tbody>
</table>