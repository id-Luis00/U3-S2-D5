
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
        <Container fluid style={{backgroundImage: `url('https://img.freepik.com/free-vector/gorgeous-clouds-background-with-blue-sky-design_1017-25501.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1719705600&semt=ais_user')`, backgroundSize: 'cover', height: '100vh'}}>
            <h1 id="mainTitle" className="text-center text-light">Meteo.Luisito</h1>
            <Form onSubmit={handleSubmit} className=" mb-3 mt-5 d-flex justify-content-center gap-3">
                <FormControl
                    type="text"
                    placeholder="inserire una località"
                    className="w-25"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="info" > Cerca </Button>

            </Form>



            <Container className='p-2 d-flex align-items-center gap-3 mb-2' >
                <ListGroup className="w-50 mx-auto">
                    {dati.map((dato, index) =>


                        <ListGroup.Item className="city d-flex align-items-center gap-3" key={index} onClick={() => navigate('/details', { state: { lat: dato.lat, lon: dato.lon } })}>
                            <h4>{dato.name}</h4> <p className="m-0">{dato.country} </p> <strong className="ms-auto">{dato.state}</strong>
                        </ListGroup.Item>

                    )}
                </ListGroup>
            </Container>

        </Container>
    )
}


export default Home