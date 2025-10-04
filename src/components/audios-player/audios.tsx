import React, { useRef, useState, useEffect } from 'react';
import '../../Styles/Style.css';

const songs = [
  { title: 'Honest', file: '/Honest.mp3' },
  { title: 'Magnolia', file: '/Magnolia.mp3' },
  { title: 'Nights', file: '/nights.mp3' },
];

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      if (audio && !isSeeking) {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration || 0);
      }
    };

    audio?.addEventListener('timeupdate', updateTime);
    audio?.addEventListener('loadedmetadata', updateTime);

    return () => {
      audio?.removeEventListener('timeupdate', updateTime);
      audio?.removeEventListener('loadedmetadata', updateTime);
    };
  }, [currentSongIndex, isSeeking]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 0);
  };

  const playPrevious = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 0);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <div className="player-container">
      <h2>{songs[currentSongIndex].title}</h2>
      <audio ref={audioRef} src={songs[currentSongIndex].file} />

      <div className="controls">
        <button onClick={playPrevious}>Prev</button>
        <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={playNext}>Next</button>
      </div>

      <div className="progress-container">
        <span className="time">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeekChange}
          onMouseDown={() => setIsSeeking(true)}
          onMouseUp={() => setIsSeeking(false)}
          disabled
        />
        <span className="time">{formatTime(duration)}</span>
      </div>

      <div className="volume-control">
        <label>Volume</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
