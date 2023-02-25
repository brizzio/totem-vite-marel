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

