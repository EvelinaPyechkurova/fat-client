import TeacherList from './TeacherList';
import useFetchData from '../../hooks/useFetchData';
import { useNavigate } from 'react-router-dom';

const Teachers = () => {
    
    const {data:teachers, isLoading, error} = useFetchData('http://localhost:3000/teachers');
    const navigate = useNavigate();

    const handleCreateTeacher = () => {
        navigate("/teachers/create");
    }
    
    return(
        <div className="teachers">
            <button className='create-button' onClick={handleCreateTeacher}>add new teacher</button>
            {error && <div>{error}</div>}
            {isLoading && <div>Loading...</div>}
            {teachers && <TeacherList teachers={teachers}/>}
        </div>
    );
}
 
export default Teachers;