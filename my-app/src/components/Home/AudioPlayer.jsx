import React, { useState, useRef } from 'react';
import { Lrc } from 'react-lrc';
import repente from "../../assets/audio/repente.mp3";
import cegoAderaldo from "../../assets/img/cego2.png";

const lrcData = `
[00:00.00] Aperte o Botão de Play para começar
[00:00.01] (Instrumental)
[00:07.54] Amigo, eu vou te dizer
[00:10.20] preste aqui a atenção
[00:12.66] Vindo lá do Crato
[00:15.50] Oasis do sertão
[00:16.95] Marco a nossa história
[00:19.12] no presente e no passado
[00:21.00] Nasceu em 1878,
[00:25.25] famoso Cego Aderaldo
[00:27.45] Poeta famoso que marcou nossa cultura,
[00:30.37] saiu do Crato enquanto criança,
[00:35.50] Fugindo dessa secura
[00:37.83] Aos 18 anos na fábrica de algodão
[00:42.50] alimentava a fornalha dia inteiro com carvão
[00:46.95] Quando em dia se deu a tal confusão
[00:49.45] que nosso poeta então perdeu a sua visão
[00:55.79] Logo após isso começa a sua carreira
[00:58.79] os versos e estrofes, dedicou a vida inteira
[01:04.95] Sua obra mais famosa, Três Lágrimas é o nome
[01:09.58] Conta os acontecimentos que marcaram esse homem
[01:14.87] A primeira veio com a morte de seu pai
[01:20.04] segunda com a morte de sua mainha
[01:23.58] A terceira lágrima então, só escorreu
[01:27.41] Com a perda, sua visão
[01:35.45] Teve mais de 26 filhos, mesmo nunca tendo casado
[01:39.50] nas suas viagens foi adotando e todos foram criados
[01:45.58] Foram mais de 70 anos com essa dedicação
[01:51.25] Que fez orquestra com os filhos
[01:54.62] e montou Cinema no sertão,
[01:58.00] e além disso ainda era comerciante
[02:00.83] Ficava viajando para todo o canto, a todo o instante
[02:05.83] Foi para tanto lugar que esse homem já visitou
[02:08.45] Que até mesmo na Amazônia o mesmo já pisou
[02:16.25] Conheceu tanto lugar e tanta gente diferente
[02:20.66] Que se eu falasse tudo não cabia no repente
[02:26.29] De Luiz Gonzaga ele foi a inspiração
[02:31.87] Conheceu Rachel de Queiroz, Padre Cicero e até mesmo Lampião
[02:37.66] Era um exemplo de talento e também superação
[02:44.08] Para que esse povo um dia nunca se esqueça
[02:46.62] Cego Aderaldo aos 89 nos deixou em Fortaleza
[02:52.58] Caramba, rapá, mas esse caba fez tudo isso mesmo?
[02:56.00] Tô te dizendo!
[02:57.45] E todo esse conhecimento que aconteceu?
[02:59.87] O que aconteceu com o conhecimento eu posso te explicar
[03:05.62] Tá na Casa do Saberes bem aqui no Quixadá
[03:10.54] Desde 2017 eles têm essa missão
[03:16.41] De passar os conhecimentos, a arte e a educação
[03:22.95] O respeito e a admiração é tanta que nem pode ser contado
[03:28.25] Se pode até ver o nome Casa do Saberes Cego Aderaldo`;

export function AudioPlayerWithLrc() {
    const [currentMillisecond, setCurrentMillisecond] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTimeSec, setCurrentTimeSec] = useState(0);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const curTime = audioRef.current.currentTime;
            setCurrentTimeSec(curTime);
            setCurrentMillisecond(Math.floor(curTime * 1000));
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e) => {
        const seekTime = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = seekTime;
            setCurrentTimeSec(seekTime);
            setCurrentMillisecond(Math.floor(seekTime * 1000));
        }
    };

    const formatTime = (time) => {
        if (isNaN(time)) return "00:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="player-card">
            <div className="player-image-container">
                <img src={cegoAderaldo} alt="Imagem do cego aderaldo junto com xilogravuras" className="aderaldo2" />
            </div>

            <div className="player-content">
                <div className="lrc-container">
                    <Lrc
                        lrc={lrcData}
                        currentMillisecond={currentMillisecond}
                        autoScroll={true}
                        verticalSpace={true}
                        scrollOptions={{
                            behavior: 'smooth',
                            block: 'center',
                        }}
                        className="lrc-scroll-view"
                        lineRenderer={({ line, active }) => (
                            <p className={`lrc-line ${active ? 'active' : ''}`}>
                                {line.content}
                            </p>
                        )}
                    />
                </div>

                <div className="controls-wrapper">
                    <div className="progress-container">
                        <span className="time-stamp">
                            {formatTime(currentTimeSec)}
                        </span>

                        <input
                            type="range"
                            min="0"
                            max={duration || 100}
                            value={currentTimeSec}
                            onChange={handleSeek}
                            className="progress-bar"
                        />

                        <span className="time-stamp">
                            {formatTime(duration)}
                        </span>
                    </div>

                    <div className="button-container">
                        <button onClick={togglePlay} className="play-button">
                            {isPlaying ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="#000000">
                                    <rect x="6" y="4" width="4" height="16" rx="1" />
                                    <rect x="14" y="4" width="4" height="16" rx="1" />
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="#000000" className="play-icon">
                                    <polygon points="5,3 19,12 5,21" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                <audio
                    ref={audioRef}
                    src={repente}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                    hidden
                />
            </div>
        </div>
    );
}

export default AudioPlayerWithLrc;