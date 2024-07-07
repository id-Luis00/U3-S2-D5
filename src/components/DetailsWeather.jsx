
import { useEffect, useState } from 'react';
import { Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';


const DetailsWeather = () => {
    const location = useLocation();
    const { lat, lon } = location.state;
    const APIkey = 'fe23de65622856b0b1333df3275a27fa'


    const Link = ({ id, children, title }) => (
        <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
            {children}
        </OverlayTrigger>
    );

    const hoverT = ({ id, children, title }) => (
        <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={`tooltip-${id}`}>{title}</Tooltip>}
        >
            {children}
        </OverlayTrigger>
    );



    const [details, setDetails] = useState(null)
    const [time, setTime] = useState({
        hours: '',
        minutes: ''
    })

    const fecthDetails = async () => {
        const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`)
        if (resp.ok) {
            const data = await resp.json()
            setDetails(data)

        }
    }

    useEffect(() => {
        fecthDetails()
        const interval = setInterval(() => {
            const date = new Date();
            setTime({
                hours: date.getHours(),
                minutes: date.getMinutes()
            });
        }, 1000);

        return () => clearInterval(interval)
    }, [])




    if (!details) {
        return <p>Loading...</p>;
    }

    const timestamp = details.dt;
    const date = new Date(timestamp * 1000);
    const day = date.getDate()
    let month = date.getMonth()
    let main = details.weather[0].main
    let mainPh;



    switch (main) {
        case 'Clear':
            main = 'Cielo Sereno'
            mainPh = <img src=".././public/weather-img/sunny.png" alt={main} />
            break;
        case 'Clouds':
            main = 'Nuvoloso'
            mainPh = <img src=".././public/weather-img/cloudy.png" alt={main} />
            break;
        case 'Rain':
            main = 'pioggia'
            mainPh = <img src=".././public/weather-img/rainy.png" alt={main} />
            break;
        case 'Drizzle':
            main = 'Pioggerella'
            mainPh = <img src=".././public/weather-img/rainy.png" alt={main} />
            break;
        case 'Thunderstorm':
            main = 'Temporale'
            mainPh = <img src=".././public/weather-img/stormy.png" alt={main} />
            break;
        case 'Snow':
            main = 'Neve'
            mainPh = <img src=".././public/weather-img/snow.png" alt={main} />
            break;
        case 'Mist':
            main = 'Foschia'
            mainPh = <img src=".././public/weather-img/mist.png" alt={main} />
            break;
        case 'Smoke':
            main = 'Fumo'
            mainPh = <img src=".././public/weather-img/mist.png" alt={main} />
            break;
        case 'Haze':
            main = 'Foschia'
            mainPh = <img src=".././public/weather-img/mist.png" alt={main} />
            break;
        case 'Dust':
            main = 'Polvere'
            mainPh = <img src=".././public/weather-img/mist.png" alt={main} />
            break;
        case 'Fog':
            main = 'Nebbia'
            mainPh = <img src=".././public/weather-img/mist.png" alt={main} />
            break;
        case 'Sand':
            main = 'Sabbia'
            mainPh = <img src=".././public/weather-img/mist.png" alt={main} />
            break;
        case 'Ash':
            main = 'Cenere vulcanica'
            mainPh = <img src=".././public/weather-img/mist.png" alt={main} />
            break;
        case 'Squall':
            main = 'Burrasca'
            mainPh = <img src=".././public/weather-img/rafficheNeve.png" alt={main} />
            break;
        case 'Tornado':
            main = 'Tornado'
            mainPh = <img src="https://www.svgrepo.com/show/223553/tornado.svg" alt={main} />
            break;
        default:
            break;
    }




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
        case 7:
            month = 'agosto'
            break;
        case 8:
            month = 'settembre'
            break;
        case 9:
            month = 'ottobre'
            break;
        case 10:
            month = 'novembre'
            break;
        case 11:
            month = 'dicembre'
            break;
        default:
            break;
    }


    return (
        <Container fluid className='text-center text-light p-0'>

            {/* <h1 id='details_city'>{details.name}</h1>
            <p id='currentDay'>{day}  {month}, {time.hours}:{ time.hours < 12 ? time.minutes + " AM" : time.minutes + " PM"}</p>
            <p id='temperature'>{((details.main.temp) - 273.15).toFixed(1)}°c</p> */}

            <Container className=' mt-3'>
                <h1 id='details_city'>{details.name}</h1>
                <h6> <span className='text-info'>Lat: </span> {lat} <span  className='text-info'>Lon: </span> {lon}</h6>
                <p id='currentDay'>{day}  {month}, {time.hours}:{time.hours < 12 ? time.minutes + " AM" : time.minutes + " PM"}</p>
            </Container>

            <Row className='mt-5'>
                <Col xs={12} md={6} lg={5} className=' overflow-hidden weatherDetails'>
                    {/* <h1 className='weatherGif'></h1> */}
                    {mainPh}
                    <p className='fs-2 m-0'>{main}</p>
                </Col>

                <Col xs={12} md={6} lg={7} className=''>
                    <Container className='d-flex flex-column'>
                        <div>
                            <p id='temperature' className='m-0'>{((details.main.temp) - 273.15).toFixed(1)}°c</p>
                        </div>

                        {/* <div>
                            <p className='fs-2 m-0'>{main}</p>
                        </div> */}

                        <Row className='mt-3 g-1'>

                            <Col id='humidity' className='d-flex justify-content-center align-items-center gap-2 p-2'>

                                <hoverT id='humidity-icon' title='Umidità'>
                                    <svg fill='cyan' width={'75'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 18.2c0-2.8 3-5.2 3-5.2s3 2.4 3 5.2c0 2-1.125 2.8-3 2.8s-3-.8-3-2.8zM6 3S3 5.4 3 8.2c0 2 1.125 2.8 3 2.8s3-.8 3-2.8C9 5.4 6 3 6 3zm12 0s-3 2.4-3 5.2c0 2 1.125 2.8 3 2.8s3-.8 3-2.8C21 5.4 18 3 18 3z" /></svg>
                                </hoverT>


                                <p>umidità: {details.main.humidity}%</p>
                            </Col>

                            <Col id='wind' className='d-flex justify-content-center align-items-center gap-2 p-2'>

                                <hoverT id='wind-icon' title='Vento' >

                                    <svg fill='white' width={75} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4,21V3A1,1,0,0,1,6,3V21a1,1,0,0,1-2,0ZM15,4.167l-2-.334V9.75l2-.5ZM20,5l-3-.5V8.75L20,8ZM11,3.5,8,3v8l3-.75Z" /></svg>
                                </hoverT>

                                <p>velocità del vento:<br /> {details.wind.speed} km/h</p>
                                
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>

        </Container>
    );
}


export default DetailsWeather;
