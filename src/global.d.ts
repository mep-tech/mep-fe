import "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
	interface PaletteOptions {
		muted?: PaletteColorOptions;
		dark?: PaletteColorOptions | { foreground: string };
	}
}

declare module '@mui/material/Button' {
	interface ButtonPropsColorOverrides {
		muted: true;
	}
}