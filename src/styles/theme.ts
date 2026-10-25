export type AppTheme = {
    colors: {

        primary: string;
        danger: string;
        warning: string;
        muted: string;
        background: string;
        surface: string;
        border: string;
        textSecondary: string;
        text: string;
    };
    spacing: {
        small: number;
        medium: number;
        large: number;

    };


};

export const theme: AppTheme = {

    colors: {
        primary: "#2ecc71",
        danger: "#e74c3c",
        warning: "#f39c12",
        muted: "#95a5a6",
        background: "#f9f9f9",
        surface: "#fff",
        border: "#ddd",
        textSecondary: "#555",
        text: "#111",
    },
    spacing: {
        small: 8,
        medium: 15,
        large: 24,
    },
}