
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const DetailsWeather = () => {
    const location = useLocation();
    const { lat, lon } = location.state;
    const APIkey = 'fe23de65622856b0b1333df3275a27fa'

    const [details, setDetails] = useState(null)

    const fecthDetails = async () => {
        const resp = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`)
        if(resp.ok) {
            const data = await resp.json()
            setDetails(data)
        }
    }

    useEffect(() => {
        fecthDetails()
    }, [])

    return (
        !details ? (
            <p>Loading...</p>
        ) : (
            <div>
                <h1>Dettagli Meteo</h1>
                <p>Nome: {details.name}</p>
                <p>Temperatura: {details.main.temp}°K</p>
                <p>Condizioni Meteo: {details.weather[0].description}</p>
                <p>Latitudine: {details.coord.lat}</p>
                <p>Longitudine: {details.coord.lon}</p>
            </div>
        )
    );
}

export default DetailsWeather;
