// App.tsx
import React, { useState } from 'react';
import { checkSpelling, SpellingError } from './shared/api/speller/SpellerWrapper';

const App: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [errors, setErrors] = useState<SpellingError[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleCheckSpelling = async () => {
        setLoading(true);
        try {
            const result = await checkSpelling(text);
            setErrors(result);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Spell Checker</h1>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to check spelling..."
            />
            <button onClick={handleCheckSpelling} disabled={loading}>
                {loading ? 'Checking...' : 'Check Spelling'}
            </button>
            {errors.length > 0 && (
                <div>
                    <h2>Spelling Errors:</h2>
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>
                                Word: {error.word}, Suggestions: {error.suggestions.join(', ')}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default App;
