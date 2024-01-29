import {collection, getDocs, query, deleteDoc, where, doc} from "firebase/firestore";
import {database} from "../firebase";
import {Mappers} from "../mappers";

export class LicenseKeysService {

    static licenseKeysCollection = () => {
        return collection(
            database,
            "license_keys"
        );
    }

    static getAllLicenseKeys = async () => {
        let {licenseKeysCollection} = this;
        const licenseKeysQuery = query(
            licenseKeysCollection()
        );

        const querySnapshot = await getDocs(licenseKeysQuery);
        let {docs} = querySnapshot;
        return Mappers.firebaseDataMapper(docs);
    }

    static deleteLicenseKey = async (id: string) => {
        let {licenseKeysCollection} = this;
        return await deleteDoc(doc(licenseKeysCollection(), id));
    }
}