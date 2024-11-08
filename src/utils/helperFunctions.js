const getSubjectDetails = async (id) => {
    try{
        const url = `http://localhost:3000/subjects/${id}`
        const res = await fetch(url);

        if(!res.ok)
            throw Error(`Could not fetch the data for ${url}`);

        const subject = await res.json();
        return {name: subject.name};
    }catch(e){
        console.log(e);
        return {name: null}
    }
}

const getTeacherDetails = async (id) => {
    try{
        const url = `http://localhost:3000/teachers/${id}`
        const res = await fetch(url);

        if(!res.ok)
            throw Error(`Could not fetch the data for ${url}`);

        const teacher = await res.json();
        return {name: teacher.name, surname: teacher.surname};
    }catch(e){
        console.log(e);
        return {name: null, surname: null};
    }
}

export {
    getSubjectDetails,
    getTeacherDetails
}