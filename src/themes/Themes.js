import { DefaultTheme, DarkTheme } from 'react-native-paper'

export const Light = {
    ...DefaultTheme,
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        primary: "#3F51B5",
        accent: "#757DE8",
        background: "#E1E1E1",
        surface: "#F3F3F3",
        text: "#232323"
    }
}

export const Dark = {
    ...DarkTheme,
    dark: true,
    colors: {
        ...DarkTheme.colors,
        primary: "#1769AA",
        accent: "#002984",
        background: "#3C4557",
        surface: "#232323",
        text: "#F3F3F3"
    }
}