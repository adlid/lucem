import { gql } from "@apollo/client";

export const GET_APPOINTMENT_BLANKS_OF_USER = gql`
    query GetAppointmentBlanksOfUser($userId: String!) {
        getAppointmentBlanksOfUser(userId: $userId, page: 1) {
            _id

            complaint {
                complaint
                sicknessTimeDuration
                reason
                doctor {
                    fullName
                    avatar {
                        m
                    }
                }
                doctorId
            }
            diagnose {
                diagnose
                deseaseDBCode
                natureOfTheDesease
                preliminary
                doctor {
                    fullName
                    avatar {
                        m
                    }
                }
                doctorId
            }
            inspections {
                description
                doctor {
                    fullName
                    avatar {
                        m
                    }
                }
                doctorId
                images {
                    m
                }
                _id
            }
        }
    }
`;
