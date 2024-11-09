import {useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetchData from '../../hooks/useFetchData';
import {Link} from 'react-router-dom';
import ErrorMessage from "../ErrorMessage";
import Form from "../Form";
import {LECTURE_TYPE_VALUES} from "../../utils/constants";

const LectureDetails = () => {
    const {id} = useParams();
    const {data:lecture, isLoading, error} = useFetchData(`http://localhost:3000/lectures/${id}`);
    const {data:subject} = useFetchData(lecture ? `http://localhost:3000/subjects/${lecture.subject}` : null);
    const {data:teacher} = useFetchData(lecture ? `http://localhost:3000/teachers/${lecture.teacher}` : null);
    const {data:subjects} = useFetchData(`http://localhost:3000/subjects`);
    const {data:teachers} = useFetchData(`http://localhost:3000/teachers`);
    if(error)
        console.log(error);

    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);

    const [updatedLecture, setUpdatedLecture] = useState({
        subject: "",
        teacher: "",
        type: "",
        date: ""
    });

    const [errorMessage, setErrorMessage] = useState(null);

    const subjectOptions = subjects ? subjects.map(subject => ({
        value: subject._id,
        label: subject.name
    })) : [];

    const teacherOptions = teachers ? teachers.map(teacher => ({
        value: teacher._id,
        label: `${teacher.surname} ${teacher.name}`
    })) : [];

    const fields = [
        {name: "subject", label: "Subject of the Lecture", value: updatedLecture.subject, 
            onChange: (e) => handleInputChange(e), options: subjectOptions},
        {name: "teacher", label: "Lecturer", value: updatedLecture.teacher,
             onChange: (e) => handleInputChange(e), options: teacherOptions},
        {type: "text", name: "type", label: "Lecture Type", value: updatedLecture.type,
             onChange: (e) => handleInputChange(e), options: LECTURE_TYPE_VALUES},
        {type: "date", name: "date", label: "Lecture Date", value: updatedLecture.date,
            onChange: (e) => handleInputChange(e)}
    ];

    const handleDelete = async () => {
        try{
            const res = await fetch(`http://localhost:3000/lectures/${id}`, {
                method: 'DELETE'
            })

            if (!res.ok) {
                const errorData = await res.json();
                throw {error: errorData.error};
            }

            navigate("/lectures")

        }catch(e){
            setErrorMessage(e);
        }
    }

    const handleUpdateClick = () => {
        setIsEditing(true);
        setUpdatedLecture({
            subject: lecture.subject, 
            teacher: lecture.teacher, 
            type: lecture.type,
            date: lecture.date
        });
    };

    const handleInputChange = (e) => {
        setUpdatedLecture({...updatedLecture, [e.target.name]: e.target.value});
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const res = await fetch(`http://localhost:3000/lectures/${id}`, {
                method: 'PATCH',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(updatedLecture),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw errorData.error;
            }
    
            console.log(`Lecture with id ${id} edited`);
            setIsEditing(false);
            navigate(`/lectures/${id}`);
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
            {lecture && subject && teacher && (
                <div>
                    {isEditing ?
                    (
                        <div className="form-container">
                            <h2>Edit existing lecture</h2>
                            <Form fields={fields} handleSubmit={handleUpdateSubmit} isLoading={isLoading}></Form>
                        </div>  
                    ) : 
                    (
                        <div className="details">
                            <h2>Lecture</h2>
                            <p>Subject of the lecture: <Link to={`/subjects/${subject._id}`}>{subject.name}</Link></p>
                            <p>Lecturer: <Link to={`/teachers/${teacher._id}`}>{teacher.surname} {teacher.name}</Link></p> 
                            <p>Lecture type: {lecture.type}</p>
                            <p>Lecture date: {lecture.date}</p>
                            <div className="buttons">
                                <button className="update-button" onClick={handleUpdateClick}>update</button>
                                <button className="delete-button" onClick={handleDelete}>delete</button>  
                            </div>             
                        </div>
                    )} 
                </div>
            )}
        </div>
    );
}
 
export default LectureDetails;