import { useState, useEffect } from 'react';
import { db } from './firebase';
import { collectIdsAndDocs } from './utilities';

function useCollection(path, orderBy, where = []) {
  const [docs, setDocs] = useState([]);

  const [queryField, queryOperator, queryValue] = where;

  useEffect(() => {
    let collection = db.collection(path);

    if (orderBy) {
      collection = collection.orderBy(orderBy);
    }

    if (queryField) {
      collection = collection.where(queryField, queryOperator, queryValue);
    }

    return collection.onSnapshot(snapshot => {
      const docs = snapshot.docs.map(collectIdsAndDocs);
      setDocs(docs);
    });
  }, [path, orderBy, queryField, queryOperator, queryValue]);

  return docs;
}

export default useCollection;
