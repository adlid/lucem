import React, { useMemo, useState } from "react";
import styled from "styled-components";
import getAdminLayout from "components/layouts/adminLayout";
import {
    FinanceStats,
    getFinanceStatsOfDoctor,
    GET_DOCTOR_STATS,
} from "@src/api/queries/finances";
import { addDays, format, subDays, subYears } from "date-fns";
import { getSession } from "next-auth/client";
import { useQuery } from "@apollo/client";
import { getDoctorTokens } from "@src/utils/getToken";
import {
    getBookingsOfDoctor,
    getBookingsOfDoctorVariables,
    getBookingsOfDoctor_getBookingsByDoctorIdAndDates,
} from "@graphqlTypes/getBookingsOfDoctor";
import { GET_BOOKINGS_OF_DOCTOR } from "@src/api/queries/bookings";
import { ru } from "date-fns/locale";

const FinancePage = () => {
    const { token, doctorId } = getDoctorTokens();
    const [today, setToday] = useState(new Date());
    const { data: bookingsRes, loading: bookingsLoading } = useQuery<
        getBookingsOfDoctor,
        getBookingsOfDoctorVariables
    >(GET_BOOKINGS_OF_DOCTOR, {
        variables: {
            doctorId,
            firstDate: subYears(today, 1),

            secondDate: addDays(today, 1),
        },
        context: {
            // example of setting the headers with context per operation
            headers: {
                Authorization: token,
            },
        },
    });
    const {
        data: financeStatsRes,
        loading: financeLoading,
        error: financeError,
        refetch,
    } = useQuery(GET_DOCTOR_STATS, {
        variables: {
            startDate: subDays(today, 1),

            secondDate: addDays(today, 1),
        },
        context: {
            headers: {
                Authorization: token,
            },
        },
    });
    const financeStats = financeStatsRes?.getStatsOfDoctorByPeriodsOfTime;
    const finishedBookings = useMemo(
        () =>
            bookingsRes?.getBookingsByDoctorIdAndDates?.filter(
                (booking) => booking.progress !== "Upcoming",
            ),
        [bookingsRes],
    );

    if (financeLoading || bookingsLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="flex justify-between">
                <p className="text-3xl font-bold">Финансы</p>
                <p className=" text-gray-400 self-center">
                    Обновлено 10 сентября, 11:27
                </p>
            </div>
            <hr className="my-3" />
            <div className="py-5">
                <div className="flex">
                    <div className="flex-1 bg-gradient-to-b from-main-green to-green-400 rounded p-10 text-white space-y-10">
                        <div>
                            <p>За сегодня вы получите:</p>
                            <p className="text-4xl font-bold">
                                {financeStats.totalMoneyEarnt}
                                <span>₸</span>
                            </p>
                        </div>
                        <p>Платеж в конце сегодняшнего дня в 18:00</p>
                    </div>
                    <div className="flex-1"></div>
                </div>
            </div>
            <div>
                <p className="text-lg">История плажетей</p>
            </div>
            <div className="flex justify-between">
                <div className="flex space-x-2 bg-gray-100 p-1 rounded">
                    <div className="flex items-center rounded py-1 px-2 bg-pink-purple text-white cursor-pointer">
                        <p>За все время</p>
                    </div>
                </div>
                <div className="flex p-2 bg-gray-100 rounded space-x-2">
                    <button>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    </button>
                    <p>4 авг.</p>
                </div>
            </div>
            <div className="p-5 bg-gray-100 rounded-t mt-5">
                <div className="flex justify-between">
                    <p>Платежи полученные за выбранный период времени</p>
                    <p className="text-main-green">
                        +{" "}
                        {finishedBookings
                            .filter((el) => el.progress === "Done")
                            .reduce((acc, cur) => cur.service.price + acc, 0)}
                        тг.
                    </p>
                </div>
                <div className="pt-5">
                    <div className=" h-60 overflow-auto space-y-2">
                        {finishedBookings.map((booking) => (
                            <PaymentCard booking={booking} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const PaymentCard = ({
    booking,
}: {
    booking: getBookingsOfDoctor_getBookingsByDoctorIdAndDates;
}) => {
    return (
        <div className="grid grid-cols-14 p-5 bg-white rounded">
            <div className="col-start-1 col-end-2">
                <p>
                    {format(new Date(booking.startDate), "yyyy dd MMM ", {
                        locale: ru,
                    })}
                </p>
                <p className="text-gray-400">
                    {" "}
                    {format(new Date(booking.startDate), "HH:mm", {
                        locale: ru,
                    })}
                </p>
            </div>
            <div className="flex col-start-2 col-end-6 space-x-2">
                <img
                    src="http://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png"
                    alt=""
                    className="h-12 w-12"
                />
                <div>
                    <p>{booking.user.fullName}</p>
                    <p className="text-gray-400">
                        {booking.service.name} - 50%
                    </p>
                </div>
            </div>
            <div className="flex col-start-7 col-end-11 items-center justify-center">
                <p className="text-main-green">{booking.progress}</p>
            </div>
            {booking.progress === "Done" ? (
                <div className="flex col-start-11 col-end-13 items-center justify-end">
                    <p>+{booking.service.price} тг.</p>
                </div>
            ) : (
                <div className="flex col-start-11 col-end-13 items-center justify-end">
                    <p>Ничего</p>
                </div>
            )}
        </div>
    );
};

export default FinancePage;
