import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
interface VideoLikesProps {
  videoId: string;
  apiKey: string;
}

export const VideoLikes: React.FC<VideoLikesProps> = ({ videoId, apiKey }) => {
  const [likes, setLikes] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${apiKey}`)
      .then((response) => {
        const statistics = response.data.items[0].statistics;
        setLikes(Number(statistics.likeCount));
      })
      .catch((error) => {
        console.error('Error fetching video data: ', error);
      });
  }, [videoId, apiKey]);

  return (
    <div>
      {likes !== null ? (
        <h1>{likes} <i className="bi bi-hand-thumbs-up"></i></h1>
      ) : (
        <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
      )}
    </div>
  );
};
