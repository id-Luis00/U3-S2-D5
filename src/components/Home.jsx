
import { useEffect, useState } from "react"
import { Alert, Button, Container, Form, FormControl, ListGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"



const Home = () => {

    const navigate = useNavigate()
    const APIkey = 'fe23de65622856b0b1333df3275a27fa'
    const [searchQuery, setSearchQuery] = useState('')
    const [dati, setDati] = useState([])



    const handleSubmit = (e) => {
        e.preventDefault()

        fetchPosition()
    }



    const fetchPosition = async () => {

        // devo trovare la longitudine e latitudine
        const resp = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=20&appid=${APIkey}`);
        const data = await resp.json()
        setDati(data)

    }



    return (
        <Container fluid >
            <Container fluid className="weatherGif">
            </Container>

            <div id="i-main">
                <h1 id="mainTitle" className="text-center text-light">Meteo.Luisito</h1>
                <Form onSubmit={handleSubmit} className=" mb-3 mt-5 d-flex justify-content-center gap-3">
                    <FormControl
                        type="text"
                        placeholder="inserire una località"
                        className="w-75"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button variant="trasparent" type="submit" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </Button>
                </Form>

                <Container className='p-2 mb-2' >
                    <ListGroup>
                        {dati.map((dato, index) =>


                            <ListGroup.Item
                                className="city d-flex align-items-center gap-3"
                                key={index}
                                onClick={() => navigate('/details', { state: { lat: dato.lat, lon: dato.lon } })}
                            >
                                <h4>{dato.name}</h4>
                                <p className="m-0">{dato.country} </p>
                                <strong className="ms-auto">{dato.state ? dato.state : 'N/S'}</strong>
                            </ListGroup.Item>
                        )}
                    </ListGroup>

                </Container>
            </div>


        </Container>
    )
}


export default Home