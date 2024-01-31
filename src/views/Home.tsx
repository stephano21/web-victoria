import React from "react";
import { BaseLayout } from "../components/BaseLayout";
import { Card, CardText, CardTitle, Placeholder } from "react-bootstrap";
import { DataTable } from "../components/DataTable";
import { title } from "process";
import { text } from "stream/consumers";
export const Home = () => {
  const columnNames = ['ID', 'First Name', 'Last Name', 'Age', 'Email'];



  return (
    <BaseLayout>
      <div className="container" >
        <div className="row">
          {[
            {
              class: 'Primary',
              area:'Usuarios',
              icon: 'bi bi-people',
              title: 'Usuarios registrados',
              message:'2 usuarios nuevos',
            },
            {
              class: 'success',
              icon: 'bi bi-book',
              area:'Lecturas',
              title: 'Lecturas del mes',
              message:'No se registrado ninguna lectura para este mes',
            },
            {
              class: 'danger',
              icon: 'bi bi-arrow-repeat',
              area:'Sincronización',
              title: 'Sincronizacion con Arable',
              message:'La sincronizacion diaria ha fallado!',
            }

          ].map((variant) => (
            <Card
              bg={variant.class.toLowerCase()}
              key={variant.class}
              text={variant.class.toLowerCase() === 'light' ? 'dark' : 'white'}
              style={{ width: '15rem', margin: 2, }}
              className="mb-2"
            >
              <Card.Header><i className={variant.icon}></i> {variant.area}</Card.Header>
              <Card.Body>
                <CardTitle as={Card.Title} animation="glow">
                  {variant.title}
                </CardTitle>
                <CardText>{variant.message}</CardText>
              </Card.Body>
            </Card>

          ))}
          <br />
        </div>

      </div>
    </BaseLayout>
  );
};
