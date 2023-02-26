export const idFromMillis = () => {

    // create Date object for current location
var date = new Date();

// convert to milliseconds, add local time zone offset and get UTC time in milliseconds
var utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);

// time offset for New Zealand is +12
//var timeOffset = 12;

// create new Date object for a different timezone using supplied its GMT offset.
return  new Date(utcTime).toISOString().replace(/\D/g, '');


}

export const getLocalStorageCollectionDataByKey = async (key) => {

    try {
        var existing = localStorage.getItem(key);

        // If no existing data, create an array
        // Otherwise, convert the localStorage string to an array
        existing = existing ? JSON.parse(existing) : [];

        return existing;

    } catch (error) {
        console('getLocalStorageCollectionDataByKey error', error)
    }
   
    

};


export const getLocalStorageKey = async (key) => {

    try {
        var existing = localStorage.getItem(key);

        // If no existing data, create an array
        // Otherwise, convert the localStorage string to an array
        existing = existing ? JSON.parse(existing) : undefined;

        return existing;

    } catch (error) {
        console('getLocalStorageCollectionDataByKey error', error)
    }
   
    

};

export const updateCollectionLS = async (collection, updatedObject)=>{

    let data = await getLocalStorageCollectionDataByKey(collection)

    const index = data.findIndex(obj => {
        return obj.id === updatedObject.id;
      });
      console.log(index); // 👉️ -1
      
      if (index !== -1) {
        data[index] = updatedObject;
        localStorage.setItem(collection, JSON.stringify(data))
      }
      

}

export const findBagItemInLSItems = async ()=>{


    let res = null
    let data = await getLocalStorageCollectionDataByKey('items')

    const index = data.findIndex(obj => {
        return obj.id === 145;
      });
      console.log('findBagItemInLSItems',index); // 👉️ -1
      
      if (index !== -1) {
        res = data[index] 
      }
      
      return res

}


export const removeItemFromCollectionLSById = async (collection, entryId)=>{

    let data = await getLocalStorageCollectionDataByKey(collection)

    const index = data.findIndex(obj => {
        return obj.entry_id === entryId;
      });
      console.log('removeItem',index); // 👉️ -1
      
      if (index !== -1) {
        data.splice(index,1)
        localStorage.setItem(collection, JSON.stringify(data))
      }
      

}

export const upsertCollectionLS = async (collection, updatedObject)=>{

    let data = await getLocalStorageCollectionDataByKey(collection)

    const index = data.findIndex(obj => {
        return obj.id === updatedObject.id;
      });
      console.log(index); // 👉️ -1
      
      if (index !== -1) {
        data[index] = updatedObject;
        localStorage.setItem(collection, JSON.stringify(data))
      }else{
        data.push(updatedObject)
        localStorage.setItem(collection, JSON.stringify(data))
      }
      

}

export const addItemToCollectionLS = async (collection, item)=>{

    let data = await getLocalStorageCollectionDataByKey(collection)
    data.push(item)
    localStorage.setItem(collection, JSON.stringify(data))
    
}

export const updateLocalStorageItem = async (key, keyValueObj)=>{

    let data = await getLocalStorageKey(key)

    let updated = {...data, ...keyValueObj}
   
    localStorage.setItem(key, JSON.stringify(updated))
      

}

export const itemBuilder = (item, index, quantity)=>{
    
    let date =new Date()
    let utcTime = date.getTime() + date.getTimezoneOffset()

    item.entry_id = idFromMillis()
    item.deleted = false
    item.date_added= formatDate(date)
    item.time_added= utcTime
    item.order=`${index}/${quantity}`
    item.quantity=index
    console.log(item)
    return item

    
    

    

}

export const getCartValue = (items) =>{
    return sumArrayByProp(items,'calculated_price')
}





//==================================================
//HELPERS
//====================================================


// ✅ Format a date to YYYY-MM-DD (or any other format)
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  function formatDate(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
  }


  const sumArrayByProp = (arr, prop) =>{
    return arr.reduce((a,item)=> a + item[prop],0)
  }