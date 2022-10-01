import { useSearchhook } from "../hooks/Searchhook"
import { UserProfile } from "../pages/UserProfile"
import { Link } from "react-router-dom";


export function SearchBar() {

    const {searchResult, values, handleChange, handleSearch, showuser, searchStatus, dataToPass} = useSearchhook()

    return <>
    <div id="searchbox-div">

        <div className="searchbar-div">
            <form onSubmit={handleSearch}>
                <button className="btn-search" type='submit'>🔍</button>
                <input required type="text" className="input-search" placeholder="Find people.." name="search" value={values.search} onChange={handleChange} />
            </form>
        </div>
        
        <div>
            <div id="search-status-div">
                {searchStatus}
            </div>
            
            <div id="search-list-div" >
                
                {searchResult.map((element, index) => (
                    <p key={index}><Link to={`/user/${element}`}>{element}</Link></p>
                ))}
                
            </div>

        </div>
    </div>
    </>
}