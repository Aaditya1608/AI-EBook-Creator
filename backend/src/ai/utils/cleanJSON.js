function cleanJSON(text){
    return text
            .replace(/```json/g,"")
            .replace(/```/g,"")
            .trim();
}
export default cleanJSON;