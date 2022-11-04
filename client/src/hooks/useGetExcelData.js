import { useState, useEffect } from 'react';

const useGetExcelData = (data) => {
    const [dataCsv, setDataCsv] = useState([]);

    const dataToDownload = data.map((item) => {
        let date = new Date(item.date);
        let dayNum = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let hour = date.getHours();
        let minute = date.getMinutes();

        return {
            name: item.name,
            email: item.email,
            phone: item.phone,
            date: `${dayNum}-${month + 1 < 10 ? `0${month}` : month + 1}-${year}`,
            time: `${hour > 11 ? hour - 12 : hour}:${minute < 10 ? `0${minute}` : minute} ${hour > 11 ? "PM" : "AM"}`,
            course: item.course,
            status: item.status,
            title: item.title,
            description: item.description,
            referenceName: item.reference.name,
            referencePhone: item.reference.phoneNo
        }
    });

    useEffect(() => {
        setDataCsv(dataToDownload);
    }, []);

    return dataCsv
}

export default useGetExcelData;