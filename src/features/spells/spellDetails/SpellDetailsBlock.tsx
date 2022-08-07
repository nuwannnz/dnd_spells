import React from "react";

interface Props {
  title: string;
  content: string;
  className?: string;
}
const SpellDetailsBlock: React.FC<Props> = ({ title, content, className }) => {
  return (
    <div className={`details-block spell-description ${className ?? ""}`}>
      <span className="block-title">{title}</span>
      <span className="content">{content}</span>
    </div>
  );
};

export default SpellDetailsBlock;
