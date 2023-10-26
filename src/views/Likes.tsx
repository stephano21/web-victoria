import React, { useEffect, useState } from "react";
import { VideoLikes } from "../components/youtube";
import { Card } from '../components/Card';
import Container from 'react-bootstrap/Container';
import { Col, Row } from "react-bootstrap";

//envv config

export const Likes = () => {
  const apiKey = process.env.GOOGLE_API || 'AIzaSyA0Ux4xHHWnNE0AcXXsmb1y-nzzoF4OMNY'; //process.env.GOOGLE_API ||"";
  interface Video{
    videoId:string ;
    Nombre:string ;
    Enlace:string ;
  }
  const Videos: Video[] = [
    { videoId: '', Nombre: "Grupo 1", Enlace: "" },
    { videoId: 'TQ2VI_fTXLI&t=2s', Nombre: "Grupo 2", Enlace: "https://www.youtube.com/watch?v=TQ2VI_fTXLI&t=2s" },
    { videoId: 'yk6MU4IARMs', Nombre: "Grupo 3", Enlace: "https://www.youtube.com/watch?v=yk6MU4IARMs" },
    { videoId: 'OFTZcgEDl7w', Nombre: "Grupo 4", Enlace: "https://www.youtube.com/watch?v=OFTZcgEDl7w" },
    { videoId: '', Nombre: "Grupo 5", Enlace: "" },
    { videoId: '', Nombre: "Grupo 6", Enlace: "" },
    { videoId: 'diuH1Br1gjk', Nombre: "Grupo 7", Enlace: "https://www.youtube.com/watch?v=diuH1Br1gjk" },
    { videoId: 'ghktJIlTa1Q', Nombre: "Grupo 8", Enlace: "https://www.youtube.com/watch?v=ghktJIlTa1Q" },
    { videoId: "T2aRn-PdL4A", Nombre:"Grupo 9", Enlace:"https://www.youtube.com/watch?v=T2aRn-PdL4A"},
    { videoId: 'wZ52KRH9vy8&t=11s', Nombre: "Grupo 10", Enlace: "https://www.youtube.com/watch?v=wZ52KRH9vy8&t=11s" },
  ];

 

  return (
      <Container>
        <Row>
          {Videos.map((video) => (
            <Col>
              <Card title={video.Nombre}
                footer={<a className="btn-primary" href={video.Enlace} target="_blank">Ver video</a>}
                image={null} key={video.videoId}>
                <VideoLikes videoId={video.videoId} apiKey={apiKey} />
              </Card>
            </Col>))}
        </Row>

      </Container>


  );
};
