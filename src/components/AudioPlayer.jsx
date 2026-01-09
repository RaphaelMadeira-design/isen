import React, { useRef } from 'react';
import { Play, Pause } from 'lucide-react';

const AudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="audio-player">
      <button onClick={togglePlay} className="audio-player--button">
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>
      <audio ref={audioRef} src={src} onEnded={() => setIsPlaying(false)} />
    </div>
  );
};

export default AudioPlayer;