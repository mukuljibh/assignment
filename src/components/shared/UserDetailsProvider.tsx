import { createContext, ReactNode, useContext, useState } from "react";

export type userProps = {
    name: string;
    imageUrl: string;
    email: string
};
type props = {
    user: userProps
    setUser: (user: userProps) => void;
}

const UserContext = createContext<props | undefined>(undefined);


export default function UserDetailsProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<userProps>({ name: '', imageUrl: '', email: "" });


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
// eslint-disable-next-line react-refresh/only-export-components
export const useUserDetails = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("component not accessable here");
    }
    return context;
};