import {useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchData from '../../hooks/useFetchData';
import {Link} from 'react-router-dom';
import ErrorMessage from "../ErrorMessage";
import Form from "../Form";

const TeacherDetails = () => {
    const {id} = useParams();
    const {data:teacher, isLoading, error} = useFetchData(`http://localhost:3000/teachers/${id}`);
    const {data:subjects} = useFetchData(`http://localhost:3000/subjects?teacher=${id}`);
    if(error)
        console.log(error);

    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);

    const [updatedTeacher, setUpdatedTeacher] = useState({
        name: "",
        surname: "",
        phone: "",
        email: ""
    });

    const [errorMessage, setErrorMessage] = useState(null);

    const fields = [
        {type: "text", name: "name", label: "Teacher name", value: updatedTeacher.name, onChange: (e) => handleInputChange(e)},
        {type: "text", name: "surname", label: "Teacher surname", value: updatedTeacher.surname, onChange: (e) => handleInputChange(e)},
        {type: "text", name: "phone", label: "Teacher phone", value: updatedTeacher.phone, onChange: (e) => handleInputChange(e)},
        {type: "text", name: "email", label: "Teacher email", value: updatedTeacher.email, onChange: (e) => handleInputChange(e)}
    ];

    const handleDelete = () => {
        fetch(`http://localhost:3000/teachers/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            navigate("/teachers")
        })
        .catch((e) => console.log(e.message));
    }

    const handleUpdateClick = () => {
        setIsEditing(true);
        setUpdatedTeacher({
            name: teacher.name, 
            surname: teacher.surname, 
            phone: teacher.phone, 
            email: teacher.email
        });
    };

    const handleInputChange = (e) => {
        setUpdatedTeacher({ ...updatedTeacher, [e.target.name]: e.target.value });
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const res = await fetch(`http://localhost:3000/teachers/${id}`, {
                method: 'PATCH',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(updatedTeacher),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw errorData.error;
            }
    
            console.log(`Teacher with id ${id} edited`);
            setIsEditing(false);
            navigate(`/teachers/${id}`);
            window.location.reload();
        } catch (e) {
            setErrorMessage(e);
        }
    }

    return ( 
        <div>
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {teacher && (
                <div>
                    {isEditing ?
                    (
                        <div className="form-container">
                            <h2>Edit existing teacher</h2>
                            {errorMessage && <ErrorMessage error={errorMessage} />}
                            <Form fields={fields} onChange={handleInputChange} isLoading={isLoading}></Form>
                        </div>  
                    ) : 
                    (
                        <div className="details">
                        <h2>{teacher.surname} {teacher.name}</h2>
                        <p>Phone number: {teacher.phone}</p> 
                        <p>Email address: {teacher.email}</p>
                        {subjects && subjects.length > 0 ? (
                            <div>
                                <p>Subject read by this teacher:</p>
                                <ul className="field-list">
                                    {subjects.map((subject) => (
                                        <li className="field-item" key={subject._id}>
                                            <Link to={`/subjects/${subject._id}`}>{subject.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>) : 
                            <div><p>Currently does not teaches any subjects</p></div>}
                            <button className="update-button" onClick={handleUpdateClick}>update</button>
                            <button className="delete-button" onClick={handleDelete}>delete</button>  
                        </div>
                    )} 
                </div>
            )}
        </div>
    );
}
 
export default TeacherDetails;