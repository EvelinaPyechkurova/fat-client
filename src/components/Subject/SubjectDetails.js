import {useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchData from '../../hooks/useFetchData';
import {Link} from 'react-router-dom';
import ErrorMessage from "../ErrorMessage";
import Form from "../Form";
import {TRIMESTER_TYPE_VALUES, YERS_VALUES} from "../../utils/constants"

const SubjectDetails = () => {
    const {id} = useParams();
    const {data:subject, isLoading, error} = useFetchData(`http://localhost:3000/subjects/${id}`);
    const {data:teachers} = useFetchData(`http://localhost:3000/teachers?subject=${id}`);
    if(error)
        console.log(error);

    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);

    const [updatedSubject, setUpdatedSubject] = useState({
        name: "",
        year: "",
        trimester: ""
    });

    const [errorMessage, setErrorMessage] = useState(null);

    const fields = [
        {type: "text", name: "name", label: "Subject name", value: updatedSubject.name, 
            onChange: (e) => handleInputChange(e)},
        {type: "number", name: "year", label: "Subject year", value: updatedSubject.year,
             onChange: (e) => handleInputChange(e), options: YERS_VALUES},
        {type: "text", name: "trimester", label: "Subject trimester", value: updatedSubject.trimester,
             onChange: (e) => handleInputChange(e), options: TRIMESTER_TYPE_VALUES}
    ];

    const handleDelete = async () => {
        try{
            const res = await fetch(`http://localhost:3000/subjects/${id}`, {
                method: 'DELETE'
            })

            if (!res.ok) {
                const errorData = await res.json();
                throw {error: errorData.error};
            }

            navigate("/subjects")

        }catch(e){
            setErrorMessage(e);
        }
    }

    const handleUpdateClick = () => {
        setIsEditing(true);
        setUpdatedSubject({
            name: subject.name, 
            year: subject.year, 
            trimester: subject.trimester
        });
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUpdatedSubject(prevState => ({
            ...prevState,
            [name]: name === "year" ? Number(value) : value
        }))
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const res = await fetch(`http://localhost:3000/subjects/${id}`, {
                method: 'PATCH',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(updatedSubject),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw errorData.error;
            }
    
            console.log(`Subject with id ${id} edited`);
            setIsEditing(false);
            navigate(`/subjects/${id}`);
            window.location.reload();
        } catch (e) {
            setErrorMessage(e);
        }
    }

    return ( 
        <div>
            {isLoading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {errorMessage && <ErrorMessage error={errorMessage} />}
            {subject && (
                <div>
                    {isEditing ?
                    (
                        <div className="form-container">
                            <h2>Edit existing subject</h2>
                            <Form fields={fields} handleSubmit={handleUpdateSubmit} isLoading={isLoading}></Form>
                        </div>  
                    ) : 
                    (
                        <div className="details">
                        <h2>{subject.name} </h2>
                        <p>Year: {subject.year}</p> 
                        <p>Trimester: {subject.trimester}</p>
                        {teachers && teachers.length > 0 ? (
                            <div>
                                <p>Teachers reading this subject:</p>
                                <ul className="field-list">
                                    {teachers.map((teacher) => (
                                        <li className="field-item" key={teacher._id}>
                                            <Link to={`/teachers/${teacher._id}`}>{teacher.surname} {teacher.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>) : 
                            <div><p>Currently does not read by any teachers</p></div>}
                            <button className="update-button" onClick={handleUpdateClick}>update</button>
                            <button className="delete-button" onClick={handleDelete}>delete</button>  
                        </div>
                    )} 
                </div>
            )}
        </div>
    );
}
 
export default SubjectDetails;