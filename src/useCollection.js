import { useState, useEffect } from 'react';
import { db } from './firebase';
import { collectIdsAndDocs } from './utilities';

function useCollection(path, orderBy) {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    let collection = db.collection(path);

    if (orderBy) {
      collection = collection.orderBy(orderBy);
    }

    return collection.onSnapshot(snapshot => {
      const docs = snapshot.docs.map(collectIdsAndDocs);
      setDocs(docs);
    });
  }, [path, orderBy]);

  return docs;
}

export default useCollection;
