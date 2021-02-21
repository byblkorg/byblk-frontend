import { createContext, Dispatch } from "react";
import { createTheme } from "theme";

export interface AppContextInterface {
  darkmode: boolean;
  setDarkMode: Dispatch<boolean>;
  theme: ReturnType<typeof createTheme>;
  authenticated: boolean;
  isAuthenticated: Dispatch<boolean>;
  hasReadIntro: boolean;
  user?:
    | undefined
    | {
        email: string;
        name: string;
        username: string;
      };
}

export default createContext<AppContextInterface | null>(null);
