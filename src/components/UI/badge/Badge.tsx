import React from "react";
import { useTranslation } from "react-i18next";

type TBadge = {
  content: string;
  status?: string;
  className?: string;
};

const Badge: React.FC<TBadge> = (props) => {
  const { t } = useTranslation();
  const statusClass = props.status ? `status-${props.status}` : props.content;
  const combinedClass = `status-text ${statusClass} ${props.className || ''}`.trim();
  
  return <span className={combinedClass}>{t(props.content)}</span>;
};

export default Badge;
