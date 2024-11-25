// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type LayoutType = 'main' | 'project';

export interface ILayoutWrapperProps {
    layout: LayoutType[];
    children?: React.ReactNode;
}
