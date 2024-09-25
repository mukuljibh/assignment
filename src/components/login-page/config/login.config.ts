interface formValuesProps {
    name: string;
    email: string;
    password: string;
}

export interface inputBoxProps {
    id: keyof formValuesProps;
    title: string;
}

