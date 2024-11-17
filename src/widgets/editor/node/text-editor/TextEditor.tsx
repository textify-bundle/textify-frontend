// import { Input } from '@mui/base/Input';
// import TextareaAutosize from '@mui/material/TextareaAutosize';
// import './TextEditor.scss';
// import { useState } from 'react';

// const TextEditor = ({ content }: { content: string }) => {
//     const [value, setValue] = useState(content);
//     console.log(content);
//     console.log(value);

//     return (
//         <div className='text-editor'>
//             <Input
//                 multiline
//                 slots={{
//                     textarea: TextareaAutosize,
//                     }
//                 }}
//                 value={value}
//                 onChange={(e) => setValue(e.target.value)}
//                 slotProps={{
//                     input: {
//                         style: {
//                             border: 'none',
//                             padding: 0,
//                             background: 'transparent',
//                             width: '100%',
//                             resize: 'none',
//                             overflow: 'hidden',
//                             outline: 'none',
//                         minRows: 1,
//                         minRows: 1 as any,
//                 }}
//                 className='text-editor__input'
//             />
//         </div>
//     );
// };

// export default TextEditor;
