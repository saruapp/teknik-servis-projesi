import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonTextarea,
  IonList,
  IonButtons,
  IonButton,
} from "@ionic/react";
import {
  construct,
  build,
  checkmarkCircle,
  hourglass,
  alertCircleOutline,
  notifications,
} from "ionicons/icons";
import { useState } from "react";
import { Chart, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../../styles/dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function Home() {
  const [notes, setNotes] = useState<string[]>([
    "Call John at 15:00",
    "Check stock for washer",
  ]);

  const recentActivities = [
    "Installation completed for Jane Smith",
    "Repair added for Alice Brown",
    "Installation pending at 456 Oak Ave",
    "Repair in progress for Charlie Davis",
  ];

  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Completed Jobs",
        data: [10, 12, 8, 15],
        borderColor: "#4f7df3",
        backgroundColor: "rgba(79, 125, 243, 0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Dashboard</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon icon={notifications} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          {/* STAT CARDS */}
          <IonRow
            style={{ display: "flex", gap: "12px", marginBottom: "12px" }}
          >
            <IonCol style={{ flex: 1 }}>
              <IonCard className="dashboard-card">
                <IonCardHeader>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <IonIcon icon={construct} size="large" color="primary" />
                    <IonCardTitle>Installations</IonCardTitle>
                  </div>
                </IonCardHeader>
                <IonCardContent>
                  <div className="stat-number">12</div>
                  <div className="stat-subtitle">Pending</div>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol style={{ flex: 1 }}>
              <IonCard className="dashboard-card">
                <IonCardHeader>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <IonIcon icon={build} size="large" color="warning" />
                    <IonCardTitle>Repairs</IonCardTitle>
                  </div>
                </IonCardHeader>
                <IonCardContent>
                  <div className="stat-number">8</div>
                  <div className="stat-subtitle">Pending</div>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol style={{ flex: 1 }}>
              <IonCard className="dashboard-card">
                <IonCardHeader>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <IonIcon
                      icon={checkmarkCircle}
                      size="large"
                      color="success"
                    />
                    <IonCardTitle>Completed</IonCardTitle>
                  </div>
                </IonCardHeader>
                <IonCardContent>
                  <div className="stat-number">45</div>
                  <div className="stat-subtitle">This month</div>
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol style={{ flex: 1 }}>
              <IonCard className="dashboard-card">
                <IonCardHeader>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <IonIcon icon={hourglass} size="large" color="medium" />
                    <IonCardTitle>In Progress</IonCardTitle>
                  </div>
                </IonCardHeader>
                <IonCardContent>
                  <div className="stat-number">5</div>
                  <div className="stat-subtitle">Active jobs</div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          {/* MY NOTES */}
          <IonRow style={{ marginBottom: "12px" }}>
            <IonCol>
              <IonCard className="dashboard-card">
                <IonCardHeader>
                  <IonCardTitle>My Notes</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    {notes.map((note, idx) => (
                      <IonItem key={idx} className="note-item">
                        <IonIcon
                          icon={alertCircleOutline}
                          slot="start"
                          color="warning"
                        />
                        <IonLabel>{note}</IonLabel>
                      </IonItem>
                    ))}
                  </IonList>
                  <IonTextarea
                    placeholder="Add new note..."
                    rows={2}
                    onIonInput={(e) => {
                      const val = e.detail.value ?? "";
                      if (val.endsWith("\n")) {
                        setNotes([...notes, val.trim()]);
                      }
                    }}
                  />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          {/* RECENT ACTIVITY */}
          <IonRow style={{ marginBottom: "12px" }}>
            <IonCol>
              <IonCard className="dashboard-card">
                <IonCardHeader>
                  <IonCardTitle>Recent Activity</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    {recentActivities.map((act, idx) => (
                      <IonItem key={idx} className="activity-item">
                        <IonIcon
                          icon={alertCircleOutline}
                          slot="start"
                          color="primary"
                        />
                        <IonLabel>{act}</IonLabel>
                      </IonItem>
                    ))}
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          {/* CHART */}
          <IonRow>
            <IonCol>
              <IonCard className="dashboard-card">
                <IonCardHeader>
                  <IonCardTitle>Monthly Completed Jobs</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <Line data={lineData} />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
