import LectureList from './LectureList';
import useFetchData from '../../hooks/useFetchData';
import { useNavigate } from 'react-router-dom';
import FilterSidebar from '../FilterSidebar';
import { useEffect, useState } from 'react';
import { LECTURE_TYPE_VALUES } from '../../utils/constants';

const Lectures = () => {
    const navigate = useNavigate;

    const [filterQuery, setFilterQuery] = useState("");
    const [url, setUrl] = useState("http://localhost:3000/lectures");

    const {data:lectures, isLoading, error} = useFetchData(url);    

    const handleCreateLecture = () => {
        navigate('lectures/create');
    }

    const {data:subjects} = useFetchData("http://localhost:3000/subjects");
    const subjectOptions = subjects ? subjects.map(subject => ({
        value: subject._id,
        label: subject.name
    })) : [];

    const {data:teachers} = useFetchData("http://localhost:3000/teachers");
    const teacherOptions = teachers ? teachers.map(teacher => ({
        value: teacher._id,
        label: `${teacher.surname} ${teacher.name}`
    })) : [];

    const fields = [
        {name: "subject", label: "Subject of the Lecture", options: subjectOptions},
        {name: "teacher", label: "Lecturer", options: teacherOptions},
        {name: "type", label: "Lecture Type",  options: LECTURE_TYPE_VALUES},
        {type: "date", name: "date", label: "Lecture Date"}
    ];

    const handleSearch = (query) => {
        setFilterQuery(query);
    }

    useEffect(() => {
        const newUrl = `http://localhost:3000/lectures${filterQuery ? `?${filterQuery}` : ""}`;
        setUrl(newUrl);
    }, [filterQuery]);

    return ( 
        <div className="lectures">
            <FilterSidebar fields={fields} onSearch={handleSearch}/>
            <button className='create-button' onClick={handleCreateLecture}>add new lecture</button>
            {error && <div>{error}</div>}
            {isLoading && <div>Loading...</div>}
            {lectures && <LectureList lectures={lectures}/>}
        </div>
    );
}
 
export default Lectures;