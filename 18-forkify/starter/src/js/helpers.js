import { TIMEOUT_SEC } from "./config";

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function(url){
  try{
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
  
    if(!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch(err) {
    throw err; 
    //VERY IMPORTANT TO DO THIS HERE SO THAT IT THROWS THE CORRECT ERROR HERE INSTEAD 
    //OF GOING TO THE ERROR IN THE TRY/CATCH OF THE BLOCK OF CODE CALLING THIS getJSON() method
    //eg: The catch clause in the model.js file
  }
}