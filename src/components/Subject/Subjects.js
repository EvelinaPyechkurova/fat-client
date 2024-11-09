import SubjectList from './SubjectList';
import useFetchData from '../../hooks/useFetchData';
import { useNavigate } from 'react-router-dom';
import FilterSidebar from '../FilterSidebar';
import { useEffect, useState } from 'react';
import {YERS_VALUES, TRIMESTER_TYPE_VALUES} from '../../utils/constants';

const Subjects = () => {
    const navigate = useNavigate();

    const [filterQuery, setFilterQuery] = useState("");
    const [url, setUrl] = useState('http://localhost:3000/subjects');
    
    const {data:subjects, isLoading, error} = useFetchData(url);

    const handleCreateSubject = () => {
        navigate("/subjects/create");
    }

    const {data:teachers} = useFetchData('http://localhost:3000/teachers');
    const teacherOptions = teachers ? teachers.map(teacher => ({
        value: teacher._id,
        label: `${teacher.surname} ${teacher.name}`
    })) : [];

    const fields = [
        {type: "text", name: "name", label: "subjects name"},
        {name: "year", label: "subjects year", options: YERS_VALUES},
        {name: "trimester", label: "trimester year", options: TRIMESTER_TYPE_VALUES},
        {name: "teacher", label: "subjects read by teacher", options: teacherOptions}
    ];

    const handleSearch = (query) => {
        setFilterQuery(query);
    }

    useEffect(() => {
        const newUrl = `http://localhost:3000/subjects${filterQuery ? `?${filterQuery}` : ''}`;
        setUrl(newUrl);
    }, [filterQuery]);
    
    return(
        <div className="subjects">
            <FilterSidebar fields={fields} onSearch={handleSearch}/>
            <button className='create-button' onClick={handleCreateSubject}>add new subject</button>
            {error && <div>{error}</div>}
            {isLoading && <div>Loading...</div>}
            {subjects && <SubjectList subjects={subjects}/>}
        </div>
    );
}
 
export default Subjects;