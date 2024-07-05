
import { useState } from "react"
import { Alert, Button, Container, Form, FormControl } from "react-bootstrap"
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
        const  resp = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=10&appid=${APIkey}`);
        const data = await resp.json()
        setDati(data)

    }



    return (
        <Container>
            <h1>Meteo.Luisito</h1>
            <Form onSubmit={handleSubmit}>
            <FormControl 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value )}
            />
            <Button variant="success"> Cerca </Button>

            </Form>


            { dati.map((dato, index) => 
                <div key={index} className='d-flex align-items-center gap-3 border mb-2' onClick={() => navigate('/details', { state: { lat: dato.lat, lon: dato.lon } })}>
                    <h4>{dato.name}</h4>
                    <p>{dato.country}</p>
                    <p>latitudine: {dato.lat}</p>
                    <p>logintudine: {dato.lon}</p>
                </div>
            )}
        </Container>
    )
}


export default Home