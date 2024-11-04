import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import ErrorMessage from "../ErrorMessage";

const CreateTeacher = () => {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const teacher = {name, surname, phone, email};
    
        setIsLoading(true);
    
        try {
            const res = await fetch('http://localhost:3000/teachers', {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(teacher),
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

            <form onSubmit={handleSubmit}>
                <label>Teacher name:</label>
                <input
                 type="text"
                 required
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                />
                <label>Teacher surname:</label>
                <input
                 type="text"
                 required
                 value={surname}
                 onChange={(e) => setSurname(e.target.value)}
                />
                <label>Teacher phone number:</label>
                <input
                 type="text"
                 required
                 value={phone}
                 onChange={(e) => setPhone(e.target.value)}
                />
                <label>Teacher email address:</label>
                <input
                 type="text"
                 required
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                />
                {!isLoading && <button>Add teacher</button>}
                {isLoading && <button disabled>Adding teacher...</button>}
            </form>
        </div>
    );
}
 
export default CreateTeacher;