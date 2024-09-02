import { createContext, useState } from "react";

interface NotificationContextType {
    data: any,
    setData: any,
}

const initialData = { show: false, message: "", isSuccess: false };

const NotificationContext = createContext<NotificationContextType>({ data: initialData, setData: () => { } });

const NotificationProvider: React.FC<{ children: any }> = ({ children }) => {

    const [data, setData] = useState(initialData);

    const context = { data, setData };

    return (
        <NotificationContext.Provider value={context}>
            {children}
        </NotificationContext.Provider>
    );
}

export { NotificationContext, NotificationProvider }