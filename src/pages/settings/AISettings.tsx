import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { OpenAISettings } from '../../widgets/settings/OpenAISettings';
import { RootState } from '../../store';
import { updateOpenAISettings } from '../../store/slices/openAISettingsSlice';

const AISettings: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSaved, setIsSaved] = React.useState(false);
    const settings = useSelector((state: RootState) => state.openAISettings.openai);

    const handleSave = () => {
        dispatch(updateOpenAISettings(settings));
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Button 
                    variant="outlined" 
                    onClick={handleBack}
                    sx={{ mr: 2 }}
                >
                    Назад
                </Button>
                <Typography variant="h4" component="h1">
                    Настройки AI
                </Typography>
            </Box>
            
            <Paper sx={{ p: 3, mb: 3 }}>
                <OpenAISettings />
            </Paper>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleSave}
                    disabled={isSaved}
                >
                    {isSaved ? 'Сохранено!' : 'Сохранить'}
                </Button>
            </Box>
        </Container>
    );
};

export default AISettings;
