import React from 'react'

export default function RemoveAllScenesButton() {
   function removeAll(){
        console.log("This button should remove all stories");
     
     
    }
     
    return (
      

            <button onClick={removeAll}> Remove all stories</button>
     
    )

}
