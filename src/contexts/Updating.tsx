import { createContext, useState } from "react";

interface UpdatingContextType {
    data: any,
    setData: any
}

const initialData = {showModal: false, action: "", row: {id: 0, date: "", magasin: "", produit: "", stock: 0}}

const UpdatingContext = createContext<UpdatingContextType>({data: initialData, setData: () => {} });

const UpdatingProvider: React.FC<{ children: any }> = ({ children }) => {

    const [data, setData] = useState(initialData);

    const context = { data, setData };

    return (
        <UpdatingContext.Provider value={context}>
            {children}
        </UpdatingContext.Provider>
    );
}

export { UpdatingContext, UpdatingProvider }