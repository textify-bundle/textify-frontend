type NodeType = 
    | 'text'
    | 'heading'
    | 'todo'
    | 'quote'
    | 'code'
    | 'divider'
    | 'image'
    | 'video'
    | 'file'
    | 'table'
    | 'callout'
    | 'bookmark'
    | 'link'
    | 'equation'
    | 'none';

type NodeContent = 
    | string
    | TodoContent
    | MediaContent
    | FileContent
    | TableContent
    | CalloutContent
    | BookmarkContent
    | EquationContent;

type TodoContent = {
    text: string;
    checked: boolean;
};

type MediaContent = {
    url: string;
    altText?: string;
};

type FileContent = {
    fileName: string;
    fileSize: number;
};

type TableContent = {
    rows: Node[][];
};

type CalloutContent = {
    text: string;
    icon?: string;
};

type BookmarkContent = {
    url: string;
    title?: string;
};

type EquationContent = {
    equation: string;
};

export type NodeStyles = {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
    highlight?: string;
    fontSize?: number;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    backgroundColor?: string;
};

export type Node = {
    id: string;
    type: NodeType;
    content: NodeContent;
    styles?: NodeStyles;
    children?: Node[];
};