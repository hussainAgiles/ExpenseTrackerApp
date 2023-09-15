import Images from "../Constants/Images";
import { categoryColors } from "../Constants/constant";

export const updateTrxn = async (transaction)=>{
    // console.log("update item",transaction)
    var query = fireStore()
      .collection('Transaction')
      .where('id', '==', transaction.id);
    query.get().then(snapshot => {
      const batch = fireStore().batch();
      snapshot.forEach(doc => {
        batch.update(doc.ref, transaction);
      });
      return batch.commit();
    });
  }


  export const handleCategories = data => {
    data.map((item, index) => {
      data[index].longname = capitalize(item.longname);
      data[index].color = categoryColors[index % categoryColors.length];
    });
    return data;
  };

 export  const capitalize = str => {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
  };