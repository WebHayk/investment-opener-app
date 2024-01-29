export class Mappers {
    static firebaseDataMapper = (docs: any) => {
        return docs.map((doc: any) => {
            let data = doc.data();
            let {id} = doc;
            return {
                ...data,
                id
            }
        });
    }
}