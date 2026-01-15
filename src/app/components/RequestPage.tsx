import { useState, useMemo } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonList,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonActionSheet,
} from "@ionic/react";

import CrudSearchbar from "./CrudSearchbar";
import { InstallationForm } from "./InstallationForm";
import { RepairForm } from "./RepairForm";
import { InstallationItem } from "./InstallationItem";
import { RepairItem } from "./RepairItem";

import "../../styles/shared.css";
import "../../styles/request-page.css";
import { buildOutline, constructOutline } from "ionicons/icons";

/* MOCK DATA */
const mockInstallations = [
  {
    id: "1",
    customer: "John Doe",
    address: "123 Main St",
    date: "2026-01-15",
    status: "pending",
  },
  {
    id: "2",
    customer: "Jane Smith",
    address: "456 Oak Ave",
    date: "2026-01-16",
    status: "pending",
  },
];

const mockRepairs = [
  {
    id: "1",
    customer: "Alice Brown",
    address: "321 Elm St",
    date: "2026-01-15",
    priority: "high",
    issue: "Device not working",
  },
  {
    id: "2",
    customer: "Charlie Davis",
    address: "654 Maple Dr",
    date: "2026-01-16",
    priority: "medium",
    issue: "Strange noise",
  },
];

type SegmentType = "installation" | "repair" | "all";

export function RequestsPage() {
  const [segment, setSegment] = useState<SegmentType>("installation");
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [showTypeSelect, setShowTypeSelect] = useState(false);

  /* 🔍 SEARCH FILTERING */
  const filteredInstallations = useMemo(() => {
    return mockInstallations.filter((i) =>
      `${i.customer} ${i.address}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const filteredRepairs = useMemo(() => {
    return mockRepairs.filter((r) =>
      `${r.customer} ${r.address} ${r.issue}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  /* FORM */
  if (showForm) {
    if (segment === "installation") {
      return <InstallationForm onClose={() => setShowForm(false)} />;
    }
    if (segment === "repair") {
      return <RepairForm onClose={() => setShowForm(false)} />;
    }
  }
  const handleAdd = () => {
    if (segment === "all") {
      setShowTypeSelect(true);
    } else {
      setShowForm(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="segment-toolbar">
          <IonSegment
            value={segment}
            onIonChange={(e) => setSegment(e.detail.value as SegmentType)}
          >
            <IonSegmentButton value="all">
              <IonLabel>All</IonLabel>
            </IonSegmentButton>

            <IonSegmentButton value="installation">
              <IonLabel>Installation</IonLabel>
            </IonSegmentButton>

            <IonSegmentButton value="repair">
              <IonLabel>Repair</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>

        {/* SEARCHBAR */}
        <IonToolbar>
          <CrudSearchbar
            placeholder={
              segment === "installation"
                ? "Search installations"
                : segment === "repair"
                ? "Search repairs"
                : "Search all requests"
            }
            onAdd={handleAdd}
            onFilter={() => {
              /* segment-aware filter */
            }}
            onSearch={(value) => setSearch(value)}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          {/* INSTALLATION */}
          {(segment === "installation" || segment === "all") &&
            filteredInstallations.map((installation) => (
              <InstallationItem
                key={`i-${installation.id}`}
                installation={installation}
                onClick={() => setShowForm(true)}
              />
            ))}

          {/* REPAIR */}
          {(segment === "repair" || segment === "all") &&
            filteredRepairs.map((repair) => (
              <RepairItem
                key={`r-${repair.id}`}
                repair={repair}
                onClick={() => setShowForm(true)}
              />
            ))}
        </IonList>
      </IonContent>
      <IonActionSheet
        isOpen={showTypeSelect}
        onDidDismiss={() => setShowTypeSelect(false)}
        header="Add new request"
        buttons={[
          {
            text: "Installation",
            icon: constructOutline,
            handler: () => {
              setShowTypeSelect(false);
              setSegment("installation");
              setShowForm(true);
            },
          },
          {
            text: "Repair",
            icon: buildOutline,
            handler: () => {
              setShowTypeSelect(false);
              setSegment("repair");
              setShowForm(true);
            },
          },
          {
            text: "Cancel",
            role: "cancel",
          },
        ]}
      />
    </IonPage>
  );
}
