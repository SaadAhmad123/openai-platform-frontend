import TypicalWorkflow from "./TypicalWorkflow";
import { GetStartedContent, IContentComponent } from "./types";

const content: GetStartedContent[] = []

interface IRegisterGetStartedContent {
    labelIndex: string
    label: string
    link: string
    Component: React.FC<IContentComponent>
}

export const registerGetStartedContent = (
    { label, labelIndex, link, Component }: IRegisterGetStartedContent
) => {
    content.push({
        labelIndex: labelIndex,
        label: label,
        link: `#${link}`,
        component: function () {
            return <Component link={link} />
        }
    })
}

registerGetStartedContent({
    label: "Typical Workflow",
    labelIndex: "1",
    Component: TypicalWorkflow,
    link: "typical-workflow"
})

export default content