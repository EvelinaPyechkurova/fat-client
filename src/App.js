import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Teachers from './components/Teacher/Teachers';
import TeacherDetails from './components/Teacher/TeacherDetails';
import CreateTeacher from './components/Teacher/CreateTeacher';

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
                    {/* <Route path="/subjects" element={<SubjectList/>}/>
                    <Route path="/lectures" element={<LectureList/>}/> */}
                    {/* <Route path="*" element={<NotFound/>}/> */}
                </Routes>
            </div>
        </div>
    </Router>
    );
}

export default App;
