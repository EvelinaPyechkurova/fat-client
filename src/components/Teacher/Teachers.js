import { useEffect, useState } from 'react';
import TeacherList from './TeacherList';
import useFetchData from '../../hooks/useFetchData';
import { useNavigate } from 'react-router-dom';
import FilterSidebar from '../FilterSidebar';

const Teachers = () => {
    const navigate = useNavigate();

    const [filterQuery, setFilterQuery] = useState("");
    const [url, setUrl] = useState("http://localhost:3000/teachers");

    const {data:teachers, isLoading, error} = useFetchData(url);

    const handleCreateTeacher = () => {
        navigate("/teachers/create");
    }

    const {data:subjects} = useFetchData('http://localhost:3000/subjects');
    const subjectOptions = subjects ? subjects.map(subject => ({
        value: subject._id,
        label: subject.name
    })) : [];

    const fields = [
        {name: "name", label: "teachers name"},
        {name: "surname", label: "teachers surname"},
        {name: "subject", label: "Teacher reading subject", options: subjectOptions}
    ]

    const handleSearch = (query) => {
        setFilterQuery(query);
    }

    useEffect(() => {
        const newUrl = `http://localhost:3000/teachers${filterQuery ? `?${filterQuery}` : ''}`;
        setUrl(newUrl);
    }, [filterQuery])
    
    return(
        <div className="teachers">
            <FilterSidebar fields={fields} onSearch={handleSearch}/>
            <button className='create-button' onClick={handleCreateTeacher}>add new teacher</button>
            {error && <div>{error}</div>}
            {isLoading && <div>Loading...</div>}
            {teachers && <TeacherList teachers={teachers}/>}
        </div>
    );
}
 
export default Teachers;