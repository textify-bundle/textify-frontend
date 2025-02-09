export type NodeType = 
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

export type NodeContent = 
    | string
    | TodoContent
    | MediaContent
    | FileContent
    | TableContent
    | CalloutContent
    | BookmarkContent
    | EquationContent;

export type TodoContent = {
    text: string;
    checked: boolean;
};

export type MediaContent = {
    url: string;
    altText?: string;
};

export type FileContent = {
    fileName: string;
    fileSize: number;
};

export type TableContent = {
    rows: Node[][];
};

export type CalloutContent = {
    text: string;
    icon?: string;
};

export type BookmarkContent = {
    url: string;
    title?: string;
};

export type EquationContent = {
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
    content?: NodeContent;
    styles?: NodeStyles;
    children?: Node[];
};