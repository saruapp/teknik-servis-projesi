import { useState, useMemo } from "react";
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
  IonIcon,
} from "@ionic/react";
import { documentText } from "ionicons/icons";
import CrudSearchbar from "./CrudSearchbar";
import jsPDF from "jspdf";
import "../../styles/shared.css";
import "../../styles/documents-page.css";

/* MOCK DOCUMENTS */
const mockDocuments = [
  {
    id: "1",
    type: "installation",
    title: "Installation • John Doe",
    createdAt: "2026-01-15",
    data: {
      customerName: "John Doe",
      deviceType: "Washing Machine",
      brand: "Bosch",
      model: "X123",
      serialNumber: "SN-ABCD1234",
      installationType: "first",
      electricalOk: true,
      tested: true,
      notes: "Everything works fine",
    },
  },
  {
    id: "2",
    type: "repair",
    title: "Repair • Jane Smith",
    createdAt: "2026-01-14",
    data: {
      customerName: "Jane Smith",
      faultType: "Electrical",
      issueDescription: "Machine not starting",
      resolution: "Replaced fuse",
      laborCost: 50,
      underWarranty: false,
      materials: [{ name: "Fuse", quantity: 1, unitPrice: 5 }],
    },
  },
];

type SegmentType = "installation" | "repair" | "all";

export default function DocumentsPage() {
  const [segment, setSegment] = useState<SegmentType>("all");
  const [search, setSearch] = useState("");

  /* 🔍 SEARCH FILTER */
  const filteredDocs = useMemo(() => {
    return mockDocuments.filter(
      (doc) =>
        (doc.title + " " + doc.createdAt)
          .toLowerCase()
          .includes(search.toLowerCase()) &&
        (segment === "all" ? true : doc.type === segment)
    );
  }, [search, segment]);

  /* PDF AÇMA FONKSİYONU */
  const openPDF = (doc: (typeof mockDocuments)[0]) => {
    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.text(doc.title, 14, 20);
    pdf.setFontSize(12);
    pdf.text(`Created at: ${doc.createdAt}`, 14, 30);
    pdf.setFontSize(14);
    pdf.text("Details:", 14, 40);

    let y = 50;
    for (const [key, value] of Object.entries(doc.data)) {
      if (Array.isArray(value)) {
        pdf.text(`${key}:`, 14, y);
        y += 6;
        value.forEach((v, i) => {
          pdf.text(
            `  ${i + 1}. ${Object.entries(v)
              .map(([k, val]) => `${k}: ${val}`)
              .join(", ")}`,
            16,
            y
          );
          y += 6;
        });
      } else if (typeof value === "boolean") {
        pdf.text(`${key}: ${value ? "Yes" : "No"}`, 14, y);
        y += 6;
      } else {
        pdf.text(`${key}: ${value}`, 14, y);
        y += 6;
      }
    }

    pdf.save(`${doc.title}.pdf`);
  };

  return (
    <IonPage>
      <IonHeader>
        {/* SEGMENT */}
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
            placeholder="Search documents"
            onSearch={(value) => setSearch(value)}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          {filteredDocs.map((doc) => (
            <IonItem
              className="document-item"
              key={doc.id}
              button
              onClick={() => openPDF(doc)}
            >
              <IonIcon slot="start" icon={documentText} />
              <IonLabel>
                <h2>{doc.title}</h2>
                <p>{doc.createdAt}</p>
              </IonLabel>
            </IonItem>
          ))}
          {filteredDocs.length === 0 && (
            <IonItem>
              <IonLabel>No documents found</IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
