
import { useState } from "react"
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
        <Container fluid>
            <h1 className="mainTitle">Meteo.Luisito</h1>
            <Form onSubmit={handleSubmit} className="d-flex mb-3">
                <FormControl
                    type="text"
                    placeholder="inserire una località"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="success" > Cerca </Button>

            </Form>



            <Container className='p-2 d-flex align-items-center gap-3 mb-2' >
                <ListGroup className="w-100">
                    {dati.map((dato, index) =>


                        <ListGroup.Item className="w-100 city d-flex align-items-center gap-3" key={index} onClick={() => navigate('/details', { state: { lat: dato.lat, lon: dato.lon } })}>
                            <h4>{dato.name}</h4> <p>{dato.country}</p>
                        </ListGroup.Item>

                    )}
                </ListGroup>
            </Container>

        </Container>
    )
}


export default Home