import getAdminLayout from "components/layouts/adminLayout";
import React, { useEffect } from "react";
import { ElevatedContainer } from "components/atoms/ElevatedContainer";
import { PatientEntity } from "@core/types/patient/IPatient";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { patientsState } from "@recoil/atoms/patients";
import gql from "graphql-tag";
import client from "src/apollo/apollo-client";
import { saveAs } from "file-saver";
const array = [
    {
        fullName: "Рахат Баймухамедов",
        photoURL:
            "https://oir.mobi/uploads/posts/2022-09/1662049786_14-oir-mobi-p-zadnii-fon-dlya-selfi-krasivo-14.jpg",
        _id: "1234",
        phoneNumber: "8775 955 10 15",
        email: "baidildavbahon08@gmail,com",
        dateOfBirth: "2000-01-16",
        address: "г Алматы, улицв Жуманова 46",
        identifyNumber: "000115781332",
        doctor: "Сайфуула Ахмедов",
        diagnoz: "Болезнь Крона",
        assignment:
            "Острый трансмуральный инфаркт миокарда (тип 1) передней и боковой стенок левого желудочка (давность около 3 суток, размеры очага некроза).",
    },
    {
        fullName: "Бекзат Жарылкасын",
        photoURL: "",
        _id: "23w31t",
        phoneNumber: "8775 467 91 90",
        email: "Zharylkasyn@icloud",
        dateOfBirth: "1996-02-28",
        address: "г Алматы, улицв Абая 98",
        identifyNumber: "960228464387",
        doctor: "Сайфуула Ахмедов",
        diagnoz: "Желчнокаменная болезнь",
        assignment:
            "Ишемический инфаркт лобной доли правого полушария головного мозга (атеротромботический, размеры очага некроза)",
    },
];

const PatientsPage: React.FC<{ patients: PatientEntity[] }> = ({
    patients,
}) => {
    return (
        <div className="">
            <h1 className="text-4xl font-bold mb-4">Пациенты</h1>
            <div className="form-control lg:w-1/2 mb-4">
                <input
                    type="text"
                    placeholder="Поиск"
                    className="input bg-base-200"
                />
            </div>
            <div className="w-full border-b-2 border-base-200 mb-4"></div>
            <div className="grid grid-cols-2 gap-4">
                {array.map((patient) => (
                    <PatientCard
                        key={patient?._id}
                        patient={patient}
                    ></PatientCard>
                ))}
            </div>
        </div>
    );
};

const PatientCard: React.FC<{ patient: PatientEntity }> = ({ patient }) => {
    return (
        <Link href={`/patients/${patient?._id}/home`}>
            <ElevatedContainer className="rounded-lg p-4 h-full">
                <div
                    style={{ marginBottom: 20 }}
                    className="flex items-center "
                >
                    <div className="avatar mr-4">
                        <div className="rounded-full w-20 h-20 bg-primary">
                            {patient.photoURL.length > 0 ? (
                                <img src={patient.photoURL} />
                            ) : (
                                <span className="text-4xl text-white uppercase flex items-center justify-center h-full">
                                    {patient.fullName[0]}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col justify-start">
                        <span className="text-2xl font-medium w-1/2 h-16">
                            {patient.fullName}
                        </span>
                        <span className="text-base-300">
                            ИИН: {patient.identifyNumber}
                        </span>
                    </div>
                </div>
                <div className={"flex flex-col"}>
                    <span className="text-xl mb-1 font-medium">
                        {" "}
                        Данные пациента{" "}
                    </span>
                    <div className={"flex flex-row"}>
                        <div className={"pr-5"}>
                            <div
                                style={{ marginBottom: 15 }}
                                className={"flex flex-col"}
                            >
                                <span
                                    style={{ fontSize: "18px" }}
                                    className="font-medium"
                                >
                                    {" "}
                                    Адрес:{" "}
                                </span>
                                <div className="text-base-300">
                                    {" "}
                                    {patient.address}
                                </div>
                            </div>
                            <div
                                style={{ marginBottom: 15 }}
                                className={"flex flex-col"}
                            >
                                <span
                                    style={{ fontSize: "18px" }}
                                    className="font-medium"
                                >
                                    {" "}
                                    Дата рождение:{" "}
                                </span>
                                <div className="text-base-300">
                                    {" "}
                                    {patient.dateOfBirth}
                                </div>
                            </div>
                        </div>
                        <div className={"pl-5"}>
                            <div
                                style={{ marginBottom: 15 }}
                                className={"flex flex-col"}
                            >
                                <span
                                    style={{ fontSize: "18px" }}
                                    className="font-medium"
                                >
                                    {" "}
                                    Телефон номера:{" "}
                                </span>
                                <div className="text-base-300">
                                    {" "}
                                    {patient.phoneNumber}
                                </div>
                            </div>
                            <div
                                style={{ marginBottom: 15 }}
                                className={"flex flex-col"}
                            >
                                <span
                                    style={{ fontSize: "18px" }}
                                    className="font-medium"
                                >
                                    {" "}
                                    Электронная почта:{" "}
                                </span>
                                <div className="text-base-300">
                                    {" "}
                                    {patient.email}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"flex flex-col"}>
                        <span className="text-xl mb-1 font-medium">
                            {" "}
                            Результаты анализов{" "}
                        </span>

                        <div className={"flex flex-col"}>
                            <div
                                style={{ marginBottom: 15 }}
                                className={"flex flex-col"}
                            >
                                <span
                                    style={{ fontSize: "18px" }}
                                    className="font-medium"
                                >
                                    {" "}
                                    Терапевт:{" "}
                                </span>
                                <div className="text-base-300">
                                    {" "}
                                    {patient.doctor}
                                </div>
                            </div>
                            <div
                                style={{ marginBottom: 15 }}
                                className={"flex flex-col"}
                            >
                                <span
                                    style={{ fontSize: "18px" }}
                                    className="font-medium"
                                >
                                    {" "}
                                    Диагноз:{" "}
                                </span>
                                <div className="text-base-300">
                                    {" "}
                                    {patient.diagnoz}
                                </div>
                            </div>
                            <div
                                style={{ marginBottom: 15 }}
                                className={"flex flex-col"}
                            >
                                <span
                                    style={{ fontSize: "18px" }}
                                    className="font-medium"
                                >
                                    {" "}
                                    Заключение:{" "}
                                </span>
                                <div className="text-base-300">
                                    {" "}
                                    {patient.assignment}
                                </div>
                            </div>
                        </div>
                        <button
                            style={{
                                margin: "0 auto",
                                borderRadius: "16px",
                                padding: "5px",
                                border: "1px solid #000",
                                width: "200px",
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                saveAs(
                                    "/files/whitepaper-nfa.pdf",
                                    "whitepaper-nfa.pdf",
                                );
                            }}
                        >
                            Cкачать анализa
                        </button>
                    </div>
                </div>
            </ElevatedContainer>
        </Link>
    );
};

// export async function getStaticProps() {
//     const PATIENTS_LIST = gql`
//         query {
//             listUsers {
//                 fullName
//                 _id
//                 photoURL {
//                     m
//                 }
//             }
//         }
//     `;
//     const { data } = await client.query({
//         query: PATIENTS_LIST,
//     });
//     const patients = data?.listUsers;
//
//     return {
//         props: { array },
//         revalidate: 10,
//         // will be passed to the page component as props
//     };
// }
export default PatientsPage;
