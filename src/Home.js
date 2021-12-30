import React from "react";
import { 
    Routes, 
    Route, 
    useNavigate 
    } from 'react-router-dom';
import { useState } from "react/cjs/react.development";
import Company from "./Company";
    

function Home() {
    let navigate = useNavigate ();
    const [currentCompany, setCompany] = useState();
    const companies = [
        {
            id:1,
            name:'Test',
            owner:'Ivan'
        },
        {
            id:2,
            name:'Test 2',
            owner:'Petr'
        },
        {
            id:3,
            name:'Test 3',
            owner:'Yan'
        },

    ]
    const goToCompany = (index) =>{
            setCompany(companies[index]);
            navigate(`${companies[index].id}`)
    }

    return(
        <div>

        <div>Home</div>
        { 
            companies.map((value,index)=><div key={`company-${index}`} onClick={() => goToCompany(index)}>
                <p>{value.name}</p>
                {/* <span>{value.owner}</span> */}
            </div>)
        }
        {currentCompany?
        <Routes>
            <Route path=':id' element= {<Company currentCompany={currentCompany} />}/>
        </Routes>
        : ""}
        </div>
    );
}
export default Home;