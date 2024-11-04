import {Link} from 'react-router-dom';

const TeacherList = ({teachers}) => {
    return ( 
        <div className="teacher-list">
            {teachers.map((teacher) => (
                <div className="preview" key={teacher._id}>
                    <Link to={`/teachers/${teacher._id}`}>
                        <h2>{teacher.surname} {teacher.name}</h2>
                    </Link>
                </div>
            ))}
        </div>
    );
}
 
export default TeacherList;