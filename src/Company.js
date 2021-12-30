import React from "react";
import logoImg from './logo.svg';


function Company({currentCompany}){
    
    return (
        <div>Company {currentCompany.name}</div>
    )
}
export default Company;