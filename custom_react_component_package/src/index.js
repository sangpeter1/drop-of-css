import ExportPreviewTitle,{ ExportPreviewTitleConfig } from "../../src/PackageExports/ExportPreviewTitle";
import ExportPreviewNav,{ExportPreviewNavConfig} from "../../src/PackageExports/ExportPreviewNav";
import ExportPreviewSideNav,{ ExportPreviewSideNavConfig } from "../../src/PackageExports/ExportPreviewSideNav";
import ExportPreviewCard,{ ExportPreviewCardConfig } from "../../src/PackageExports/ExportPreviewCard";
import ExportPreviewForm,{ ExportPreviewFormConfig } from "../../src/PackageExports/ExportPreviewForm";
import ExportPreviewButton,{ ExportPreviewButtonConfig } from "../../src/PackageExports/ExportPreviewButton";

export const components = {
    "title":{
        "component":ExportPreviewTitle,
        "config":ExportPreviewTitleConfig
    },
    "nav":{
        "component":ExportPreviewNav,
        "config":ExportPreviewNavConfig
    },
    "sideNav":{
        "component":ExportPreviewSideNav,
        "config":ExportPreviewSideNavConfig
    },
    "card":{
        "component":ExportPreviewCard,
        "config":ExportPreviewCardConfig
    },
    "form":{
        "component":ExportPreviewForm,
        "config":ExportPreviewFormConfig
    },
    "button":{
        "component":ExportPreviewButton,
        "config":ExportPreviewButtonConfig
    }

}

