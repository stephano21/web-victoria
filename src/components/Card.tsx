import React from "react";
import Image from "react-bootstrap/Image";
interface CardProps {
  title: string | null;
  image: string | null;
  children: JSX.Element | JSX.Element[];
  footer: string | JSX.Element | JSX.Element[] | null;
}
export const Card = ({ title, children, footer, image }: CardProps) => {
  return (
    <div className="card" style={{ width: "28rem" }}>
      {title && (
        <div className="card-header d-flex flex-column justify-content-center align-items-center">
          <h5 className="card-title text-center">{title}</h5>
          <div className="d-flex justify-content-center align-items-center">
            {image && (
              <Image src={image} roundedCircle alt="Logo" onError={(e: any) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150'; }} className="ml-auto mr-auto" width={150} height={150} />
            )}
          </div>
        </div>
      )}
      <div className="card-body">{children && children}</div>
      {footer && (
        <div className="card-footer">
          {typeof footer === "string" ? footer : footer}
        </div>
      )}
    </div>
  );
};
