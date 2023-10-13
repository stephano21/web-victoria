import React from "react";
interface CardProps {
  title: string | null;
  children: JSX.Element | JSX.Element[];
  footer: string | JSX.Element | JSX.Element[] | null;
}
export const Card = ({ title, children, footer }: CardProps) => {
  return (
    <div className="card">
      {title && (
        <div className="card-header">
          <h5 className="card-title">{title}</h5>
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
