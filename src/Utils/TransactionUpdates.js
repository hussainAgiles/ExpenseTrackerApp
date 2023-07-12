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