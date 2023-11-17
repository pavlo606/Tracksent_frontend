import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
import dayjs from 'dayjs';
import { GoogleMap, Polyline, useLoadScript } from "@react-google-maps/api";
import { useParams } from 'react-router-dom';
import { fieldContext } from "../../context/fields";
import PrimarySelect from "../../components/PrimarySelect/PrimarySelect";
import { MapContainer, MapWrapper } from "./MapPage.styled";
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';

// const tractorsOptions = [
//     { value: 1, label: "Tracktor1" },
//     { value: 2, label: "Tracktor2" },
//     { value: 3, label: "Tracktor3" },
// ];

const getDefaultDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate() - 1;

    const month2 = today.getMonth() + 1;
    const year2 = today.getFullYear();
    const date2 = today.getDate();

    return [`${year}-${month}-${date}T00:00:00`, `${year2}-${month2}-${date2}T00:00:00`];
};

const MapPage = () => {
    const fields = useContext(fieldContext);
    const { fieldId } = useParams();

    const [currentCoords, setCurrentCoords] = useState([]);
    const [tractorOptions, setTractorOptions] = useState([]);
    const [selectedTractor, setSelectedTractor] = useState(1);
    const [currentDate, setCurrentDate] = useState(getDefaultDate());

    useEffect(() => {
        const apiUrl = 'https://pavlodykyi.pythonanywhere.com/vehicle';
        axios.get(apiUrl)
        .then((resp) => {
            const data = resp.data;
            console.log("data:");
            setTractorOptions(data.map((i) => ({ value: i.id, label: i.name_of_owner })));
            setSelectedTractor(data[0].id);
        })
    }, [])

    useEffect(() => {
        const apiUrl = 'https://pavlodykyi.pythonanywhere.com/coord';
        const data = {
            field_id: fieldId,
            vehicle_id: selectedTractor,
            datetime1: currentDate[0],
            datetime2: currentDate[1],
        };
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: apiUrl,
            headers: {'Content-Type': 'multipart/form-data'},
            data: data
        };
        axios(config)
            .then((resp) => {
                const data = resp.data;
                console.log(data)
                setCurrentCoords(data);
            });
    }, [selectedTractor, currentDate])

    const current_field = fields.filter(a => a.id == fieldId)[0]

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyD0Olp0Xel1QNXQ7ZeB6lJVz-UTpBIdTDM",
    });

    const onDatePickerChange = (value) => {
        if (!value) return;
        const datetime1 = `${value[0].$y}-${("0" + (value[0].$M + 1)).slice(-2)}-${("0" + value[0].$D).slice(-2)}T00:00:00`;
        const datetime2 = `${value[1].$y}-${("0" + (value[1].$M + 1)).slice(-2)}-${("0" + value[1].$D).slice(-2)}T00:00:00`;
        console.log([datetime1, datetime2]);
        setCurrentDate([datetime1, datetime2]);
    };

    return current_field ? (
        <MapWrapper>
            <h2>{current_field.title}</h2>
            <p>{current_field.description}</p>
            <PrimarySelect
                defaultValue={selectedTractor}
                onChange={setSelectedTractor}
                options={tractorOptions}
            />
            <RangePicker
                defaultValue={[
                    dayjs(currentDate[0].slice(0, 10), dateFormat),
                    dayjs(currentDate[1].slice(0, 10), dateFormat)
                ]}
                onChange={onDatePickerChange}
            />
            <MapContainer>
                {!isLoaded ? (
                    <h1>Loading...</h1>
                ) : (
                    <GoogleMap
                        center={{ 
                            lat: current_field.center_lat,
                            lng: current_field.center_lng
                        }}
                        zoom={15}
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                        mapTypeId="hybrid"
                    >
                        <Polyline
                            path={currentCoords}
                            options={{
                                strokeColor: '#FF0000',
                            }}
                        />
                    </GoogleMap>
                )}
            </MapContainer>
        </MapWrapper>
    ) :
        (
            <h2>No such field</h2>
        )
};

export default MapPage