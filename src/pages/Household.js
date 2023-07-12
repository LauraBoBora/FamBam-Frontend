// import { useEffect, useState } from "react";

// const Household = () => {
//     // set up states
//     const [myHousehold, setMyHousehold] = useState(null);
//     // backend url
//     const householdURL = `http://localhost:4000/household`;
//     // fetch user data

//     // fetch household data
//     const fetchHouseholdData = async() => {
//         try {
//             let responseData = await fetch(householdURL);
//             let householdData = await responseData.json();
//             setMyHousehold(householdData);
//         } catch (error) {
//             console.log('Error fetching board data: ', error)
//         }
//     };

//     useEffect(() => {
//         fetchHouseholdData();
//     }, [])

//     return (
//         <div>
//         {/* existing household */}
//         {householdId ? <Button boards={boards} handleRemoveBoard={handleRemoveBoard} /> : <Button>New Household</Button>}
     
//     </div>
//     )
// }

// export default Household;