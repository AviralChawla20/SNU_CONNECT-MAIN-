// components/Chat.tsx

import SendbirdApp from '@sendbird/uikit-react/App';
import React from 'react';
const email = localStorage.getItem("email");
const APP_ID = "43F443C3-8B99-437A-9B02-57BE973CFFA9";
const USER_ID = email;

const Chat: React.FC = () => {
    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <SendbirdApp appId={APP_ID} userId={USER_ID} />
        </div>
    );
};

export default Chat;
