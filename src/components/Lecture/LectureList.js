import {Link} from 'react-router-dom';
import {getSubjectDetails} from '../../utils/helperFunctions';
import { useState, useEffect } from 'react';

const LectureList = ({lectures}) => {
    const [lectureSubjects, setLectureSubjects] = useState({});

    useEffect(() => {
        const fetchSubjectDetails = async () => {
            const subjects = {};

            for(const lecture of lectures){
                const subject = await getSubjectDetails(lecture.subject);
                subjects[lecture._id] = subject.name;
            }
            setLectureSubjects(subjects)
        }

        fetchSubjectDetails();
    }, [lectures]);

    return ( 
        <div className="item-list">
            {lectures.map((lecture) => (
                <div className="preview" key={lecture._id}>
                    <Link to={`/lectures/${lecture._id}`}>
                        Lecture on{' '}
                            <Link to={`/subjects/${lecture.subject}`}>
                                {lectureSubjects[lecture._id] || 'Loading...'}
                            </Link>{' '}
                        scheduled for {lecture.date}
                    </Link>
                    
                </div>
            ))}
        </div>
    );
}
 
export default LectureList;