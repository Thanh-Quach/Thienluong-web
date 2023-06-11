import { useState } from "react";
import { Form, Button, Dropdown } from "react-bootstrap";
import DateTimePicker from 'react-datetime-picker';
import API from "../API/api";

export default function Clients () {
    const [name, setName] = useState();
    const [birthdate, setBirthDate] = useState();
    const [birthZone, setBirthZone] = useState(0);
    const [meetingDate, setMeetingDate] = useState();
    const [locationZone, setLocationZone] = useState(0);
    const [meetingMethod, setMeetingMethod] = useState('Online');
    const [phone, setPhone] = useState();
    const [note, setNote] = useState('');
    const [email, setEmail] = useState();
    const scheduleMeeting = () => {
        (name&&
        birthdate&&
        meetingDate&&
        meetingMethod&&
        phone&&
        email)?
        API.store({
            'name':name,
            'birthday':new Date(birthdate).getTime()+birthZone*3600000,
            'meetingdate':new Date(meetingDate).getTime()+locationZone*3600000,
            'meetingmethod':meetingMethod,
            'note':note,
            'phone':phone,
            'email':email,
        })
        .then(()=>{
            alert('You request has been submit. We will contact you ASAP for a quote')
            
        })
        .catch(err=>console.log(err))
        :
        alert('Please fill in all (*) required field')
    }
    const timeZone = () => {
        let array = [];
        for (let i = -12; i<13; i++) {
            array = [...array, i]
        }
        return array;
    }
    return(
        <div className="vh-100 d-flex align-items-center">
                <Form className="w-75 mx-auto row">
                    <div className="col-6">
                        <div className="mb-5">
                            <div>
                                Personal Info
                            </div>
                            <Form.Group>
                            <Form.Control
                                required
                                placeholder="Name*"
                                onChange={(e)=>setName(e.target.value)}
                            />
                            </Form.Group>
                            <div className="my-2">
                                <div>
                                    BirthDate and time zone*
                                </div>
                                <div className="row">
                                    <DateTimePicker
                                        className='col'
                                        value={birthdate}
                                        onChange={setBirthDate}
                                    />
                                    <Dropdown className="col-4">
                                    <Dropdown.Toggle variant="outline-secondary">
                                        GMT {birthZone}:00
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu
                                        className="overflow-auto"
                                        style={{height:'200px'}}
                                    >
                                        {timeZone().map((item,index)=>
                                            <Dropdown.Item 
                                                key={index}
                                                onClick={()=>setBirthZone(item)}
                                            >
                                                    GMT {item}:00
                                            </Dropdown.Item>
                                        )}
                                    </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div>
                                    Both birthdate and birthtime are required to get an accurate result
                                </div>
                            </div>
                        </div>
                        <div className="my-3">
                            <div>
                                Meeting Info*
                            </div>
                            <div className="row">
                                    <DateTimePicker
                                        className='col'
                                        value={meetingDate}
                                        onChange={setMeetingDate}
                                    />
                                    <Dropdown className="col-4">
                                    <Dropdown.Toggle variant="outline-secondary">
                                        GMT {locationZone}:00
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu
                                        className="overflow-auto"
                                        style={{height:'200px'}}
                                    >
                                        {timeZone().map((item,index)=>
                                            <Dropdown.Item 
                                                key={index}
                                                onClick={()=>setLocationZone(item)}
                                            >
                                                    GMT {item}:00
                                            </Dropdown.Item>
                                        )}
                                    </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <Dropdown className="w-100 my-1">
                                    <Dropdown.Toggle variant="outline-secondary">
                                        I would like to meet {meetingMethod.toLowerCase()}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu
                                        className="overflow-auto"
                                    >
                                            <Dropdown.Item
                                                onClick={()=>setMeetingMethod('Online')}
                                            >
                                                Online
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                onClick={()=>setMeetingMethod('In-person')}
                                            >
                                                In-person
                                            </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            Contact Info
                        </div>
                        <Form.Group>
                        <Form.Control
                            className="my-1"
                            placeholder="Phone*"
                            onChange={(e)=>setPhone(e.target.value)}
                        />
                        </Form.Group>                    
                        <Form.Group>
                        <Form.Control
                            className="my-1"
                            placeholder="Email*"
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                        </Form.Group>
                        <Form.Group>
                        <Form.Control
                            as="textarea"
                            className="my-1"
                            placeholder="Note"
                            onChange={(e)=>setNote(e.target.value)}
                        />
                        </Form.Group>
                    </div>
                    <div>
                        <Button
                            onClick={()=>scheduleMeeting()}
                        >
                            Submit
                        </Button>
                    </div>
                </Form>
        </div>
    )
}