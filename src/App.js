import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Teachers from './components/Teacher/Teachers';
import TeacherDetails from './components/Teacher/TeacherDetails';
import CreateTeacher from './components/Teacher/CreateTeacher';
import Subjects from './components/Subject/Subjects';
import SubjectDetails from './components/Subject/SubjectDetails';
import CreateSubject from './components/Subject/CreateSubject';
import Lectures from './components/Lecture/Lectures';
import LectureDetails from './components/Lecture/LectureDetails';
import CreateLecture from './components/Lecture/CreateLecture';

function App() {
    return(
        <Router>
        <div className="App">
            <Navbar />
            <div className="content">
                <Routes>
                    <Route path="/teachers" element={<Teachers />} />
                    <Route path="/teachers/:id" element={<TeacherDetails/>}/>
                    <Route path="/teachers/create" element={<CreateTeacher/>}/>
                    <Route path="/subjects" element={<Subjects/>}/>
                    <Route path="/subjects/:id" element={<SubjectDetails/>}/>
                    <Route path="/subjects/create" element={<CreateSubject/>}/>
                    <Route path="/lectures" element={<Lectures/>}/>
                    <Route path="/lectures/:id" element={<LectureDetails/>}/>
                    <Route path="/lectures/create" element={<CreateLecture/>}/>
                    {/* <Route path="*" element={<NotFound/>}/> */}
                </Routes>
            </div>
        </div>
    </Router>
    );
}

export default App;
