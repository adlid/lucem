import { ConsultSessionEntity } from "../session/ISession";
export interface PatientEntity {
    fullName: string;
    photoURL: string;
    _id: string;
    phoneNumber: string;
    email: string;
    dateOfBirth: string;
    address: string;
    identifyNumber:string;
    doctor:string;
    assignment:string;
    diagnoz:string
}
