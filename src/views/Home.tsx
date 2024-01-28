import React from "react";
import { BaseLayout } from "../components/BaseLayout";
import { Card, Placeholder } from "react-bootstrap";
import { DataTable } from "../components/DataTable";
export const Home = () => {
  const columnNames = ['ID', 'First Name', 'Last Name', 'Age', 'Email'];

  const data = [
    { id: 1, first_name: 'John', last_name: 'Doe', age: 25, email: 'john.doe@example.com' },
    { id: 2, first_name: 'Jane', last_name: 'Doe', age: 30, email: 'jane.doe@example.com' },
    // ...more rows
  ];

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
              style={{ width: '15rem', margin: 2, }}
              className="mb-2"
            >
              <Card.Header>Header</Card.Header>
              <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                  <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>
              </Card.Body>
            </Card>

          ))}
          <br />
        </div>
        <div>
      <h1>Custom DataTable</h1>
      <DataTable columnNames={columnNames} data={data} />
    </div>
      </div>
    </BaseLayout>
  );
};
