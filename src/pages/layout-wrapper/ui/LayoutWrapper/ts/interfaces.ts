// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type LayoutType = 'main';

export interface ILayoutWrapperProps {
    layout: LayoutType[];
    children?: React.ReactNode;
}
