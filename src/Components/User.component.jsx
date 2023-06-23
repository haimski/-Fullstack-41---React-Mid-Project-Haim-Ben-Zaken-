import { useState } from "react";

const UserComponent = ({
    user
}) => {
    const [isOtherData, setIsOtherData] = useState(false);

    return (
        <div className="user">
            <div className="row">
                <label htmlFor="">ID:</label>
                <span className="frm-row input">
                    {user.id}
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
                        <input type="text" defaultValue={user.email} />
                    </span>
                </div>
                <div className="row">
                    <label htmlFor="">City:</label>
                    <span className="frm-row input">
                        <input type="text" defaultValue={user.email} />
                    </span>
                </div>
                <div className="row">
                    <label htmlFor="">Zip Code:</label>
                    <span className="frm-row input">
                        <input type="text" defaultValue={user.email} />
                    </span>
                </div>
            </div> : null}
            <div className="row buttons-row">
                <div>
                    <span>
                        <button onClick={() => setIsOtherData(!isOtherData)}>Other Data</button>
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