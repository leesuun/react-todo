// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
    export interface DarkTheme {
        bgColor: string;
        textColor: string;
        accentColor: string;
    }
}
