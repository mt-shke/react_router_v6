export const API_URL = "http://localhost:5000/api/v1/";

export const getData = async (apiDataName) => {
    try {
        const resp = await fetch(API_URL + apiDataName);
        if (!resp) {
            console.log("getData: no response");
        }
        const data = await resp.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};
