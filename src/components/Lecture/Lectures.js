import LectureList from './LectureList';
import useFetchData from '../../hooks/useFetchData';
import { useNavigate } from 'react-router-dom';

const Lectures = () => {

    const {data:lectures, isLoading, error} = useFetchData('http://localhost:3000/lectures');
    const navigate = useNavigate;

    const handleCreateLecture = () => {
        navigate('lectures/create');
    }

    return ( 
        <div className="lectures">
            <button className='create-button' onClick={handleCreateLecture}>add new lecture</button>
            {error && <div>{error}</div>}
            {isLoading && <div>Loading...</div>}
            {lectures && <LectureList lectures={lectures}/>}
        </div>
    );
}
 
export default Lectures;