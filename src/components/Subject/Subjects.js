import SubjectList from './SubjectList';
import useFetchData from '../../hooks/useFetchData';
import { useNavigate } from 'react-router-dom';

const Subjects = () => {
    const {data:subjects, isLoading, error} = useFetchData('http://localhost:3000/subjects');
    const navigate = useNavigate();

    const handleCreateSubject = () => {
        navigate("/subjects/create");
    }
    
    return(
        <div className="subjects">
            <button className='create-button' onClick={handleCreateSubject}>add new subject</button>
            {error && <div>{error}</div>}
            {isLoading && <div>Loading...</div>}
            {subjects && <SubjectList subjects={subjects}/>}
        </div>
    );
}
 
export default Subjects;