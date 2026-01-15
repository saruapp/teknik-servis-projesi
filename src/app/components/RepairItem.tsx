import { IonItem, IonIcon } from "@ionic/react";
import { location, calendar, warning } from "ionicons/icons";

import "../../styles/repair-item.css";

type Props = {
  repair: {
    customer: string;
    address: string;
    date: string;
    issue: string;
    priority: "high" | "medium" | "low" | string;
  };
  onClick: () => void;
};

export function RepairItem({ repair, onClick }: Props) {
  return (
    <IonItem button onClick={onClick} lines="none" className="repair-item">
      <div className="item-wrapper">
        {/* LEFT */}
        <div className="item-left">
          <span className="item-title">{repair.customer}</span>

          <div className="item-meta">
            <IonIcon icon={location} />
            <span>{repair.address}</span>
          </div>

          <div className="item-meta">
            <IonIcon icon={calendar} />
            <span>{repair.date}</span>
          </div>

          <div className="item-issue">
            <IonIcon icon={warning} />
            <span>{repair.issue}</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="item-right">
          <span className={`priority-pill priority-${repair.priority}`}>
            {repair.priority}
          </span>
        </div>
      </div>
    </IonItem>
  );
}
