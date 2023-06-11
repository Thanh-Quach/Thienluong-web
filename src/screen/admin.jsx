import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import API from "../API/api";

export default function Admin () {
    const [token, setToken]= useState(localStorage.getItem("token"));
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [appointmentList, setAppoinemntList] = useState([]);
    const tableHeader = [
        'Name', 
        'Birthday', 
        'Meeting Infomation', 
        'Contact',
        'Action'
    ]

    useEffect(()=>{
        token&&API.index(token)
        .then(res=>
            setAppoinemntList(res.data)
        )
        .catch(err=>console.log(err))
    },[token])

    const Authenticate = () => {
        API.authenticate({username: username.toLowerCase(), password: password})
        .then(res=>{
            localStorage.setItem("token", res.data)
            setToken(res.data)
        })
        .catch(err=>console.log(err))
    }
    const deleteAppointment = (uid) => {
        API.delete(token, uid)
        .then(()=>{
            alert('Success')
            setAppoinemntList(item=>item.filter(items=>items.uid!==uid))
        })
        .catch(err=>console.log(err))
    }
    return(
        <div className="vh-100 vw-100 px-2">            
            {!token?
            <div className="d-flex align-items-center h-75">
                <Form className="w-25 mx-auto">
                    <Form.Group>
                    <Form.Control
                        placeholder="username"
                        onChange={(e)=>setUsername(e.target.value)}
                    />
                    </Form.Group>
                    <Form.Group>
                    <Form.Control
                        className="my-1"
                        placeholder="password"
                        type="password"
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    </Form.Group>
                    <Button
                        onClick={()=>Authenticate()}
                    >
                        Login
                    </Button>
                </Form>
            </div>
            :
            <table className="w-75 mx-auto mt-5">
                <tr className="row border-start border-top">
                {tableHeader.map((item, index)=>
                    <th 
                        key={index}
                        className="col border-end border-bottom bg-secondary text-white"
                    >
                        {item}
                    </th>
                )}
                </tr>
                {appointmentList.map((item,index)=>
                <tr 
                    key={index}
                    className="row border-start">
                    <td className="col border-end border-bottom">
                        {item.name}
                    </td>
                    <td className="col border-end border-bottom">
                        {new Intl.DateTimeFormat("en-GB",{
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: false,
                        }).format(new Date(Number(item.birthday)-25200000))}<br/>
                    </td>
                    <td className="col border-end border-bottom">
                        {new Intl.DateTimeFormat("en-GB",{
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: false,
                        }).format(new Date(Number(item['meeting-date'])+25200000))}<br/>
                        {item['meeting-method']}
                    </td>
                    <td className="col border-end border-bottom">
                        {item.phone}<br/>
                        {item.email}
                    </td>
                    <td className="col">
                        <Button
                            variant="danger"
                            onClick={()=>deleteAppointment(item.uid)}
                        >
                            Delete
                        </Button>
                    </td>
                </tr>
                )}
            </table>
            }
        </div>
    )
}