import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ReactAudioPlayer from 'react-audio-player';
import { useContext } from 'react';

import AudioPlayer2 from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import audio from "../../midia/suletta.mp3"

import capa from "../../midia/capa2.png"
import { AcessContext} from "../Login_Contexto/ContextoAcessibilidade";


export default function AudioPlayer() {
    const theme = useTheme();
    const { acessibilidade, SetAcessibilidade } = useContext(AcessContext);


    return (
        <Card sx={{ display: 'flex', backgroundColor: "#a12d2e", width: "auto", height: "100%" }} className={acessibilidade? ("acessibilidade"): ("")}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5" sx={{ color: "#EAE8DB" }}>
                        A Casa de Saberes Cego Aderaldo
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ color: "#EAE8DB" }}>
                        Gabriel Okidoi
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

                    <AudioPlayer2 className={acessibilidade? ("acessibilidade"): ("")}
                        src={audio}
                        onPlay={e => console.log("onPlay")}
                    // other props here
                    />

                </Box>
            </Box>
            
        </Card>
    );
}
