import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonList,
  IonItem,
  IonToggle,
  IonIcon,
} from "@ionic/react";
import { person, notifications, moon, language } from "ionicons/icons";
import { useState } from "react";
import { SignaturePad } from "./SignaturePad";
import "../../styles/settings.css";

export function Settings() {
  const [segment, setSegment] = useState<"profile" | "preferences">("profile");
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [signature, setSignature] = useState("");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="segment-toolbar">
          <IonSegment
            value={segment}
            onIonChange={(e) => setSegment(e.detail.value)}
          >
            <IonSegmentButton value="profile">
              <IonLabel>Profile</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="preferences">
              <IonLabel>Preferences</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent className="settings-page">
        {segment === "profile" && (
          <IonList>
            <IonItem className="settings-item">
              <IonIcon icon={person} slot="start" />
              <IonLabel>
                <h2>Technician Name</h2>
                <p>ID: TECH-12345</p>
              </IonLabel>
            </IonItem>

            <IonItem className="settings-item">
              <SignaturePad
                onSave={(sig) => setSignature(sig)}
                title="Technician Signature"
                value={signature}
              />
            </IonItem>
          </IonList>
        )}

        {segment === "preferences" && (
          <IonList>
            <IonItem className="settings-item">
              <IonIcon icon={moon} slot="start" />
              <IonLabel>Dark Mode</IonLabel>
              <IonToggle
                checked={darkMode}
                onIonChange={(e) => setDarkMode(e.detail.checked)}
              />
            </IonItem>

            <IonItem className="settings-item">
              <IonIcon icon={notifications} slot="start" />
              <IonLabel>Notifications</IonLabel>
              <IonToggle
                checked={notificationsEnabled}
                onIonChange={(e) => setNotificationsEnabled(e.detail.checked)}
              />
            </IonItem>

            <IonItem className="settings-item" button>
              <IonIcon icon={language} slot="start" />
              <IonLabel>Language</IonLabel>
              <IonLabel slot="end">English</IonLabel>
            </IonItem>
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
}
