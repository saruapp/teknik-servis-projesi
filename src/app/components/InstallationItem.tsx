import { IonItem, IonLabel, IonIcon, IonChip } from "@ionic/react";
import { location, calendar } from "ionicons/icons";

import "../../styles/installation-item.css";

type Props = {
  installation: {
    customer: string;
    address: string;
    date: string;
    status: string;
  };
  onClick: () => void;
};

export function InstallationItem({ installation, onClick }: Props) {
  return (
    <IonItem
      button
      onClick={onClick}
      lines="none"
      className="installation-item"
    >
      <div className="item-wrapper">
        {/* LEFT */}
        <div className="item-left">
          <span className="item-title">{installation.customer}</span>

          <div className="item-meta">
            <IonIcon icon={location} />
            <span>{installation.address}</span>
          </div>

          <div className="item-meta">
            <IonIcon icon={calendar} />
            <span>{installation.date}</span>
          </div>
        </div>

        {/* RIGHT – vertically centered */}
        <div className="item-right">
          <span className={`status-pill status-${installation.status}`}>
            {installation.status}
          </span>
        </div>
      </div>
    </IonItem>
  );
}
