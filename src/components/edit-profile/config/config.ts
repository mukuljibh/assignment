interface formValuesProps {
    name: string;
    email: string;

}

export interface inputBoxProps {
    id: keyof formValuesProps;
    title: string;
}

