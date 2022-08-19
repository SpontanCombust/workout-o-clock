import { createContext, useContext, useState } from "react";

export interface ColorPickerContextProps {
    color: string;
    setColor: (color: string) => void;
}

const initialState: ColorPickerContextProps = {
    color: 'white',
    setColor: () => {},
} 

export const ColorPickerContext = createContext<ColorPickerContextProps>(initialState);

export function useColorPickerContext() {
    return useContext(ColorPickerContext);
}

export function ColorPickerContextProvider(props: {children: React.ReactNode}) {
    const [state, setState] = useState(initialState);

    const value: ColorPickerContextProps = {
        ...state,
        setColor: (color: string) => {
            setState({
                ...state,
                color: color,
            });
        },
    };

    return <ColorPickerContext.Provider value={value}>{props.children}</ColorPickerContext.Provider>;
}