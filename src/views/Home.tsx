import React from "react";
import { BaseLayout } from "../components/BaseLayout";
import { Card } from "react-bootstrap";

export const Home = () => {
  return (
    <BaseLayout>
      <div className="container" >
        <div className="row">
          {[
            'Primary',
            'Secondary',
            'Success',
            'Danger',
            'Warning',
            'Info',
            'Light',
            'Dark',
          ].map((variant) => (
            <Card
              bg={variant.toLowerCase()}
              key={variant}
              text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
              style={{ width: '15rem', margin:2, }}
              className="mb-2"
            >
              <Card.Header>Header</Card.Header>
              <Card.Body>
                <Card.Title>{variant} Alert </Card.Title>
                <Card.Text>
                 500
                </Card.Text>
              </Card.Body>
            </Card>
            
          ))}
          <br />
        </div>

      </div>
    </BaseLayout>
  );
};
