import React from "react";
interface CardProps {
  title: string | null;
  children: JSX.Element | JSX.Element[];
  footer: string | JSX.Element | JSX.Element[] | null;
}
export const Card = ({ title, children, footer }: CardProps) => {
  return (
    <div className="card" style={{ width: '20rem' }}>
      {title && (
        <div className="card-header">
          <h5 className="card-title text-center">{title}</h5>
          <img src="./../assets/logo.png" alt="logo" />
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
