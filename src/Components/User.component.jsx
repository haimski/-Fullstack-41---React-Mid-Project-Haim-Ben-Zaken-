import { useState } from "react";

const UserComponent = ({
    user
}) => {
    const [isOtherData, setIsOtherData] = useState(false);
    const [isUserSelected, setIsUserSelected] = useState(false);

    const getUserData = () => {
        setIsUserSelected(!isUserSelected);
    }

    return (
        <div className="user" style={{'backgroundColor': isUserSelected ? 'aliceblue' : ''}}>
            <div className="row">
                <span className="user-id-btn" onClick={getUserData}>
                    <label htmlFor="">ID:</label>
                    <span className="frm-row input">
                        {user.id}
                    </span>
                </span>
            </div>
            <div className="row">
                <label htmlFor="">Name:</label>
                <span className="frm-row input">
                    <input type="text" defaultValue={user.name} />
                </span>
            </div>
            <div className="row">
                <label htmlFor="">Email:</label>
                <span className="frm-row input">
                    <input type="text" defaultValue={user.email} />
                </span>
            </div>
            {isOtherData ? <div className="row other-data">
                <div className="row">
                    <label htmlFor="">Street:</label>
                    <span className="frm-row input">
                        <input type="text" defaultValue={user.address.street} />
                    </span>
                </div>
                <div className="row">
                    <label htmlFor="">City:</label>
                    <span className="frm-row input">
                        <input type="text" defaultValue={user.address.city} />
                    </span>
                </div>
                <div className="row">
                    <label htmlFor="">Zip Code:</label>
                    <span className="frm-row input">
                        <input type="text" defaultValue={user.address.zipcode} />
                    </span>
                </div>
            </div> : null}
            <div className="row buttons-row">
                <div>
                    <span>
                        <button onClick={() => setIsOtherData(!isOtherData)}>
                            {!isOtherData ? 'Other Data' : 'Close'}
                        </button>
                    </span>
                </div>
                <div>
                    <span>
                        <button>Update</button>
                        <button>Delete</button>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default UserComponent;