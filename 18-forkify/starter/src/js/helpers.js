import { TIMEOUT_SEC } from "./config";

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function(url, uploadData = undefined){
  try{
    const fetchPro = uploadData ? fetch(url, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(uploadData)
    })
    : fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
  
    if(!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch(err) {
    console.error(err);
    throw err; 
    //VERY IMPORTANT TO DO THIS HERE SO THAT IT THROWS THE CORRECT ERROR HERE INSTEAD 
    //OF GOING TO THE ERROR IN THE TRY/CATCH OF THE BLOCK OF CODE CALLING THIS getJSON() method
    //eg: The catch clause in the model.js file
  }
}