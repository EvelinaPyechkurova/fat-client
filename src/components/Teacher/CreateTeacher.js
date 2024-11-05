import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import ErrorMessage from "../ErrorMessage";
import Form from "../Form";

const CreateTeacher = () => {

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        phone: "",
        email: ""
    });
   
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const fields = [
        {type: "text", name: "name", label: "Teacher name", value: formData.name, onChange: (e) => handleChange(e)},
        {type: "text", name: "surname", label: "Teacher surname", value: formData.surname, onChange: (e) => handleChange(e)},
        {type: "text", name: "phone", label: "Teacher phone", value: formData.phone, onChange: (e) => handleChange(e)},
        {type: "text", name: "email", label: "Teacher email", value: formData.email, onChange: (e) => handleChange(e)}
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
            const res = await fetch('http://localhost:3000/teachers', {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(formData),
            });
    
            if (!res.ok) {
                const errorData = await res.json();
                throw errorData.error;
            }
    
            console.log('New teacher added');
            navigate("/teachers");
        } catch (e) {
            setErrorMessage(e);
        } finally {
            setIsLoading(false);
        }
    };

    return(  
        <div className="form-container">
            <h2>Add a New Teacher</h2>
            {errorMessage && <ErrorMessage error={errorMessage} />}
            <Form fields={fields} handleSubmit={handleSubmit} isLoading={isLoading}/>
        </div>
    );
}
 
export default CreateTeacher;