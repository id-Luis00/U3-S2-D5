
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const DetailsWeather = () => {
    const location = useLocation();
    const { lat, lon } = location.state;
    const APIkey = 'fe23de65622856b0b1333df3275a27fa'



    const [details, setDetails] = useState(null)

    const fecthDetails = async () => {
        const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`)
        if (resp.ok) {
            const data = await resp.json()
            setDetails(data)

        }
    }

    useEffect(() => {
        fecthDetails()
    }, [])




    if (!details) {
        return <p>Loading...</p>;
    }

    const timestamp = details.dt;
    const date = new Date(timestamp * 1000);
    const day = date.getDate()
    let month = date.getMonth()


    switch (month) {
        case 0:
            month = 'gennaio'
            break;
        case 1:
            month = 'febbraio'
            break;
        case 2:
            month = 'marzo'
            break;
        case 3:
            month = 'aprile'
            break;
        case 4:
            month = 'maggio'
            break;
        case 5:
            month = 'giugno'
            break;
        case 6:
            month = 'luglio'
            break;

        default:
            break;
    }

    return (
        <Container fluid className='text-center'>
            <h1 id='currentPlace'>{details.name}</h1>
            <p id='currentDay'>{day}  {month}</p>
            <p id='temperature'>{((details.main.temp) - 273.15).toFixed(1)}<span className='text-dark'>°c</span></p> 
            <p>Condizioni Meteo: {details.weather[0].description}</p>
            <p>Latitudine: {details.coord.lat}</p>
            <p>Longitudine: {details.coord.lon}</p>
        </Container>
    );
}


export default DetailsWeather;
