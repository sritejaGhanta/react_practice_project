
export const createItem = (key:string, value:string) => {
    if (!key || !value) return;
    
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    
    localStorage.setItem(key, stringValue);
}

export const readItem = (key:string) => {
    if (!key) return null;
    
    const storedValue = localStorage.getItem(key);
    
    // Try parsing as JSON in case the value is an object/array
    try {
        return JSON.parse(storedValue);
    } catch (e) {
        return storedValue; // If it's a regular string, return as is
    }
}

export const updateItem = (key:string, value:string)  => {
    if (!key || !value) return;
    
    // First, check if the item exists
    if (localStorage.getItem(key) !== null) {
        createItem(key, value); // Use the createItem function to update
    } else {
        console.log(`Item with key '${key}' does not exist.`);
    }
}

export const  clearStorage = () => {
    localStorage.clear();
}

export const  deleteItem =(key) =>  {
    if (!key) return;
    
    localStorage.removeItem(key);
}