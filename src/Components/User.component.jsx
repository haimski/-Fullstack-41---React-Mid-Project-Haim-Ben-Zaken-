import { useEffect, useState, useRef } from "react";
import { updateUser, deleteUser } from "../Utils/UsersApi";
import { userServiceUrl } from "../Utils/Consts";

const UserComponent = ({
    user,
    getTodoDataByUserId,
    getPostsDataByUserId,
    selectedUserId,
    setSelectedUserId,
    setCurrentUser,
    currentUser,
    setShowRightPanel,
    isUserTasksUncompleted,
    removeUser,
    userTodos
}) => {
    const [isOtherData, setIsOtherData] = useState(false);
    const [userName, setUserName] = useState(user.name);
    const [userEmail, setUserEmail] = useState(user.email);
    const [userStreet, setUserStreet] = useState(user.address && user.address.street || '');
    const [userCity, setUserCity] = useState(user.address && user.address.city || '');
    const [userZipCode, setUserZipCode] = useState(user.address && user.address.zipcode || '');

    const toggleUserDetails = (event) => {
        if (!currentUser || (currentUser.id != event.target.innerText)) {
            setShowRightPanel(true);
        } else {
            setShowRightPanel(false);
            setCurrentUser(null);
        }
    }

    const getUserData = (event) => {
        setSelectedUserId(user.id);
        getTodoDataByUserId(user.id);
        getPostsDataByUserId(user.id);
        setCurrentUser(user);
        toggleUserDetails(event);
    }

    const updateUserDetails = async () => {
        const userUpdateData = {
            name: userName,
            email: userEmail,
            address: {
                street: userStreet,
                city: userCity,
                zipcode: userZipCode
            }
        }

        const {data} = await updateUser(userServiceUrl, user.id, userUpdateData);
    }

    const deleteCurrentUser = async (e) => {
        const { data } = await deleteUser(userServiceUrl, user.id);
        removeUser(user.id);
    }

    const componentStyle= {
        'backgroundColor': selectedUserId === user.id ? 'aliceblue' : '', 
        'borderColor': isUserTasksUncompleted ? 'red' : ''}

    return (
        <div className="user" style={componentStyle}>
            <div className="row"> 
                <span className="user-id-btn">
                    <label htmlFor="">ID:</label>
                    <span className="frm-row input" onClick={(e) => getUserData(e)}>
                        {user.id}
                    </span>
                </span>
            </div>
            <div className="row">
                <label htmlFor="">Name:</label>
                <span className="frm-row input">
                    <input type="text"defaultValue={userName} onInput={(e) => setUserName(e.target.value)} />
                </span>
            </div>
            <div className="row">
                <label htmlFor="">Email:</label>
                <span className="frm-row input">
                    <input type="text" defaultValue={userEmail} onInput={(e) => setUserEmail(e.target.value)} />
                </span>
            </div>
            <div className="row">
                <div>
                    <span>
                        <button onMouseOver={() => setIsOtherData(true)}>
                            Other Data
                        </button>
                    </span>
                </div>
            </div>
            {isOtherData ? <div className="row other-data">
                <div className="row">
                    <label htmlFor="">Street:</label>
                    <span className="frm-row input">
                        <input type="text" defaultValue={userStreet} onInput={(e) => setUserStreet(e.target.value)} />
                    </span>
                </div>
                <div className="row">
                    <label htmlFor="">City:</label>
                    <span className="frm-row input">
                        <input type="text" defaultValue={userCity} onInput={(e) => setUserCity(e.target.value)} />
                    </span>
                </div>
                <div className="row">
                    <label htmlFor="">Zip Code:</label>
                    <span className="frm-row input">
                        <input type="text" defaultValue={userZipCode} onInput={(e) => setUserZipCode(e.target.value)} />
                    </span>
                </div>
            </div> : null}
            <div className="row buttons-row">
                <div>
                </div>
                <div>
                    <span>
                        <button onClick={updateUserDetails}>Update</button>
                        <button onClick={(e) => deleteCurrentUser(e)}>Delete</button>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default UserComponent;